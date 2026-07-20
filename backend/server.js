import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import temp from './src/servcies/temp.js';
import generateInterviewReport from "./src/servcies/ai.services.js";

const { resume, selfDescription, jobDescription } = temp;


connectDB();
generateInterviewReport({ resume, selfDescription, jobDescription });

app.listen(3000, () => {
    console.log('Server running on 3000');
})

