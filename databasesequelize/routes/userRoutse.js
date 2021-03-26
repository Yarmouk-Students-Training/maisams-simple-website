const express = require("express");
const { flatMap } = require('lodash');
const {sequelize , users} = require('./models');
const req = require("request");
const route = express();
const { users } = require("./routes/users");

route.use(express.json());

route.post('/users' , async (req, res) => {
    const { username, password, userid, email, country, gender } = req.body

    try{
        console.log('Welcome')
        const user = await users.create({ username, password, userid, email, country, gender })

        return res.json(user)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})
route.get('/user', async (req, res) => {
    try { 
        console.log("hi")
      const User = await user.findAll()
  
      return res.json(User)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  route.get('/users/:username', async (req, res) => {
    const username = req.params.username
    try {
      const user = await users.findOne({   where: { usename: username },
        include: 'posts',
      })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  route.put('/users', async (req, res) => {
    const {username, password, userid, email, country, gender  } = req.body
    try {
      const user = await users.findOne({ where: { username:username } })
  
      user.password =password
      user.userid = userid 
      user.email = email
      user.country = country
      user.gender = gender
  
      await user.save()
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  route.delete('/users/:username', async (req, res) => {
    const username = req.params.username
    try {
      const user = await users.findOne({ where: { username:username } })
  
      await user.destroy()
  
      return res.json({ message: 'User deleted!' })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

module.exports = route;