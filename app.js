//require all 
var express = require("express"),
	bodyParser = require("body-parser"),
	app = express(),
	methodOverride = require("method-override"),
	pg = require("pg"),
	

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//var db = require("./models"); 

//out root route
app.get("/", function (req, res) {
	res.render("sites/home");
});





app.listen(3000, function() {
  console.log(new Array("*").join());
  console.log("STARTED ON localhost:3000");
});