import { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Modal from "@mui/material/Modal"
import { modalStyle } from "../styles/globalStyles"
import useStockCalls from "../service/useStockCalls"

export default function FirmModal({ open, handleClose,info,setInfo }) {
 const {postStock,putStock}=useStockCalls()

  const handleChange = (e) => {

    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (info._id) {
      putStock("brands", info)
    } else {
      postStock("brands", info)
    }
    handleClose()
  }


  console.log(info)
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Firm Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              value={info.name}
              onChange={handleChange}
              required
            />
           
            <TextField
              label="Image"
              name="image"
              id="image"
              type="url"
              variant="outlined"
              value={info.image}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" size="large">
           {info._id? "Update Firm" : "Add Firm"}   Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
