const express = require("express");
const {sequelize , comments} = require('.././models');
const route = express();

route.use(express.json());

route.post('/comments', async (req, res) => {
  const {  comment_desc , postid  , commentid , username  } = req.body

  try {
    const comment = await comments.create({comment_desc , postid  , commentid , username:username })
    return res.json(comment)
  }
   catch (err)
   {
    console.log(err)
    return res.status(500).json(err) 
  }
  }) 

  route.get('/posts/:postid/comments', async (req, res) => {
    const postid = req.params.postid
    try {
      const comment = await comments.findAll({where: { postid }  })
  
      return res.json(comment)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })


  route.put('/comments', async (req, res) => {
    const { username , comment_desc , commentid , postid  } = req.body
  try {
    const comment = await comments.findOne({where:{ commentid }})
    
    comment.comment_desc= comment_desc
    await comment.save()

    return res.json(comment)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

route.delete('/comments/:commentid', async (req, res) => {
  const commentid = req.params.commentid
  try {
    const comment = await comments.findOne({ where: { commentid:commentid } })
    await comment.destroy()
    return res.json({ message: 'comment deleted!' })
    } 
  catch (err) {
  console.log(err)
  return res.status(500).json({ error: 'Something went wrong' })
  }
})


module.exports = route;