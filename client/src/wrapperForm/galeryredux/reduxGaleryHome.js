import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from "react-redux";
import {imageRequest} from "../redux/galery/action";
import './redux.css';
import  Card from "./card";
import axios from "axios";



 function Galleryredux(){
    const img=useSelector(state=>state.img);
    // const page=useSelector(state=>state.img.page);
    const loader=useSelector(state=>state.img.loader);
    const [info , setInfo] = useState([])
    const [page, setPage] = useState(12)
    const dispatch=useDispatch();
    const [ data , setData] = useState({hits: []});

    
  

    useEffect(()=>{
         axios.get(`http://localhost:9000/datashop/v2/query?page=0&limit=${page}`)  
         .then(res=>setInfo(res.data))
    },[])

  

    

    useEffect(()=>{
       window.onscroll=()=>{
            let scroller = Math.ceil(window.innerHeight+window.document.documentElement.scrollTop)
            if (scroller===document.body.scrollHeight) {
                setPage(page + 12)
                    // dispatch(imageRequest(page))     
              }
        }
        if(page===20){
            return window.onscroll=()=>{
                return false;
            }
        }
    },[page])

    return(
      <div className="GaleryWrapper">
   <span>
        <h2>image Gallery</h2>
        <p >just pull down to see more pictures</p>
  </span>
       
      <div className="gallery" >
      {
           info.map((imgData,i)=>{
               return(
            <Card key={i}  name={imgData.name}  src1={{backgroundImage:`url(${imgData.src})`}}  />
            
               )
           })
       }        
       
      </div>
      <div style={{display:loader ? "none":"block"}} class="lds-dual-ring"></div>   
         </div>
     )
 }

 export default Galleryredux;