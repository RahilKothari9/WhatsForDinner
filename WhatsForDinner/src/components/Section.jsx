import React, {useState, useEffect} from 'react'
import { Button, Alert, Grid } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../config/firebase';

export default function Section({sectionId, setSectionId}) {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const history = useNavigate()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history('/login')
    } catch {
      setError("Failed to log out")
    } 
  }

  const [linkArr, setLinkArr] = useState([]);

  useEffect(() => {

    const getLinks = async() => 
    {
        const q = query(collection(db, "Dishes"), where("category_id", "==", sectionId));
        const docSnap = await getDocs(q);

        const arr = [];
        docSnap.forEach((doc) => {
            arr.push({...doc.data(), id:doc.id});
          });


        setLinkArr(arr);
    };

    getLinks();
  }, []);

  

  return (
    
    <div>
        <h1>Hi</h1>
      <Link to="/addadish">Add A Dish!</Link>
    
    <div>
    <Grid container direction="column" spacing={2} justifyContent="center">
          {linkArr.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={10}>
              <Button
                variant="contained"
                color="primary"
                className="hellobutton"
                onClick={() => {
                  console.log(item.id);
                //   navigate(`section/${item.id}`)
                }
              }
                
                // onMouseOver={}
              >
                {item.name}
              </Button>
            </Grid>
          ))}
        </Grid>
    </div>
    
    </div>
  )
}
