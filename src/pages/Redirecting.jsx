import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const Redirecting = () => {
const navigate=useNavigate()

useEffect(() => {
  const loginTimer = setTimeout(() => {
    navigate("/stock");
  }, 5000);

}, [navigate]);


  return (
    <div className='stockAppContainer' >
     <Typography className='stockApp'>
     Loading Market Mate...
      
     </Typography>
     <span class="loader"></span>

     
    </div>
  );
};

export default Redirecting;