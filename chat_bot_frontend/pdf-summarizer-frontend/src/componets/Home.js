import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination
} from '@mui/material';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import 'pdfjs-dist/webpack';

// Import the pdf worker from pdfjs-dist
import { GlobalWorkerOptions } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

// Set the worker src to the local version
GlobalWorkerOptions.workerSrc = pdfWorker;

const Home = () => {
  const [selectfile, setFile] = useState(null);
  const [selectProjectName, setProjectName] = useState("");
  const [selectpdf, setPdf] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectfile) {
      alert('Please select a file to upload');
      return;
    }
    if (!selectProjectName) {
      alert('Please write a ProjectName');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectfile);
    formData.append('ProjectName', selectProjectName);

    try {
      await axios.post('http://localhost:5500/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Upload done");
      setFile(null);
      setProjectName('');
      fileInputRef.current.value = '';
      fetchPdfs();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPdfs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5500/api/send-data');
      setPdf(response.data.data);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewPdf = (pdfUrl) => {
    setSelectedPdfUrl(pdfUrl);
  };

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div>
      <div>
        <h1>PDF Summarizer</h1>
        <input 
          type="file" 
          onChange={handleFileChange} 
          ref={fileInputRef} // Assign reference to file input
        />
        <input 
          type="text" 
          onChange={(e) => setProjectName(e.target.value)} 
          value={selectProjectName}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <Paper className="paper">
        <div className="search-container"></div>
        <TableContainer className="table-container">
          <Table stickyHeader aria-label="pdf table">
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Pdf Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4}>Loading...</TableCell>
                </TableRow>
              ) : selectpdf.length > 0 ? (
                selectpdf.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pdf) => (
                  <TableRow key={pdf._id}>
                    <TableCell>{pdf.projectName}</TableCell>
                    <TableCell>{pdf.pdf}</TableCell>
                    <TableCell>{new Date(parseInt(pdf.date)).toLocaleString()}</TableCell>
                    <TableCell>
                      <button onClick={() => navigate(`/chat/${pdf.pdf}/${pdf.projectName}`)}>
                        Talk to PDF
                      </button>
                      <button onClick={() => handleViewPdf(`http://localhost:5500/uploads/${pdf.pdf}`)}>
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={selectpdf.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {selectedPdfUrl && (
        <div>
          <h2>Viewing PDF</h2>
          <Worker workerUrl={pdfWorker}>
            <Viewer fileUrl={selectedPdfUrl} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        </div>
      )}
    </div>
  );
};

export default Home;
