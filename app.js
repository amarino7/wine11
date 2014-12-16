//require all 
var express = require("express"),
	bodyParser = require("body-parser"),
	app = express(),
	methodOverride = require("method-override"),
	pg = require("pg"),
	passport = require("passport"),
	session = require("cookie-session");
	

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//saving session data
app.use(session( {
	secret: 'secretKey',
	name: 'session with cookie data',
	maxage: 3600000
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
	console.log("SERIALIZE JUST RAN");
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log("DESERIALIZE JUST RAN");
	db.user.find({
		where: {
			id: id
		}
	})
	.then(function(user){
		done(null, user);
	},
	function(err) {
		done(err, null);
	});
});
var db = require("./models"); 

//out root route
app.get("/", function (req, res) {
	res.render("sites/home");
});

//sign up page
app.get("/sign_up", function (req, res) {
	res.render("users/sign_up");
});

app.post("/sign_up", function (req, res) {

});

app.get("/login", function (req, res) {
	res.render("users/login");
});

app.post("/login", function (req, res) {

});

/*app.get("logout", function (req, res) {
	res.render("logout");
})*/

app.get("/userHomepage", function (req, res) {
	res.render("users/userHomepage");
});

app.get("/userFavorites", function (req, res) {
	res.render("users/userFavorites");
});

app.get("/map", function (req, res) {
	res.render("users/map");
});

app.listen(3000, function() {
  console.log(new Array("*").join());
  console.log("STARTED ON localhost:3000");
});