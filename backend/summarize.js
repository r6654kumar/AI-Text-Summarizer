import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
async function summarizeText(text) {
    let data = JSON.stringify({
        "inputs": text,
        "parameters": {
            "max_length": 1000,
            "min_length": 30
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env['ACCESS_TOKEN']
        },
        data: data
    };

    try {
        const summarizedText = await axios.request(config);
        return summarizedText.data[0].summary_text;
    }
    catch (error) {
        console.log(error);
    }
}
export default summarizeText;