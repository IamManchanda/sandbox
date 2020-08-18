const { config, DynamoDB } = require("aws-sdk");

config.update({ region: "eu-west-1" });
const documentClient = new DynamoDB.DocumentClient();

documentClient.update(
  {
    TableName: "td_notes_sdk",
    Key: {
      user_id: "bb",
      timestamp: 1597745641,
    },
    UpdateExpression: "set #t = :t",
    ExpressionAttributeNames: {
      "#t": "title",
    },
    ExpressionAttributeValues: {
      ":t": "Updated first sdk title",
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
