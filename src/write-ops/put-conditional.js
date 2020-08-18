const { config, DynamoDB } = require("aws-sdk");

config.update({ region: "eu-west-1" });
const documentClient = new DynamoDB.DocumentClient();

documentClient.put(
  {
    TableName: "td_notes_sdk",
    Item: {
      user_id: "ABC",
      timestamp: 1597748534,
      title: "my initial sdk title first",
      content: "my initial sdk content first",
    },
    ConditionExpression: "#t <> :t",
    ExpressionAttributeNames: {
      "#t": "timestamp",
    },
    ExpressionAttributeValues: {
      ":t": 1597748534,
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
