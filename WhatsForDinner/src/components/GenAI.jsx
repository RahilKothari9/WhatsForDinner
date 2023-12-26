import React, { useEffect, useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TextField, Button, Container, Stack, Alert, Card } from '@mui/material';



const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});




function GenAI() {
    const [text1, setText1] = useState('')
    const promptRef = useRef()
    
    async function run(pro) {
        setText1('Loading....')
      
        const prompt = pro;
      
        const result = await model.generateContent(prompt);
        
        const response = await result.response;
    
        const text = response.text();
        //const format1 = text.replace(/(?:\r\n|\r|\n)/g, '<br>')
        setText1(text);
      }
    // useEffect(()=>{
    //     run()
    // }, []);
    
    async function handleSubmit()
    {
      run(promptRef.current.value)
    }
    
    //console.log(text1)
  return (
    <>
    <div>
                <TextField
                    type="text"
                    
                    label="Prompt"
                    //className='font'
                    inputRef={promptRef}
                    fullWidth
                    required
                    
            InputLabelProps={{
              style: { color: "white", fontFamily: "Barlow Semi Condensed" },
            }}
            sx={{
              ".css-x2l1vy-MuiInputBase-root-MuiOutlinedInput-root": {
                color: "white",
              },
              mb: 2,
            }}
            InputProps={{
              sx: {
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  border: "2px solid white",
                },
                "&:hover": {
                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    border: "2px solid white",
                  },
                },
                fontFamily: "Barlow Semi Condensed"
              },
            }}
            size="medium"
                />
              <Button variant="outlined" className='font submitButton' onClick={handleSubmit}>Generate</Button>
      </div>
    <div className='GenAiText'><ReactMarkdown>{text1}</ReactMarkdown></div>
    </>
  )
}

export default GenAI