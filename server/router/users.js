const express = require('express');
const router = express.Router();
const {Msg,Login,Model} = require('../models/messages');
const bodyParser = require("body-parser").urlencoded({extended:true}); 


router.post("/login", bodyParser, async(req,res)=>{
    if(true !==0 && req.body.firstname !==0 && req.body.lastname !==0 && req.body.reg_email !== 0 && req.body.reg_passwd !==0 && req.body.men !==0 && req.body.girl !==0) {
        await Login({
             firstname:req.body.firstname,
             lastname:req.body.lastname,
             reg_email:req.body.reg_email,
             reg_passwd:req.body.reg_passwd,  
             gender:req.body.gender,
             month:req.body.month,
             good:req.body.good,
             dey:req.body.dey,
             condition: true,
           }).save()
           res.redirect('http://localhost:3000/')
    }else{
  
           res.sendStatus(404)
    
    }
})
router.post("/sing",bodyParser, async(req,res)=>{

    await  Login.find({reg_email:req.body.login , reg_passwd:req.body.password},(err,data) =>{
             if(err){
                    throw err
             }
             if(data.length !==0 ){
                    res.send(data) 
             }
   })
    
       
})

router.get("/datashoping",async( req,res)=>{
    let persion = await Login.find({})
    res.send(persion)      
      
})

router.get("/datashoping/:id" ,async(req,res)=>{
    let userspeople = await Login.findById(req.params.id)
    res.send(userspeople)
})


module.exports = router