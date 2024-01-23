import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import useStockCalls from "../service/useStockCalls"
import { useSelector } from "react-redux"
import { Grid } from "@mui/material"
import BrandsCard from "../components/BrandsCard"
import BrandsModal from "../components/BrandsModal"
import Skeleton from '@mui/material/Skeleton';

const Firms = () => {
  
  const { getStocks ,searchStock} = useStockCalls()
  const { brands,loading } = useSelector((state) => state.stock)
  const [value,setValue]=useState("")

  const [info, setInfo] = useState({
    name: "",
    image: "",
  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setInfo({ name: "", image: "" })
  }

  useEffect(() => {
    
    getStocks("brands")
  }, [])

useEffect(()=>{
  searchStock("brands",value)
},[value])
  console.log(brands)

  if (loading) {
    return (
      <Grid container gap={2} mt={3} justifyContent={"center"}>
        {[...new Array(6)].map((_, index) => ( 
          <Grid item key={index}>
            <Skeleton  animation="wave" width={300} height={400} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
   <div>
      <div className="searchdiv">
     <Button variant="contained" onClick={handleOpen}>
        New Brand
      </Button>
      <div className="searchbox">
        
        <input
          className="searchinput"
          placeholder="  Search..."
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />
      </div>

     </div>

      <BrandsModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />

      <Grid container gap={2} mt={3} justifyContent={"center"}>
        {brands?.map((brand) => (
          <Grid item key={brand?._id}>
            <BrandsCard brand={brand} handleOpen={handleOpen} setInfo={setInfo} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Firms
