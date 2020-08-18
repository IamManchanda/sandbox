const { config, DynamoDB } = require("aws-sdk");

config.update({ region: "eu-west-1" });
const documentClient = new DynamoDB.DocumentClient();

documentClient.batchWrite(
  {
    RequestItems: {
      td_notes_sdk: [
        {
          DeleteRequest: {
            Key: {
              user_id: "bb",
              timestamp: 1597745800,
            },
          },
        },
        {
          PutRequest: {
            Item: {
              user_id: "11",
              timestamp: 1597747033,
              title: "Title 11",
              content: "Content 11",
            },
          },
        },
        {
          PutRequest: {
            Item: {
              user_id: "22",
              timestamp: 1597747084,
              title: "Title 22",
              content: "Content 22",
            },
          },
        },
      ],
    },
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  },
);
