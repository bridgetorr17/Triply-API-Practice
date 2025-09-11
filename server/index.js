import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config({path: '/../.env', override: true, quiet: true})

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(8000, () => {
    console.log('server running on port 8000');
})

export default app;