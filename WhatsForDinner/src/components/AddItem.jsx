import React, {useState, useRef} from 'react';
import { TextField, Button, Container, Stack, Alert } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext';
import { AuthProvider } from '../contexts/AuthContext';
import { getFirestore, collection, setDoc, addDoc} from "firebase/firestore";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "../config/firebase"

 
const AddItem = ({sectionId, setSectionId}) => {

    const dishNameRef = useRef()
    const dishDescRef = useRef()
    const { currentUser } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const dbRef = collection(db, "Dishes")
    const history = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            name: dishNameRef.current.value,
            category_id: sectionId,
            description: dishDescRef.current.value
         };
         addDoc(dbRef, data)
         .then(docRef => {
             console.log("Document has been added successfully");
         })
         .catch(error => {
             console.log(error);
         })
        setLoading(false);
        history('/section')
    }
 
    return (
        <AuthProvider>
            <React.Fragment>
            <h2>Add An Item!</h2>
            
            <form onSubmit={handleSubmit}>
                
                <TextField
                    type="dishName"
                    variant='outlined'
                    color='secondary'
                    label="Name"
                    
                    inputRef={dishNameRef}
                    
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <TextField
                    type="dishDesc"
                    variant='outlined'
                    color='secondary'
                    label="Descriprtion/Recipe"
                    
                    inputRef={dishDescRef}
                    
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                
                
                <Button disabled= {loading} variant="outlined" color="secondary" type="submit">Add Item</Button>
            </form>
     
        </React.Fragment>
        </AuthProvider>
        
    )
}
 
export default AddItem;