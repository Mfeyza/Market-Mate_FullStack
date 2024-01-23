import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import EditIcon from "@mui/icons-material/Edit"
import { editbtnStyle,deletebtnStyle } from "../styles/globalStyles"
import useStockCalls from "../service/useStockCalls"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useState,useEffect } from "react"

export default function BrandsCard({ brand , handleOpen,setInfo}) {
  const {  image, name, _id } = brand || {}
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
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt={name}
        height="140"
        image={image}
        sx={{ objectFit: "contain" }}
      />


      <CardActions>
        <DeleteOutlineIcon
          sx={deletebtnStyle}
          onClick={() => deleteStock("brands", _id)}
        />
        <EditIcon sx={editbtnStyle} onClick={()=>{
          handleOpen()
          setInfo(brand)
        }}  />
          <StarBorderIcon 
      onClick={handleStarClick}
      style={{ color: starClicked ? 'rgb(231, 202, 9)' : '',cursor:"pointer" }}
        />
      </CardActions>
    </Card>
  )
}
