import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { GoogleGenerativeAI } from "@google/generative-ai";



const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});




function GenAI() {
    const [text1, setText1] = useState('Loading....')
    async function run(pro) {
        
      
        const prompt = "How to win at Scribbl.io the game";
      
        const result = await model.generateContent(prompt);
        
        const response = await result.response;
    
        const text = response.text();
        //const format1 = text.replace(/(?:\r\n|\r|\n)/g, '<br>')
        setText1(text);
      }
    useEffect(()=>{
        run()
    }, []);
    
    //console.log(text1)
  return (
    <h4><ReactMarkdown>{text1}</ReactMarkdown></h4>
  )
}

export default GenAI