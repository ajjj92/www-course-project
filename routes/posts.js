var express = require('express');
var router = express.Router();

// Require controllers
var post_controller = require('../controllers/postController');


var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

// GET post listing page
router.get('/', isAuthenticated, post_controller.index );

// POST request for creating a new post
router.post('/create',isAuthenticated, post_controller.create);

module.exports = router;
