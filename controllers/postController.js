var Post = require('../models/post');

// Good validation documentation available at https://express-validator.github.io/docs/
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


// Code from the example by Antti Knutas
// Display list of all posts.
exports.index = function(req, res, next) {
  
  Post.find({}).exec(function (err, list_posts) {
    if (err) { return next(err); }
    // Successful, so render
    //reverse the post lists so the newest post is first
    let reversedPosts = list_posts.reverse()
    res.render('posts', { title: 'SocialNetworkAJ', post_list: reversedPosts, user:req.user});
  });

};

// Handle book create on POST.
exports.create = function(req, res, next) {
  sanitizeBody('*').trim().escape();
  // Create a post object
  // Validate body and get username from passport
  // Before saving check that the content is not empty and not too long
  let authUser = req.user.username
  if(req.body.content !== '' && req.body.content.length <=300) {
    var post = new Post(
      { content: req.body.content,
        author: authUser
      });
  
      post.save(function (err) {
        if (err) { return next(err); }
        // Successful - redirect to new book record.
        res.redirect('/posts');
      });
  }
}