const { config, DynamoDB } = require("aws-sdk");

config.update({ region: "eu-west-1" });
const documentClient = new DynamoDB.DocumentClient();

documentClient.update(
  {
    TableName: "td_notes_sdk",
    Key: {
      user_id: "ABC",
      timestamp: 1597748534,
    },
    UpdateExpression: "set #v = #v + :incr",
    ExpressionAttributeNames: {
      "#v": "views",
    },
    ExpressionAttributeValues: {
      ":incr": 1,
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
