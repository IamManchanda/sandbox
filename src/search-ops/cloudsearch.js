const { config, CloudSearchDomain } = require("aws-sdk");

config.update({ region: "eu-west-1" });
const csd = new CloudSearchDomain({
  endpoint:
    "search-td-notes-search-ydihnxbrr7rgygoo3nmxuhi4ee.eu-west-1.cloudsearch.amazonaws.com",
});
csd.search(
  {
    query: "mobile",
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  },
);
