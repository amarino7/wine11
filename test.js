var OAuth = require("oauth");
var util = require("util");

var url = "http://api.yelp.com/v2/search?";
var params = "term=winery&location=San+Francisco";


var oauth = new OAuth.OAuth(
  '2ge699zk0LcUMigQ2SdGyWFiIsMHWpjs', // Public Token
  '0g9XHFcvYSrZ083iOYX04T4-7j4', // Secret Token
  'G5anRhxI1PW0rZL8tMJ3Eg', // Consumer Key
  'z8wc3IEbI4jQNULy_A-oM97hVn0', // Secret Key
  '1.0',
  null,
  'HMAC-SHA1'
);
oauth.get(
  url + params, // API URL + Params
  '2ge699zk0LcUMigQ2SdGyWFiIsMHWpjs', // User Token 
  '0g9XHFcvYSrZ083iOYX04T4-7j4', // Secret Token            
  function (e, data, res){
    if (e) console.error("An error occurred:", e);

    // console.log(JSON.parse(data)); // This does a standard printing of an object. Using Util improves console formatting

    console.log(util.inspect(JSON.parse(data), {depth: 3}));      
  });    

/*
app.get("/search", function(req, res) {

  // grab location entered by user
  var url = "http://api.yelp.com/v2/search?";


  var location = req.body.searchForm.location; // <input type="text" name="searchForm[location]"> 
  var params = "term=winery&location=" + location;

  // make request using oAuth
  var oauth = new OAuth.OAuth(
  '2ge699zk0LcUMigQ2SdGyWFiIsMHWpjs', // Public Token
  '0g9XHFcvYSrZ083iOYX04T4-7j4', // Secret Token
  'G5anRhxI1PW0rZL8tMJ3Eg', // Consumer Key
  'z8wc3IEbI4jQNULy_A-oM97hVn0', // Secret Key
  '1.0',
  null,
  'HMAC-SHA1'
);
oauth.get(
  url + params, // API URL + Params
  '2ge699zk0LcUMigQ2SdGyWFiIsMHWpjs', // User Token 
  '0g9XHFcvYSrZ083iOYX04T4-7j4', // Secret Token            
  function (e, data, res){
    if (e) console.error("An error occurred:", e);

    // console.log(JSON.parse(data)); // This does a standard printing of an object. Using Util improves console formatting

    console.log(util.inspect(JSON.parse(data), {depth: 3}));      
  });    

});

*/