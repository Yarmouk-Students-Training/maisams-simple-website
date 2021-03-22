const express = require('express')

const { sequelize } = require('./models')
const reactions = require('./models/reactions')

const app = express()
app.use(express.json())

app.post('/users',async(req, res) => {
    const { username, password, userid, email, country, gender } = req.body

    try{
        const user = await User.create({ username, password, userid, email, country, gender })

        return res.json(user)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})
app.get('/users', async(req, res) => {

    try{
        const users = await User.findAll()

        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Somthing went Wrong' })
    }
})


app.post('/friends',async(req, res) => {
    const { friendid } = req.body

    try{
        const friend = await friend.create({ friendid })

        return res.json(friend)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})
app.get('/friends', async(req, res) => {

    try{
        const friends = await friends.findAll()

        return res.json(friends)
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Somthing went Wrong' })
    }
})
app.post('/posts',async(req, res) => {
    const { postid, post_desc } = req.body

    try{
        const post = await Post.create({ postid, post_desc })

        return res.json(post)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})
app.get('/posts', async(req, res) => {

    try{
        const posts = await posts.findAll()

        return res.json(posts)
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Somthing went Wrong' })
    }
})
app.post('/comments',async(req, res) => {
    const { commentid, comment_desc } = req.body

    try{
        const comment = await comment.create({ commentid, comment_desc })

        return res.json(comment)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})
app.get('/comments', async(req, res) => {

    try{
        const comments = await comments.findAll()

        return res.json(comments)
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Somthing went Wrong' })
    }
})
app.post('/reactions',async(req, res) => {
    const { reactid, react_type } = req.body

    try{
        const react = await react.create({ reactid, react_type })

        return res.json(react)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})
app.get('/reactions', async(req, res) => {

    try{
        const reactions = await reactions.findAll()

        return res.json(reactions)
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Somthing went Wrong' })
    }
})
app.listen({ port:5000 }, async () => {
    console.log('Server up on http://localhost:5000')
    //await sequelize.sync({ force:true })
    await sequelize.authenticate()
    //console.log('Database synced!')
    console.log('Database connected!')
})


