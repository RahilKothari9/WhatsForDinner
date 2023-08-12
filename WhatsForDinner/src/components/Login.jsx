import React, {useState, useRef} from 'react';
import { TextField, Button, Container, Stack, Alert, Card } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext';
import { AuthProvider } from '../contexts/AuthContext';
import { signIn } from '../config/firebase';
import {signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../config/firebase"
import '../App.css'
 
const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login, currentUser } = useAuth()
    const history = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        
       
        try {
            setError('');
            setLoading(true);
            await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            history('/')
            } catch (err) {
                setError('Failed to Login')
                //alert(err.message);
            }
            setLoading(false);
    }
 
    return (
        <AuthProvider>
            <React.Fragment>
                <Card className='formWrapper'>
            <h2>Login </h2>
            {currentUser && currentUser.email}
            {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}
            <form onSubmit={handleSubmit} action={<Link to="/login" />} className='font'>
                
                <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    label="Email"
                    className='textfield'
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
                    className='textfield'
                    inputRef={passwordRef}
                    
                    required
                    fullWidth
                    sx={{mb: 4}}
                />

                
                
                <Button disabled= {loading} variant="outlined" color="secondary" type="submit" className='font submitButton'>Log In</Button>
            </form>
            <div>Need an account? <Link to="/register">Register Here</Link></div>
            </Card>
        </React.Fragment>
        </AuthProvider>
        
    )
}
 
export default Login;
