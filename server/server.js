import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const port = process.env.PORT || 5100;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(port, () => console.log(`server's running on ${port}`));