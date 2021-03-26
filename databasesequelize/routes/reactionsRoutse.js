const express = require("express");
const { flatMap } = require('lodash');
const {sequelize , reactions} = require('./models');
const req = require("request");
const route = express();
const { reactions } = require("./routes/reactions");
route.use(express.json());

route.post('/reactions', async (req, res) => {
    const {  react_type , postid  , reactid ,username:username  } = req.body
  
    try {
      const reaction = await reactions.create({react_type , postid  , reactid ,username:username})
      return res.json(reaction)
      } 
      catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  route.get('/reactions', async (req, res) => {
    try {
      const reaction = await reactions.findAll()
  
      return res.json(reaction)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  route.get('/reactions/:reactid', async (req, res) => {
    const reactid = req.params.reactid
    try {
      const reactions = await reactions.findOne({where: { reactid },
        
      })
  
      return res.json(reactions)
    } catch (err){
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  route.put('/reactions', async (req, res) => {
    const { username, react_type , reactid , postid  } = req.body
    try {
      const reactions = await reactions.findOne({ where: { reactid } })
      reactions.react_type = react_type 
      await reactions.save()
      return res.json(reactions)
    } 
    catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  route.delete('/reactions/:reactid', async (req, res) => {
    const reactid = req.params.reactid
    try {
      const reactions = await reactions.findOne({ where: { reactid } })
  
      await reactions.destroy()
  
      return res.json({ message: 'reaction deleted!' })
    } 
    catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
    }
  }) 

  module.exports = route;