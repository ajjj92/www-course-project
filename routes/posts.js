var express = require('express');
var router = express.Router();

// Require controllers
var post_controller = require('../controllers/postController');


var isAuthenticated = function (req, res, next) {
	//if user is authenticated then -> next middleware
	if (req.isAuthenticated())
		return next();
	// if not then redirect to index page
	res.redirect('/');
}

//get post list page, we send the post_contrloller as middleware as in example by Antti Knutas
router.get('/', isAuthenticated, post_controller.index );

//create new post
router.post('/create',isAuthenticated, post_controller.create);

module.exports = router;
