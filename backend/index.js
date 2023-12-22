import express, { request, response } from "express";
import summarizeText from './summarize.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT=process.env.PORT;
const app=express();
app.use(express.json());
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to my server for AI TEXT SUMMARIZER APP');
});
//Handling POST request to the '/summarize' endpoint
app.post('/summarize',(request,response)=>{
    const text=request.body.text_to_summarize;
    summarizeText(text).then(summarizedText=>{
        response.send(summarizedText);

    }).catch(error=>{
        console.log(`Error ${error}`);
    })
})
app.listen(PORT,()=>{
    console.log(`App is listening to port ${PORT}`);
})