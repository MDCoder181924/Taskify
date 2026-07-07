import './loadEnv.js';
import app from './src/app.js'
import connectDB from './src/db/db.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT , async ()=>{
    await connectDB();
    console.log(`server is running on : http://localhost:${PORT}/`)
})