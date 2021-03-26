const express = require("express");
const { sequelize} = require("./models");
const req = require("request");
const app = express()
app.use(express.json())

app.listen({ port:5000 }, async () => {
    console.log('Server up on http://127.0.0.1:5000')
    //await sequelize.sync({ force:true })
    await sequelize.authenticate()
    //console.log('Database synced!')
    console.log('Database connected!')
})


