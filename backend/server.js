import app from './src/app.js'
import dotenv from 'dotenv';
import connectDB from './src/db/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT , async ()=>{
    await connectDB();
    console.log(`server is running on : http://localhost:${PORT}/`)
})