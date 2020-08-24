const { config, DynamoDB } = require("aws-sdk");

config.update({
  region: "eu-west-1",
});

const documentClient = new DynamoDB.DocumentClient();

documentClient.put(
  {
    TableName: "global_td_notes",
    Item: {
      user_id: "891633d8-442e-4c8c-a99c-fa5398beeb22",
      timestamp: 1598252793,
      title: "ABC title",
      content: "ABC content",
    },
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(data, null, 2));
      console.log("Put operaton successful in", config.region);
      setTimeout(() => {
        config.update({
          region: "us-east-1",
        });
        documentClient.get(
          {
            TableName: "global_td_notes",
            Key: {
              user_id: "891633d8-442e-4c8c-a99c-fa5398beeb22",
              timestamp: 1598252793,
            },
          },
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Getting the item from ${config.region}`);
              console.log(JSON.stringify(data, null, 2));
            }
          },
        );
      }, 1000);
    }
  },
);
