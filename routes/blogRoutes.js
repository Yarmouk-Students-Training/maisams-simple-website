const express = require('express');
//const Blog = require('../models/blog');
const blogController = require('../controllers/blogControllers');
const router = express.Router();

//blog routes
router.get('/', blogController.blog_index);

router.post('/', blogController.blog_create_post);

router.get('/create', blogController.blog_create_get);

router.get('/:id', blogController.blog_details);

router.delete('/:id', blogController.blog_delete);
//redirects
//app.get('/about-us', (req,res) => {
  //  res.redirect('/about');
//});

module.exports = router;