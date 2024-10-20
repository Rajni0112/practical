const express=require('express')
const app=express()
const bodyparser=require("body-parser")
const path = require('path');

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
require('./database.js')
const userroutes=require('./routes/userroutes.js')
const contactroutes=require('./routes/contactroutes.js')
const blogroutes=require('./routes/blogroutes.js')

const validationtoken=require('./middlware/middlware.js')

// require('crypto').randomBytes(20, function(err, buffer) {
//     var token = buffer.toString('hex');
//     console.log(token)
//   });
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use('/api',userroutes)
app.use('/api',contactroutes)
app.use('/api',blogroutes)


app.listen(3000,()=>{
    console.log("server running on port 3000")
})