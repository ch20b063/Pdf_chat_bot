import express from "express";
import cors from "cors";
import {config} from "dotenv";
import upload from "./router/upload.js";
import dbcollection from "./database/dbcollection.js";
import question from "./router/question.js";
import senddata from "./router/senddata.js"
config(
    {
        path: './config/config.env'
    }
);
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.get('/', (req, res) => {
    res.send('Hello World!');
    });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbcollection();
app.use('/api', upload,question,senddata);
app.use("/uploads", express.static("uploads"));
export default app;