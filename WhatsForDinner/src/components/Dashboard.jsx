import React, {useState, useEffect} from 'react'
import { Button, Alert, Grid } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../config/firebase';

const buttonSX = {
  "&:hover": {
    boxShadow: 10,
  },
};

export default function Dashboard({sectionId, setSectionId}) {
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

  const q = query(collection(db, "Category"), where("user_id", "==", currentUser.uid));
  const querySnapshot = getDocs(q);
  // console.log(querySnapshot);
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  // });
  const [linkArr, setLinkArr] = useState([]);

  useEffect(() => {

    const getLinks = async() => 
    {
        const q = query(collection(db, "Category"), where("user_id", "==", currentUser.uid));
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
    <>
    <Button variant="contained" onClick={handleLogout} className='logout'>  Logout</Button>
    <div>
    <div>
    <Button
                variant="contained"
                color="primary"
                className="adderbutton"
                onClick={() => {
                  console.log("HI");
                  navigate(`/addcategory`)
                }
              }
                
              >
                Add a Category!
      </Button>
    <Grid container direction="column" spacing={2} justifyContent="center">
          {linkArr.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={10}>
              <Button
                variant="contained"
                color="primary"
                className="hellobutton"
                onClick={() => {
                  setSectionId(item.id)
                  console.log(item.id);
                  
                  navigate(`section/` + item.id)
                }
                
              }
              sx ={buttonSX}
                // onMouseOver={}
              >
                {item.name}
              </Button>
            </Grid>
          ))}
        </Grid>
    </div>
    
    </div>
    </>
  )
}
