var async = require('async');
var yelp = require("yelp").createClient({
 consumer_key: 'G5anRhxI1PW0rZL8tMJ3Eg',
 consumer_secret: 'z8wc3IEbI4jQNULy_A-oM97hVn0',
 token: '2ge699zk0LcUMigQ2SdGyWFiIsMHWpjs',
 token_secret: '0g9XHFcvYSrZ083iOYX04T4-7j4'})


// async.parallel([
//     function(callback){
//             callback(null, 'one');
//     },
//     function(callback){
//             callback(null, 'two');
//         }],
// function(err, results){
// console.log(results);
// });

var arr = [ 'jessup-cellars-yountville',
  'jessup-cellars-yountville',
  'white-rock-vineyards-napa',
  'jessup-cellars-yountville',
  'jessup-cellars-yountville',
  'jessup-cellars-yountville',
  'del-dotto-caves-winery-and-tasting-room-napa',
  'jessup-cellars-yountville',
  'trahan-winery-napa' ];

var yelpIt = function(yelp_id, cb) {
	yelp.business(yelp_id, function(err,data){
		//console.log(data);
		cb(null, data);
	});
};

async.map(arr, yelpIt, function(err, result){
	console.log(result);
  // result is [NaN, NaN, NaN]
  // This fails because the `this.squareExponent` expression in the square
  // function is not evaluated in the context of AsyncSquaringLibrary, and is
  // therefore undefined.
});



				// async.parallel([
				// 	function(callback) {
				// 		wineries.forEach( function (winery) {
				// 			yelp.business(winery.yelp_id, function(error, data) {
		  // 					console.log(error);
		  // 					console.log(data);
		  // 					//yelp_wineries[yelp_wineries.length] = data;
		  // 					return 
	  	// 					});
				// 		});
				// 	}], function(err, results) {
				// 		res.render("users/userHomepage", {currentUser: req.user, wineries: yelp_wineries});
				// 	});