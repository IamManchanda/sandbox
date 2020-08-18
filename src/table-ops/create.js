const { config, DynamoDB } = require("aws-sdk");

config.update({ region: "eu-west-1" });
const dynamodb = new DynamoDB();

dynamodb.createTable(
  {
    TableName: "td_notes_sdk",
    AttributeDefinitions: [
      {
        AttributeName: "user_id",
        AttributeType: "S",
      },
      {
        AttributeName: "timestamp",
        AttributeType: "N",
      },
    ],
    KeySchema: [
      {
        AttributeName: "user_id",
        KeyType: "HASH",
      },
      {
        AttributeName: "timestamp",
        KeyType: "RANGE",
      },
    ],
    BillingMode: "PAY_PER_REQUEST",
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  },
);
