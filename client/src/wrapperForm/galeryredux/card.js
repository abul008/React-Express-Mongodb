import React, { useEffect, useState } from "react";
import {getImagesService} from "../redux/galery/service";


function Card(props) {
    const [rotet , setRotet] = useState("");
    const [ data , setData] = useState([]);

    useEffect(async()=>{
      await getImagesService("https://picsum.photos/id/117/1544/1024")
               .then(response => setData(response) )
              
    },[])

    

    
    return(
          <div className="card" >
            <div style={{transform:`rotateY(${rotet})`}}  className="cardName">
            <div className="cardImg" onClick={()=>{setRotet("180deg")}} onBlur={()=>{console.log("green")}} style={props.src1}>  
            
              <div className="cardButtonImg">
               {/* <img src={props.src}/> */}
              </div>
            </div>
            <div className="cardButton" onClick={()=>{setRotet("0deg")}} >
              <h2>{props.name}</h2>
              </div>
          </div>
        </div>
    )
}


export default Card;