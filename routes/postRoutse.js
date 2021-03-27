const express = require("express");
const {sequelize , posts} = require('.././models');
const route = express();
route.use(express.json())

route.post('/posts', async (req, res) => {
    const { postid , post_desc , username } = req.body
  
    try {
       console.log("Welcome", username)
       const post = await posts.create({postid , post_desc , username:username})
       return res.json(post)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })


  route.get('/posts', async (req, res) => {
    try {
      const post = await posts.findAll()
  
      return res.json(post)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  route.get('/posts/:postid', async (req, res) => {
    const postid = req.params.postid
    try {
      const post = await posts.findOne({where: { postid }  })
  
      return res.json(post)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  route.put('/posts', async (req, res) => {
    const { username ,post_desc, postid  }=req.body
    try {
      const post = await posts.findOne({where:{ postid }})
  
      post.post_desc = post_desc
      await post.save()
      return res.json(post)
    } 
    catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  route.delete('/posts/:postid', async (req, res) => {
    const postid = req.params.postid
    try {
      const post = await posts.findOne({ where: { postid } })
      await post.destroy()
      return res.json({ message: 'posts deleted!' })
    } 
    catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
    }
  })


module.exports = route;