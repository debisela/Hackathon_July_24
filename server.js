const express = require('express');
const cors = require('cors');
require('dotenv').config()

const gRouter = require('./route/groceryRoute.js')


const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/', express.static(__dirname +'/public'));
//console.log(__dirname+'/public');

app.get("/home", (req, res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

const PORT = process.env.PORT || 3200
app.listen(PORT, ()=>{
    console.log(`run on ${PORT}`);
})

app.use('/groceries', gRouter)