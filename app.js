const express = require("express");
const jwt = require('jsonwebtoken');
const { sequelize, users, posts } = require("./models");
const userRoutes = require("./routes/userRoutse")
const postRoutes = require("./routes/postRoutse")
const commentRoutes = require("./routes/commentRoutse")
const reactionsRoutes = require("./routes/reactionsRoutse")
const friendsRoutes = require("./routes/friendsRoutse")

const app = express()
app.use(express.json())

app.get( '/api', (req, res) => {
    res.json({

        message: 'Welcome to the API'
    });
}); 

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    const user = await users.findOne({where:{username, password}})
    if(user){
        const accessToken = await jwt.sign({username: user.username}, 'secretkey', { expiresIn: '10m'})
        const refreshToken = await jwt.sign({username: user.username}, 'refreshKey', { expiresIn: '60d'})
        return res.status(201).send({ accessToken, refreshToken })
    }else{
        return res.status(403).send({"message" : "username or  password invalid"})
    }
});

app.post('/api/refesh_token', async(req, res, next) => {
    
    const user = await users.findOne({ where:{username,password}})
    if(user) {
         const accessToken = await jwt.sign({username: user.username}, 'secretkey', {expiresIn: '10m'})
         const refreshToken = await jwt.sign({username: user.username}, 'refreshKey', { expiresIn: '60d'})
         return res.status(201).send({ accessToken, refreshToken })
    } else {
        return res.status(403).send({ "message" : "username or  password invalid" })
    }
    
});

app.get('/api/post/mypost', verifyToken, async(req, res) => {
    const user = req.username 

    const post = await posts.findAll({ where: {username:user} })

    return res.status(201).send(post)

    //return res.send({"username": req.username})
})
//FORMAT OF TOKEN
//Authorization Bearer <access_token>
//Verify Token
function verifyToken(req, res, next) {
    //Ger auth header value
    const authorizationHeader = req.headers.authorization

    if(!authorizationHeader){
        return res.status(403).send({"message": "No Token"})
    }
    const token = authorizationHeader.split(' ')[1]

    if(token){
        jwt.verify(token, 'maisam', (err, username) => {
            if(err)
                return res.status(403).send({"message": "invalid"})
            console.log(username)
            req.username = username.username
            next()
        })

    }else {
        return res.status(403).send({"message": "No Token"})
    }
}

app.listen({ port: 3000 }, async () => {
    console.log('Server up on http://127.0.0.1:5000')
    //await sequelize.sync({ force:true })
    await sequelize.authenticate()
    //console.log('Database synced!')
    console.log('Database connected!')
})
app.use(userRoutes)
app.use(postRoutes)
app.use(commentRoutes)
app.use(reactionsRoutes)
app.use(friendsRoutes)

