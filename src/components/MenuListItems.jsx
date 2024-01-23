import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import InventoryIcon from "@mui/icons-material/Inventory"
import StoreIcon from "@mui/icons-material/Store"
import StarsIcon from "@mui/icons-material/Stars"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useNavigate } from "react-router-dom"



const icons = [
  {
    icon: <SpaceDashboardIcon />,
    title: "Dashboard",
    url: "/stock/",
    color: "#6A2C70"
  },
  {
    title: "Purchases",
    icon: <ShoppingCartIcon />,
    url: "/stock/purchases/",
    color: "#B83B5E"
  },
  {
    title: "Sales",
    icon: <AttachMoneyIcon />,
    url: "/stock/sales/",
    color: "#B2FFC8"
  },
  {
    title: "Firms",
    icon: <StoreIcon />,
    url: "/stock/firms/",
    color: "#F9ED69"
  },
  {
    title: "Brands",
    icon: <StarsIcon />,
    url: "/stock/brands/",
    color: "#F08A5D"
  },
]

const styleWithIcon = {
    color: "white", 
    "& .MuiSvgIcon-root":{color:"white"},
    "&:hover":{color:" rgba(80,131,73,1) "},
    "&:hover .MuiSvgIcon-root" :{color:" rgba(80,131,73,1) "}
  }
  
  const playSound = () => {
    const audio = new Audio('/short-woosh-109592.mp3');
    audio.play();
  };
const MenuListItems = () => {
  const navigate = useNavigate()
  return (
    <List>
      {icons.map((item, index) => (
        <ListItem key={index} disablePadding onClick={() => navigate(item.url)}>
          <ListItemButton sx={{ 
              ...styleWithIcon, 
             
              "& .MuiSvgIcon-root": { color: item.color },
              "&:hover": { color: "rgba(80,131,73,1)" },
              "&:hover .MuiSvgIcon-root": { color: "rgba(80,131,73,1)" }
            }} onMouseEnter={playSound} >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default MenuListItems
