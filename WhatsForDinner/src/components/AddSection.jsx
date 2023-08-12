import React, {useState, useRef} from 'react';
import { TextField, Button, Container, Stack, Alert } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext';
import { AuthProvider } from '../contexts/AuthContext';
import { getFirestore, collection, setDoc, addDoc} from "firebase/firestore";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "../config/firebase"

 
const AddSection = () => {

    const sectionNameRef = useRef()
    const { currentUser } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const dbRef = collection(db, "Category")
    const history = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            name: sectionNameRef.current.value,
            user_id: currentUser.uid,
         };
         addDoc(dbRef, data)
         .then(docRef => {
             console.log("Document has been added successfully");
         })
         .catch(error => {
             console.log(error);
         })
        setLoading(false);
        history('/')
    }
 
    return (
        <AuthProvider>
            <React.Fragment >
            <div className='formWrapper'>
            <h2>Add A Category!</h2>
            
            <form onSubmit={handleSubmit}>
                
                <TextField
                    type="sectionName"
                    variant='outlined'
                    color='secondary'
                    label="Name"
                    
                    inputRef={sectionNameRef}
                    
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                
                
                <Button disabled= {loading} variant="outlined" color="secondary" type="submit" className='submitButton font'>Add Category</Button>
            </form>
            </div>
     
        </React.Fragment>
        </AuthProvider>
        
    )
}
 
export default AddSection;