import express, { request, response } from "express";
import summarizeText from './summarize.js';
import { fileURLToPath } from 'url';
import { dirname,join } from 'path';
import dotenv from 'dotenv';
import { log } from "console";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT=process.env.PORT;
const app=express();
app.use(express.json());
app.use(express.static(join(__dirname, '..', 'frontend')));
// app.get('/', (request, response) => {
//     console.log(request);
//     return response.status(234).send('Welcome to my server for AI TEXT SUMMARIZER APP');
// });
//Handling POST request to the '/summarize' endpoint
app.post('/sum', async(request,response)=>{
    const text=request.body.text_to_summarize;
    summarizeText(text).then(summarizedText=>{
        // console.log('Summarized text:', summarizedText);
        response.send(summarizedText);

    }).catch(error=>{
        console.log(`Error ${error}`);
    })
})
app.listen(PORT,()=>{
    console.log(`App is listening to port ${PORT}`);
})