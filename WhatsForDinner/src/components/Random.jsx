import React, {useState, useEffect} from 'react'
import { Button, Alert, Grid } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../config/firebase'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import '../App.css'

export default function Random() {

  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [linkArr, setLinkArr] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [rand, setRand] = useState(0);

  useEffect(() => {

    const getLinks = async() => 
    {
        const q = query(collection(db, "Dishes"), where("user_id", "==", currentUser.uid));
        const docSnap = await getDocs(q);

        const arr = [];
        docSnap.forEach((doc) => {
            arr.push({...doc.data(), id:doc.id});
          });
        const ran = arr.sort(() => Math.random() - 0.5);
        console.log("rahil kothari");
        setName(ran[0].name)
        setDesc(ran[0].description)

        setLinkArr(ran);
    };

    getLinks();
  }, [rand]);

  return (
    <div>
    <h2 className='randomtext'>Your Random Dish Is......</h2>
    <div className='centerer'>
        <div className='foodwrapper'>
            
          
              
              <Card sx={{ minWidth: 300 }} className='foodcarder'>
                <CardContent>
                
                  <h2>{name}</h2>
                    
                  <h3>{desc}</h3>
                  
                </CardContent>
              </Card>
        </div>
    </div>
        <Button  onClick={()=>{setRand(rand + 1)}} className='submitButton font'>  Randomize</Button>
    </div>
  )
}
