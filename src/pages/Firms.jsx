import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import useStockCalls from "../service/useStockCalls"
import { useSelector } from "react-redux"
import { Grid } from "@mui/material"
import FirmCard from "../components/FirmCard"
import FirmModal from "../components/FirmModal"
import Skeleton from '@mui/material/Skeleton';
import SearchIcon from '@mui/icons-material/Search';



const Firms = () => {
  const { getStocks,searchStock } = useStockCalls()
  const { firms, error, loading } = useSelector((state) => state.stock)
  const [value, setValue] = useState("");

  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setInfo({ name: "", phone: "", address: "", image: "" })
  }

  useEffect(() => {
  
    getStocks("firms")
   
  }, [])

  useEffect(()=>{
    searchStock("firms", value);
  },[value])

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
        New Firm
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
     
      <FirmModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />

      <Grid container gap={2} mt={3} justifyContent={"center"}>
        {firms.map((firm) => (
          <Grid item key={firm._id}>
            <FirmCard firm={firm} handleOpen={handleOpen} setInfo={setInfo} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};


export default Firms
