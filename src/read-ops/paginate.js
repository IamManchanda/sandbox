const async = require("async");
const isEmpty = require("lodash/isEmpty");
const union = require("lodash/union");
const { config, DynamoDB } = require("aws-sdk");

config.update({ region: "eu-west-1" });
const documentClient = new DynamoDB.DocumentClient();

let startKey = [],
  results = [],
  pages = 0;

async.doWhilst(
  (callback) => {
    let params = {
      TableName: "td_notes_test",
      Limit: 3,
    };

    if (!isEmpty(startKey)) {
      params.ExclusiveStartKey = startKey;
    }

    documentClient.scan(params, (err, data) => {
      if (err) {
        console.log(err);
        callback(err, {});
      } else {
        startKey =
          typeof data.LastEvaluatedKey !== "undefined"
            ? data.LastEvaluatedKey
            : [];

        if (!isEmpty(data.Items)) {
          results = union(results, data.Items);
        }

        pages += 1;
        callback(null, results);
      }
    });
  },
  () => (isEmpty(startKey) ? false : true),
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(data, null, 2));
      console.log(`Item Count: ${data.length}`);
      console.log(`Pages: ${pages}`);
    }
  },
);
