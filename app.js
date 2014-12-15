//require all 
var express = require("express"),
	//bcryt = require('bcryt'),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	pg = require("pg"),
	app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//var db = require("./models"); 


// Refactor connection and query code
//var db = require("./models");




app.listen(3000, function() {
  console.log('Listening');
});