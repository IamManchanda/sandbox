const { config, DynamoDB } = require("aws-sdk");

config.update({ region: "eu-west-1" });
const dynamodb = new DynamoDB();

dynamodb.describeTable(
  {
    TableName: "td_notes",
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  },
);
