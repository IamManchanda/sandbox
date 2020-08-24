const { config, DynamoDB } = require("aws-sdk");

config.update({
  region: "eu-west-1",
});

const documentClient = new DynamoDB.DocumentClient();

const faker = require("faker");
const moment = require("moment");

setInterval(() => {
  let params = {
    TableName: "global_td_notes",
  };
  generateNotesItem((item) => {
    params.Item = item;
    documentClient.put(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.stringify(data, null, 2));
      }
    });
  });
}, 300);

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
