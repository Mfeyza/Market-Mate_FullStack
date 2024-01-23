import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import Modal from "@mui/material/Modal"
import { modalStyle } from "../styles/globalStyles"
import useStockCalls from "../service/useStockCalls"
import { useSelector } from "react-redux"

export default function ProductModal({ open, handleClose, info, setInfo }) {
  const { postStock } = useStockCalls()
  const { categories, brands } = useSelector((state) => state.stock);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postStock("products", { ...info, categoryId: info.categoryId, brandId: info.brandId });
    handleClose();
  }

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
            <FormControl fullWidth>
              <InputLabel id="categories-select-label">Categories</InputLabel>
              <Select
                labelId="categories-select-label"
                id="categoryId"
                name="categoryId"
                value={info.categoryId || ''}
                label="Categories"
                onChange={handleChange}
              >
                {categories.map((categories, index) => (
                  <MenuItem key={index}  value={categories._id}>
                    {categories.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="brands-select-label">Brands</InputLabel>
              <Select
                labelId="brands-select-label"
                id="brandId"
                name="brandId"
                value={info.brandId || ''}
                label="Brands"
                onChange={handleChange}
              >
                {brands.map((brands, index) => (
                  <MenuItem key={index}  value={brands._id}>
                    {brands.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <Button type="submit" variant="contained" size="large">
            ADD PRODUCT
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}


