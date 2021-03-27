const express = require("express");
const {sequelize , friends} = require('.././models');
const route = express();
route.use(express.json());


route.post('/friends', async (req, res) => {
    const { firstuser, seconduser , status }=req.body
  
    try {
     // console.log("friends",friendid, username)
        const friend = await friends.create({firstuser, seconduser , status})
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
  

  route.put('/friends', async (req, res) => {
    const { firstuser, seconduser , status }=req.body
    try {
    var friend = await friends.findOne({where:{ firstuser,seconduser }})
    if(!friend)
      friend = await friends.findOne({where:{ firstuser: seconduser, seconduser: firstuser }})
    friend.status= status
    await friend.save()

    return res.json(friend)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

route.delete('/friends/:firstuser/:seconduser', async (req, res) => {
  const firstuser = req.params.firstuser
  const seconduser = req.params.seconduser

  try {
    var friend = await friends.findOne({ where: { firstuser,seconduser} })
    if(!friend)
      friend = await friends.findOne({where:{ firstuser: seconduser, seconduser: firstuser }})
    await friend.destroy()
    return res.json({ message: 'friend deleted!' })
    } 
  catch (err) {
  console.log(err)
  return res.status(500).json({ error: 'Something went wrong' })
  }
})


module.exports = route;