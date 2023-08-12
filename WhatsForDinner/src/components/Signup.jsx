import React, {useState, useRef} from 'react';
import { TextField, Button, Container, Stack, Alert, Card } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext';
import { AuthProvider } from '../contexts/AuthContext';
import '../App.css'

import {createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../config/firebase"

 
const Signup = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }
        if(passwordRef.current.value.length < 6) {
            return setError('Passwords must be 6 or more characters');
        }
        
        try {
            setError('');
            setLoading(true);
            await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
            history('/')
          } catch (err) {
            
            setError('Failed to Register')
            
          }
        // try {
        //     setError(' ');
        //     setLoading(true);
            
        //     await signup(emailRef.current.value, passwordRef.current.value);
        // } catch {
        //     setError('Failed to create an account');
        // }
        setLoading(false);
    }
 
    return (
        <AuthProvider>
            <React.Fragment >
                <Card className='formWrapper'>
            <h2>Sign Up </h2>
            {/* {JSON.stringify({currentUser})} */}
            {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}
            <form onSubmit={handleSubmit} action={<Link to="/login" />} className='font'>
             
                <TextField
                    type="email"
                    
                    color='secondary'
                    label="Email"
                    className='font'
                    inputRef={emailRef}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
            
                <TextField
                    type="password"
                    variant='outlined'
                    color='secondary'
                    label="Password"
                    className='font'
                    inputRef={passwordRef}
                    
                    required
                    fullWidth
                    sx={{mb: 4}}
                />

                <TextField
                    type="password"
                    variant='outlined'
                    color='secondary'
                    label="Password Confirmation"
                    inputRef={passwordConfirmRef}
                    
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
                
                <Button disabled= {loading} variant="outlined" className='font submitButton' type="submit">Register</Button>
            </form>
            <div>Already have an account? <Link to="/login">Login Here</Link></div>
            </Card>
        </React.Fragment>
        </AuthProvider>
        
    )
}
 
export default Signup;