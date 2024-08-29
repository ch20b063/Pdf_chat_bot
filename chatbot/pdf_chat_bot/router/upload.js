import express from "express";
import multer from "multer";
import PdfUpload from "../model/pdf_upload.js";
import pdfParse from 'pdf-parse';
import fs from 'fs';

const extractTextFromPDF = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    try {
      const data = await pdfParse(dataBuffer);
      return data.text;
    } catch (error) {
      console.error('Error parsing PDF:', error);
      throw new Error('Error parsing PDF');
    }
  };

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
const upload = multer(
  {
    storage: storage,
  }
);

router.post('/upload', upload.single('file'),async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    
    data = await extractTextFromPDF(`./uploads/${req.file.originalname}`);
    const newFile = new PdfUpload({ pdf: req.file.originalname,
        projectName:req.body.ProjectName,
        date:Date.now(),
        extractedText:"fghfhf"
    });

    newFile.save()
      .then(() => res.send('File uploaded and saved to MongoDB.'))
      .catch(err => res.status(500).send('Error saving file to MongoDB.', err.message));
  });

router.get('/manish', (req, res) => {
    res.send('Hello World!,This is manish ');
});

export default router;