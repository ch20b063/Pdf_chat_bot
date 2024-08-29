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

export default extractTextFromPDF;