import React from 'react'
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import PaymentsIcon from "@mui/icons-material/Payments"
import { deepPurple,pink ,amber} from '@mui/material/colors'
import { Card, Metric, Text } from "@tremor/react";
import { useSelector } from 'react-redux'


const KPI = () => {
    const {sales,purchases}=useSelector((state)=> state.stock)

    const totalSales=sales?.reduce((acc,item)=>acc+item.amount,0)
    const totalPurchases=purchases?.reduce((acc,item)=>acc+item.amount,0)

    const kpiData = [
        {
          id: 1,
          title: "Sales",
          amount: `$${totalSales}`,
          icon: <MonetizationOnIcon sx={{ fontSize: "2rem", color: "#B2FFC8"}} />,
          bgColor: deepPurple[100],
          color: deepPurple[700],
        },
        {
          id: 2,
          title: "Cash",
          amount: `$${totalSales - totalPurchases}`,
          icon: <PaymentsIcon sx={{ fontSize: "2rem",color: "#6A2C70" }} />,
         
          bgColor: pink[100],
          color: pink[700],
        },
        {
          id: 3,
          title: "Purchases",
          amount: `$${totalPurchases}`,
          icon: <ShoppingCartIcon sx={{ fontSize: "2rem",color: "#F08A5D" }} />,
          bgColor: amber[100],
          color: amber[700],
        },
      ]
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop:"3rem" }}>
            {kpiData.map(({ id, title, amount, icon, bgColor, color }) => (
                <Card key={id} className="max-w-xs dark:bg-white" decoration="top" decorationColor="white" bgcolor={bgColor}>
                    <Text color={color}>{title}</Text>
                    <Metric color={color}>{amount}</Metric>
                    {icon}
                </Card>
            ))}
        </div>
    );
}

export default KPI