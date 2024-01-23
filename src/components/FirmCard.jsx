import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import EditIcon from "@mui/icons-material/Edit"
import {  deletebtnStyle,editbtnStyle } from "../styles/globalStyles"
import useStockCalls from "../service/useStockCalls"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useState,useEffect } from "react"

export default function FirmCard({ firm , handleOpen,setInfo}) {
  const { address, image, name, phone, _id } = firm
  const { deleteStock } = useStockCalls()
  const [starClicked, setStarClicked] = useState(false);
 
  useEffect(() => {
    const savedStarClicked = sessionStorage.getItem('starClicked_' + _id) === 'true';
    setStarClicked(savedStarClicked);
  }, [_id]);

  const handleStarClick = () => {
    const newStarClicked = !starClicked;
    setStarClicked(newStarClicked);
    sessionStorage.setItem('starClicked_' + _id, newStarClicked); 
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "300px",
        height: "400px",
        p: 2,
        border:"solid",
        borderRadius:"1rem",
        marginTop:"3rem"
      }}
      className="cardColor"
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <CardMedia
        component="img"
        alt={name}
        image={image}
        sx={{ 
         
          height: '140px', 
          maxHeight: '140px', 
          objectFit: 'contain', 
        }}
      />
      
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
      </CardContent>
     

      <Typography variant="body2" color="text.secondary">
        {phone}
      </Typography>

      <CardActions>
        <DeleteOutlineIcon
          sx={deletebtnStyle}
          onClick={() => deleteStock("firms", _id)}
        />
        <EditIcon sx={editbtnStyle} onClick={()=>{
          handleOpen()
          setInfo(firm)
        }}  />
       <StarBorderIcon 
         onClick={handleStarClick}
         style={{ color: starClicked ? 'rgb(231, 202, 9)' : '', cursor:"pointer"}}
        />
      </CardActions>
    </Card>
  )
}

