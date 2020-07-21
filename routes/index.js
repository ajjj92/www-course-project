var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	//if user is authenticated then -> next middleware
	if (req.isAuthenticated())
		return next();
	// if not then redirect to index page
	res.redirect('/');
}

module.exports = function(passport){
	//routes
	router.get('/', function(req, res) {

		res.render('index', { message: req.flash('message') });
	});

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/posts',
		failureRedirect: '/',
		failureFlash : true  
	}));

	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	//passport authenticate, if succesfull redirect to homepage
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user, flash:req.flash("updatemsg") });
	});

	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	router.post('/update', isAuthenticated,passport.authenticate('update', {
		successRedirect: '/home',
		failureFlash : true  
	}));

	return router;
}
