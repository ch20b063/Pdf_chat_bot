import PdfUpload from "../model/pdf_upload.js";
import express from "express"

const router = express.Router();


router.get("/send-data",async(req,res) => 
    {
        try {
            PdfUpload.find({}).then((data)=>{
                res.send({data:data})
            })
        } catch (error) {
            
        }
    }
)

export default router;