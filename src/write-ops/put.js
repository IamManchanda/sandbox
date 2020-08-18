const { config, DynamoDB } = require("aws-sdk");

config.update({ region: "eu-west-1" });
const documentClient = new DynamoDB.DocumentClient();

documentClient.put(
  {
    TableName: "td_notes_sdk",
    Item: {
      user_id: "bb",
      timestamp: 1597745800,
      title: "my second sdk title and changed",
      content:
        "my second sdk content and changed, lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique saepe fuga fugiat aliquam soluta voluptatibus numquam rerum nobis voluptatem quaerat, consequatur vitae itaque velit explicabo consequuntur, ab distinctio alias illum.",
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
