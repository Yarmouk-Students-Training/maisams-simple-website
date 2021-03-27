const express = require("express");
const {sequelize , reactions} = require('.././models');
const route = express();
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


  route.get('/posts/:postid/reactions', async (req, res) => {
    const postid = req.params.postid
    try {
      const react = await reactions.findAll({where: { postid }  })
  
      return res.json(react)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
 

  route.put('/reactions', async (req, res) => {
    const { username, react_type , reactid , postid  } = req.body
    try {
      const reaction = await reactions.findOne({ where: { reactid } })
      reaction.react_type = react_type 
      await reaction.save()
      return res.json(reaction)
    } 
    catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  route.delete('/reactions/:reactid', async (req, res) => {
    const reactid = req.params.reactid
    try {
      const reaction = await reactions.findOne({ where: { reactid:reactid } })
  
      await reaction.destroy()
  
      return res.json({ message: 'reaction deleted!' })
    } 
    catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
    }
  }) 

  module.exports = route;