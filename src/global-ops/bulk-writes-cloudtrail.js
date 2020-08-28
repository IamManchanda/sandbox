const { config, DynamoDB } = require("aws-sdk");

config.update({
  region: "eu-west-1",
});

const documentClient = new DynamoDB.DocumentClient();

const faker = require("faker");
const moment = require("moment");

setInterval(() => {
  let params = {
    TableName: "td_keys",
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
    secret: moment().unix(),
  });
};
