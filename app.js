const express = require("express");
const { sequelize} = require("./models");
const userRoutes = require("./routes/userRoutse")
const postRoutes = require("./routes/postRoutse")
const commentRoutes = require("./routes/commentRoutse")
const reactionsRoutes = require("./routes/reactionsRoutse")
const friendsRoutes = require("./routes/friendsRoutse")



const app = express()
app.use(express.json())

app.listen({ port: 5000 }, async () => {
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

