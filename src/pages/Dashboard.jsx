import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useState,useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import useAuthCalls from '../service/useAuthCalls';
import MenuListItems from '../components/MenuListItems';
import { Outlet } from 'react-router-dom';
import logoutImg from "../assets/logout icon.png"
import logo from "../assets/in-stock.png"
import Swal from 'sweetalert2'

const drawerWidth = 200;

function Dashboard(props) {
  const {user}=useSelector((state)=> state.auth)
  const {logout}=useAuthCalls()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
   
    return () => {
      clearInterval(timer);
    };
   
  }, []);
  useEffect(()=>{
    if(!sessionStorage.getItem('already')){
      Swal.fire({
        title: `Hoşgeldin ${user}`,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
      sessionStorage.setItem('already','true')
    }
    
 
  },[])

  const drawer = (
    <div>
      <Toolbar style={{
        display:"flex",
        justifyContent:"center"
              }}>
        <img src={logo} alt="" width={"50px"} height={"50px"}/>
      </Toolbar>
      <Divider />
     
      <Divider />
     <MenuListItems/> 
     
    </div>
  );

 
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }} className="backround">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        
      >
        
        <Toolbar>
        
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
             
            <MenuIcon />
            {/* <img src={logo} alt="" /> */}
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
           Market Mate
          </Typography>
          <Typography variant="h6" noWrap component="div" sx={{marginRight:"3rem"}}>
            {time.toLocaleTimeString()}
          </Typography>
          {user && (
           
            <img src={logoutImg} alt="" onClick={logout} style={{width:"50px", height:"50px",cursor:"pointer"}}/>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
    
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,
          backgroundColor:"secondary.main"},
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth ,backgroundColor:"#20201e" },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
       <Outlet/>
      </Box>
    </Box>
  );
}



export default Dashboard;
