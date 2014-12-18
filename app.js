//require all middleware
var express = require("express"),
	bodyParser = require("body-parser"),
	app = express(),
	methodOverride = require("method-override"),
	pg = require("pg"),
	bcrypt = require("bcrypt"),
	passport = require("passport"),
	passportLocal = require("passport-local"),
	session = require("cookie-session"),
	request = require("request");

//YELP API OAuth
var yelp = require("yelp").createClient({
 consumer_key: 'G5anRhxI1PW0rZL8tMJ3Eg',
 consumer_secret: 'z8wc3IEbI4jQNULy_A-oM97hVn0',
 token: '2ge699zk0LcUMigQ2SdGyWFiIsMHWpjs',
 token_secret: '0g9XHFcvYSrZ083iOYX04T4-7j4'})

// var OAuth = require("oauth"); // Delete - NOT USED!
// var util = require("util");
	
var db = require("./models"); 

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));


// request("http//www.mapbox.api..", function (error, response, body) {
// 	if (!error && response.statusCode === 200) {
// 		var bodyJSON = JSON.parse(body.features);
// 		console.log(body);
// 	}
// });

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
		newUser.pw, function (error){
			console.log("error!!");
		}, function (success) { // Define the success action here:
			req.login(newUser ,function (){
				res.redirect("/userHomepage")
			})
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
	})
);

app.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/");
})


app.get("/userHomepage", function (req, res) {
	db.wineries.findAll({ where: {userId: req.user.id} })
	.then(function (wineries) {
		console.log(wineries);
	res.render("users/userHomepage", {currentUser: req.user, wineries: wineries});
	});
});


app.get("/map", function (req, res) {
	res.render("users/map");
});

//sends search results to the results page w/Map and YELP reviews
// chosen by user
app.get("/search", function (req, res) {
	yelp.search({term: "winery", location: req.query.loc}, function (err, data) {
		console.log(data);
		res.render("users/results", {results: data})
	})
});

//saving winery by YELP id to users homepage
app.post("/save/:id", function (req, res) {
	console.log(req.user);
	db.wineries.create({userId: req.user.id, yelp_id: req.params.id})
	.then (function (winery) {
		console.log(winery);
		res.redirect("/userHomepage");
	})

});

app.listen(3000, function() {
  console.log(new Array("*").join());
  console.log("STARTED ON localhost:3000");
});