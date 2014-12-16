//require all 
var express = require("express"),
	bodyParser = require("body-parser"),
	app = express(),
	methodOverride = require("method-override"),
	pg = require("pg"),
	passport = require("passport"),
	passportLocal = require("passport-local"),
	session = require("cookie-session"),
	yelp = require("yelp");
	
var db = require("./models"); 

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

//get root page
app.get("/", function (req, res) {
	res.render("sites/home");
});

//sign up page
app.get("/sign_up", function (req, res) {
	res.render("users/sign_up");
});

app.post("/sign_up", function (req, res) {
	console.log(req.body);
	var newUser = req.body.user;

	// You need to call db.user.createSecure(firstname, lastname, email, password, callback-error, callback-success)
	db.user.createSecure(newUser.firstName, newUser.lastName, newUser.email, 
		newUser.pw, function (){
			console.log("error!!");
		}, function () { // Define the success action here:
			req.login(newUser);
			res.redirect("/userHomepage");
		});
});

//login page
app.get("/login", function (req, res) {
	res.render("users/login");
});

/*checking to see if user has a login, if yes redirect to userHomepage
if not, redirect back to login*/
app.post("/login", 
	passport.authenticate('local', {
	successRedirect: "/userHomepage",
	failureRedirect: '/login'
	}
	)
);

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