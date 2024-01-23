import React from 'react'
import KPI from '../components/KPI'
import Charts from '../components/Charts'
import { useEffect } from "react"
import useStockCalls from "../service/useStockCalls"


const Home = () => {
  const { getStocks } = useStockCalls()

  useEffect(() => {
    getStocks("sales")
    getStocks("purchases")
   
  }, [])

  return (
    <div >
      <KPI/>
      <Charts/>
    </div>
  )
}

export default Home