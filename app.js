import mongoose from "mongoose";
import express from "express";
import multer, { diskStorage } from "multer";
import path from 'path';
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fileStorageEngine = diskStorage({
    destination: (req, file ,cb)=>{
        cb(null, './images')
    },
    filename: (req,file,cb)=>{
      cb(null, Date.now() + "--" + file.originalname);
    },
})
const upload = multer({ storage:fileStorageEngine })

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
})
app.post('/single',upload.single('image'),(req,res)=>{
    console.log(req.file);
    res.send('Single File upload success!');
})

app.post('/multiple', upload.array('images', 3),( req,res )=>{  
    console.log(req.files);
    res.send('Multiple File upload success!')
})
app.listen(7000,(req,res)=>{
 console.log('-Listening to Port 7000');
})
