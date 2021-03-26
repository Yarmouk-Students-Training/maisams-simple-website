const express = require("express");
const { flatMap } = require('lodash');
const {sequelize , friends} = require('./models');
const req = require("request");
const route = express();
const { friends} = require("./routes/friends");
route.use(express.json());


route.post('/friends', async (req, res) => {
    const { username:username  , friendid }=req.body
  
    try {
      console.log("friends",friendid, username)
      const friend = await friends.create({username , friendid })
      return res.json(friend)
    }
     catch (err) {
     console.log(err)
     return res.status(500).json(err)
    }
  })

  route.get('/friends', async (req, res) => {
    try {
      const friend = await friends.findAll()
  
      return res.json(friend)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  route.get('/friends/:friendid', async (req, res) => {
    const friendid = req.params.friendid
    try {
      const friend = await friends.findOne({ where: { friendid },
        include: 'posts',
      })
  
      return res.json(friend)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })



module.exports = route;