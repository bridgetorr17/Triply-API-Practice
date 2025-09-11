import express from 'express';
const app = express();

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({path: '/../.env', override: true, quiet: true})

app.use(cors({
  origin: 'http://localhost:5173',   // allow your front-end origin
  credentials: true                // so cookies / credentials: 'include' works
}));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/', (req, res) => {
    console.log('we made it to the backend')

    res.json({ message: 'hello from backend' });
});
        

app.listen(8000, () => {
    console.log('server running on port 8000');
})

export default app;