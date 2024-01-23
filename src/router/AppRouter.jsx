

import Login from "../pages/Login"
import Register from "../pages/Register"
import PrivateRouter from "./PrivateRouter"
import Dashboard from "../pages/Dashboard"
import Home from "../pages/Home"
import Purchases from "../pages/Purchases"
import Sales from "../pages/Sales"
import Brands from "../pages/Brands"
import Firms from "../pages/Firms"
import Products from "../pages/Products"
import Redirecting from "../pages/Redirecting"
import { BrowserRouter as Router, Route,Routes,  } from "react-router-dom";


const AppRouter = () => {
  
  return (
    <Router>
      <Routes>
      
         
      <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
      
        <Route path="redirecting" element={<Redirecting />} />
        <Route path="stock" element={<PrivateRouter />}>
          <Route path="" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="sales" element={<Sales />} />
            <Route path="firms" element={<Firms />} />
            <Route path="brands" element={<Brands />} />
            <Route path="products" element={<Products />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter