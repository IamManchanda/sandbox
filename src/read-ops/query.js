const { config, DynamoDB } = require("aws-sdk");

config.update({ region: "eu-west-1" });
const documentClient = new DynamoDB.DocumentClient();

documentClient.query(
  {
    TableName: "td_notes_test",
    KeyConditionExpression: "user_id = :uid",
    FilterExpression: "cat = :cat",
    ExpressionAttributeValues: {
      ":uid": "A",
      ":cat": "general",
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
