const { config, DynamoDB, S3 } = require("aws-sdk");

config.update({
  region: "eu-west-1",
});

const documentClient = new DynamoDB.DocumentClient();
const s3 = new S3();

const faker = require("faker");
const moment = require("moment");
const zlib = require("zlib");

const generateNotesItem = (callback) => {
  callback({
    user_id: faker.random.uuid(),
    timestamp: moment().unix(),
    cat: faker.random.word(),
    title: faker.company.catchPhrase(),
    content: faker.hacker.phrase(),
    note_id: faker.random.uuid(),
    user_name: faker.internet.userName(),
    timestamp_expiry: moment().unix() + 600,
  });
};

const putNotesItemS3 = (item, callback) => {
  if (item.content.length > 35) {
    let params = {
      Bucket: "global-td-notes-content",
      Key: `${item.user_id}|${item.timestamp}`,
      Body: item.content,
    };
    s3.upload(params, (err, data) => {
      if (err) {
        callback(err);
      } else {
        item.content_s3 = data.Location;
        item.content = undefined;
        documentClient.put(
          {
            TableName: "global_td_notes",
            Item: item,
          },
          callback,
        );
      }
    });
  } else {
    documentClient.put(
      {
        TableName: "global_td_notes",
        Item: item,
      },
      callback,
    );
  }
};

const getNotesItemS3 = (key, callback) => {
  documentClient.get(
    {
      TableName: "global_td_notes",
      Key: key,
    },
    (err, data) => {
      if (err) {
        callback(err);
      } else {
        if (data.Item.content) {
          callback(null, data);
        } else {
          let params = {
            Bucket: "global-td-notes-content",
            Key: `${key.user_id}|${key.timestamp}`,
          };
          s3.getObject(params, (err, content_s3) => {
            if (err) {
              callback(err);
            } else {
              data.Item.content = content_s3.Body.toString();
              data.Item.content_s3 = undefined;
              callback(null, data);
            }
          });
        }
      }
    },
  );
};

generateNotesItem((item) => {
  console.log("Original Item: ", item);
  putNotesItemS3(item, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Stored Item: ", item);
      getNotesItemS3(
        {
          user_id: item.user_id,
          timestamp: item.timestamp,
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Retrieved Item", data.Item);
          }
        },
      );
    }
  });
});
