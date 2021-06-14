const express = require('express');
const router = express.Router();
const {Msg,Login,Model} = require('../models/messages');
const bodyParser = require("body-parser").urlencoded({extended:true}); 


router.post("/creat", bodyParser, async (req, res)=>{
    if (req.body.name !==0 && req.body.src !==0 && req.body.buy !== 0 && req.body.cash !==0 && req.body.Monthly !==0 ) {
        await Model({
          name:req.body.name,
          src:req.body.src,
          shopnames:req.body.shopnames,
          buy:req.body.buy,
          cesh:req.body.cash,
          color:req.body.Monthly,
          whereabouts:req.body.whereabouts,
          description:req.body.description,
          other:req.body.other,
          info:req.body.info,
          file:req.body.file
        }).save()
     
         switch(req.body.name){
     case "PHONE":
            res.redirect("http://localhost:3000/home/techniquenav/phone") ;
            break;
     case "TV":
        res.redirect("http://localhost:3000/home/techniquenav/tv");
            break;
     case "TABLET":
            res.redirect("http://localhost:3000/home/techniquenav/tablet");
            break; 
     case "WATCH":
            res.redirect("http://localhost:3000/home/techniquenav/watch");
            break; 
     case "COMPUTERS":
            res.redirect("http://localhost:3000/home/techniquenav/computer");
            break; 
     case "ACCESORIES":
            res.redirect("http://localhost:3000/home/techniquenav/accesories");
            break; 
    case "EQUIPMENTS":
            res.redirect("http://localhost:3000/home/techniquenav/equipments"); 
            break; 
    case "PHOTO CAMERAS":
            res.redirect("http://localhost:3000/home/techniquenav/photocameras");
            break; 
    case "Household Appliances":
            res.redirect("http://localhost:3000/home/techniquenav/household");   
            break;                    
    default:
        res.redirect("http://localhost:3000/home");          
  } 
    }
    else{
           res.sendStatus(404)
    } 

})

router.post("/ubdate", bodyParser, async( req , res)=>{
          
    await Model.findOneAndUpdate({_id:req.body.id},{$set:{
          name:req.body.name,
          src:req.body.src,
          shopnames:req.body.shopnames,
          buy:req.body.buy,
          cesh:req.body.cash,
          color:req.body.Monthly,
          whereabouts:req.body.whereabouts,
          description:req.body.description,
          other:req.body.other,
          info:req.body.info
   }})
  
   switch(req.body.name){
          case "PHONE":
                 res.redirect("http://localhost:3000/home/techniquenav/phone") ;
                 break;
          case "TV":
             res.redirect("http://localhost:3000/home/techniquenav/tv");
                 break;
          case "TABLET":
                 res.redirect("http://localhost:3000/home/techniquenav/tablet");
                 break; 
          case "WATCH":
                 res.redirect("http://localhost:3000/home/techniquenav/watch");
                 break; 
          case "COMPUTERS":
                 res.redirect("http://localhost:3000/home/techniquenav/computer");
                 break; 
          case "ACCESORIES":
                 res.redirect("http://localhost:3000/home/techniquenav/accesories");
                 break; 
         case "EQUIPMENTS":
                 res.redirect("http://localhost:3000/home/techniquenav/equipments"); 
                 break; 
         case "PHOTO CAMERAS":
                 res.redirect("http://localhost:3000/home/techniquenav/photocameras");
                 break; 
         case "Household Appliances":
                 res.redirect("http://localhost:3000/home/techniquenav/household");   
                 break;                    
         default:
             res.redirect("http://localhost:3000/home");          
       } 
})
router.post("/delete",bodyParser, async(req,res)=>{
   await Model.findOneAndDelete({_id:req.body.id},{$set:{
}})
switch(req.body.name){
   case "PHONE":
          res.redirect("http://localhost:3000/home/techniquenav/phone") ;
          break;
   case "TV":
      res.redirect("http://localhost:3000/home/techniquenav/tv");
          break;
   case "TABLET":
          res.redirect("http://localhost:3000/home/techniquenav/tablet");
          break; 
   case "WATCH":
          res.redirect("http://localhost:3000/home/techniquenav/watch");
          break; 
   case "COMPUTERS":
          res.redirect("http://localhost:3000/home/techniquenav/computer");
          break; 
   case "ACCESORIES":
          res.redirect("http://localhost:3000/home/techniquenav/accesories");
          break; 
  case "EQUIPMENTS":
          res.redirect("http://localhost:3000/home/techniquenav/equipments"); 
          break; 
  case "PHOTO CAMERAS":
          res.redirect("http://localhost:3000/home/techniquenav/photocameras");
          break; 
  case "Household Appliances":
          res.redirect("http://localhost:3000/home/techniquenav/household");   
          break;                    
  default:
      res.redirect("http://localhost:3000/home");          
} 
})



router.get("/datashop/:id", async(req,res)=>{
    let product = await Model.findById(req.params.id)
    res.send(product)
    // res.redirect("http://localhost:3000/home/techniquenav/product/")
})

router.get("/datashop",async( req,res)=>{
    let persion = await Model.find({})
    res.send(persion)      
      
})

router.get('/datashop/v2/query',async(req,res)=>{
    console.log(req.query)
    const { page, limit } = req.query

    let sortedProducts = await Model.find({})
  
//     if (search) {
//         sortedProducts = sortedProducts.filter((product) => {
//           return product.name.startsWith(search)
//         })
//       }
      if (limit) {
        sortedProducts = sortedProducts.slice(page, Number(limit))
      }
      if (sortedProducts.length < 1) {
        // res.status(200).send('no products matched your search');
        return res.status(200).json({ sucess: true, data: [] })
      }
      res.status(200).json(sortedProducts)
})


module.exports = router