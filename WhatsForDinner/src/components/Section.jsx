import React, {useState, useEffect} from 'react'
import { Button, Alert, Grid } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../config/firebase'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../App.css'

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
        // arr = arr.sort(() => Math.random() - 0.5);
        


        setLinkArr(arr);
    };

    getLinks();
  }, []);

  

  return (
    
    <div>
      <Link to="/addadish">Add A Dish!</Link>
    
    <div className='centerer'>
    <div className='foodwrapper'>
          {linkArr.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={10}>
              {/* <Button
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
              </Button> */}
              <Card sx={{ minWidth: 275 }} className='foodcard'>
                <CardContent>
                
                  <h2>{item.name}</h2>
                    
                  <h3>{item.description}</h3>
                  
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            
          ))}
        </div>
    </div>
    
    </div>
  )
}
