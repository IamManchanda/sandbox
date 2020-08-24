const async = require("async");
const isEmpty = require("lodash/isEmpty");
const union = require("lodash/union");
const { config, DynamoDB } = require("aws-sdk");

config.update({
  region: "eu-west-1",
});

const documentClient = new DynamoDB.DocumentClient();

let startKey = [],
  results = [],
  pages = 0;

async.doWhilst(
  (callback) => {
    let params = {
      TableName: "global_td_notes",
      ConsistentRead: true,
      Limit: 3,
    };
    if (!isEmpty(startKey)) {
      params.ExclusiveStartKey = startKey;
    }
    documentClient.scan(params, (err, data) => {
      if (err) {
        console.log(err);
        callback(null, {});
      } else {
        startKey =
          typeof data.LastEvaluatedKey !== "undefined"
            ? data.LastEvaluatedKey
            : [];
        pages += 1;
        console.log(data.Items);
        console.log(`Pages: ${pages}`);
        callback(null, results);
      }
    });
  },
  () => true,
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Pages (final): ${pages}`);
    }
  },
);
