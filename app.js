//require all 
var express = require("express"),
x
	bodyParser = require("body-parser"),
	app = express(),
	methodOverride = require("method-override"),
	pg = require("pg"),
	


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

var db = require("./models"); 

//out root route
app.get("/", function (req, res) {
	res.send("hello world");
});



app.listen(3000, function() {
  console.log(new Array("*").join());
  console.log(STARTED ON localhost3000);
});