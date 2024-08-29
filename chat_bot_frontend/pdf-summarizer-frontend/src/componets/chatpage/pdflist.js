import { Button } from '@mui/material';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const PDFList = ({ pdfs }) => {
  const navigate = useNavigate();
  const [isClickable, setIsClickable] = useState(false);

  const handleMouseOver = () => {
    setIsClickable(true);
  };

  const handleMouseOut = () => {
    setIsClickable(false);
  };


  const divStyle = {
    // width: '200px',
    // height: '100px',
    padding: '10px',
    margin:'10px',
    backgroundColor: 'lightblue',
    cursor: isClickable ? 'pointer' : 'default',
  };
  return (
    <div>
      <Button style={{cursor: isClickable ? 'pointer' : 'default',backgroundColor: 'yellow'}}
       onClick={() => navigate(`/`)}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >Home</Button >
      <h2>PDF List</h2>

      <ul  style={{ listStyleType: 'none', padding: 0 }}>
        {pdfs.map((pdf) => (
          <li key={pdf._id} onClick={() => window.open(`/chat/${pdf.pdf}/${pdf.projectName}`)}
          // open in new chat window
          // onClick={() => window.open(`/chat/${pdf.pdf}/${pdf.projectName}`)}
          style={divStyle}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          >{pdf.projectName}</li>
        ))}
      </ul>
    </div>
  );
};

export default PDFList;
