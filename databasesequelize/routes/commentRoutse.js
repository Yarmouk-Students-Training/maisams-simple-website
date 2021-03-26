const express = require("express");
const { flatMap } = require('lodash');
const {sequelize , comments} = require('./models');
const route = express();
const req = require("request");
const { comments } = require("./routes/comment");

route.use(express.json());

route.post('/comments', async (req, res) => {
  const {  comment_desc , postid  , commentid , username  } = req.body

  try {
    const comments = await comments.create({comment_desc , postid  , commentid , username:username })
    return res.json(comments)
  }
   catch (err)
   {
    console.log(err)
    return res.status(500).json(err) 
  }
  }) 

  route.put('/comments', async (req, res) => {
    const { username , comment_desc , commentid , postid  } = req.body
  try {
    const comments = await comments.findOne({ where: {commentid} })
    comments.comment_desc= comment_desc
    await comments.save()

    return res.json(comments)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

route.delete('/comments/:commentid', async (req, res) => {
  const commentid = req.params.commentidD
  try {
    const comments = await comments.findOne({ where: { commentid } })
    await comments.destroy()
    return res.json({ message: 'comment deleted!' })
    } 
  catch (err) {
  console.log(err)
  return res.status(500).json({ error: 'Something went wrong' })
  }
})


module.exports = route;