import React from 'react'
import { Card, Title } from "@tremor/react";
import { useSelector } from 'react-redux';
import { AreaChart, BarChart,  Flex, Switch ,Subtitle} from "@tremor/react";

const chartdata = [
    {
      date: "Jan 22",
      price: "",
    },
  ]
  const valueFormatter = function (number) {
    return "$ " + new Intl.NumberFormat("us").format(number).toString()
  }
const Charts = () => {
    const {sales,purchases}=useSelector((state)=>state.stock)
    const salesData=sales?.map((item)=>({
        date:new Date(item.createdAt).toLocaleDateString("tr-TR"),
        quantity: item.quantity,
    price: item.price
    }))
    const purchasesData=purchases?.map((item)=>({
        date: new Date(item.createdAt).toLocaleDateString("tr-TR"),
        amount: item.amount,
        price:item.price
    }))
    const barChartData = purchases?.map(purchase => ({
      name: new Date(purchase.createdAt).toLocaleDateString("tr-TR"),
      "Number of threatened species": purchase.amount 
    }));

  return (
   <div > 
   <div style={{
  
  display: 'flex', 
  justifyContent: 'center', 
  gap:"3rem",
  marginTop:"5rem"
  
}} >
    <Card style={{
      maxWidth:"50%",
      maxHeight:"60vh"
    }} >
    <Title >Total Sales (USD)</Title>
    <AreaChart
      className="h-72 mt-4"
      data={salesData}
      index="date"
      yAxisWidth={65}
      categories={['quantity', 'price']}
      colors={['green', 'orange']}
      valueFormatter={valueFormatter}
    />
  </Card>
  <Card  
    style={{
    
    maxWidth:"50%",
    
    
   }}>
  <Title>Total Purchases</Title>
  <AreaChart
 
    className="h-72 mt-4"
    data={purchasesData}
    index="date"
    yAxisWidth={65}
    categories={['price']}
    colors={["indigo", "cyan"]}
    valueFormatter={valueFormatter}
    tooltip={{
      backgroundColor: 'dark-blue',
      borderColor: 'green',
      color: 'white',
      
    }}
    
  />
</Card>
</div>
</div>
  )
}




export default Charts