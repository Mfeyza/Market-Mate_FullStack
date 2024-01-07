import React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"

import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useDispatch, useSelector } from "react-redux"
import { logoutSuccess } from "../features/authSlice"
import { useNavigate } from "react-router-dom"
import useAuthCalls from "../service/useAuthCalls"

function Dashboard() {
  const navigate=useNavigate()
  const {logout}=useAuthCalls()
  const dispatch=useDispatch()
  const user = useSelector((state)=> state.auth) //globalden okuyacaksın user ı selector kullanmak zorundasın
  const handleLogout = () => {
    logout()
    navigate("/")
    
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            STOCK APP
          </Typography>
          {user && <Button color="inherit" onClick={handleLogout} >Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Dashboard
