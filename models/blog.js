const mongooes = require('mongoose');
const Schema = mongooes.Schema;

const blogSchema = new Schema({
  title:{
      type: String,
      required: true
  },
  snippet: {
      type: String,
      required: true
  },
  body: {
      type:String,
      required: true
  }

}, { timestamps: true });

const Blog = mongooes.model('Blog', blogSchema);
module.exports = Blog;
