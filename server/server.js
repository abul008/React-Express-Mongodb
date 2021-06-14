const express = require('express');
const cors = require("cors"); 
const {Msg} = require('./models/messages')
const app = express()
const mongoose = require('mongoose');
const http = require('http').createServer(app);
const io = require("socket.io")(http) 
const datashopp = require("./router/api");
const users = require('./router/users');
const mail = require("./router/mail");
const uploads = require("express-fileupload");
const path = require('path');
const mongoDB = "mongodb+srv://homeShop:erevan@abul.m5g87.mongodb.net/home_shop?retryWrites=true&w=majority";


mongoose.connect(mongoDB,{useNewUrlParser:true, useUni:true}).then(()=>{
    console.log('connected')
}).catch(err => console.log(err))

app.use(express.static('./methods-public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(uploads())


app.use(cors({
       origin:"http://localhost:3000" , 
       credentials:true
}));
app.use(express.json())

app.use(datashopp)
app.use(users)
app.use(mail)



io.on('connection' ,(socket)=>{

    Msg.find().then(res=>{
        socket.emit('output-messages', res)
        
    })
    socket.on('chat message',(data)=>{
        const message = new Msg({
              message: data.message,
              name: data.name,
              usersid: data.usersid
           });
          message.save().then(()=>{
            io.emit('chat messigeubdate', data)
          })  
          
    })
})
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.json(__dirname,'client/bulid')))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname, 'client/buld' , index.html))
    })
}
const port = process.env.PORT ||  9000 ;

http.listen(port, function() {
    console.log(`listeninsg on port ${port}`)
  })