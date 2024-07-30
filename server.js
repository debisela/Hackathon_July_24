const express = require('express');
require('dotenv').config()

const gRouter = require('./route/groceryRoute.js')


const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const PORT = process.env.PORT || 3200
app.listen(PORT, ()=>{
    console.log(`run on ${PORT}`);
})

app.use('/groceries', gRouter)