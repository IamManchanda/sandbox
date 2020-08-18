const { config, DynamoDB } = require("aws-sdk");

config.update({ region: "eu-west-1" });
const documentClient = new DynamoDB.DocumentClient();

documentClient.scan(
  {
    TableName: "td_notes_test",
    FilterExpression: "cat = :cat",
    ExpressionAttributeValues: {
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
