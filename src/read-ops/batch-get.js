const { config, DynamoDB } = require("aws-sdk");

config.update({ region: "eu-west-1" });
const documentClient = new DynamoDB.DocumentClient();

documentClient.batchGet(
  {
    RequestItems: {
      td_notes_test: {
        Keys: [
          {
            user_id: "A",
            timestamp: 1,
          },
          {
            user_id: "B",
            timestamp: 2,
          },
        ],
      },
      td_notes_sdk: {
        Keys: [
          {
            user_id: "11",
            timestamp: 1597747033,
          },
        ],
      },
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
