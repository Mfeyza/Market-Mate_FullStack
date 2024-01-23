import { useSelector } from "react-redux"
import useStockCalls from "../service/useStockCalls"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { editbtnStyle } from "../styles/globalStyles"
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid"
import Box from "@mui/material/Box"

const PurchaseTable = ({ setInfo, handleOpen }) => {
  const { purchases } = useSelector((state) => state.stock)
  const { deleteStock } = useStockCalls()

  const getRowId = (row) => row._id

  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return new Date(row.createdAt).toLocaleString("de-DE")
      },
    },
    {
      field: "firmId",
      headerName: "Firm",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => row?.firmId?.name,
    },
    {
      field: "brandId",
      headerName: "Brand",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => row?.brandId?.name,
    },
    {
      field: "productID",
      headerName: "Product",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => row?.productId?.name,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 40,
      headerAlign: "center",
      align: "center",
      renderCell: ({
        row: { brandId, productId, quantity, price, firmId, _id },
      }) => {
        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              handleOpen()
              setInfo({ _id, brandId, productId, quantity, price, firmId })
            }}
            sx={editbtnStyle}
          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteStock("purchases", _id)}
            sx={editbtnStyle}
          />,
        ]
      },
    },
  ]
  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <DataGrid
      className="table"
        autoHeight
        rows={purchases}
        columns={columns}
        pageSizeOptions={[20, 50, 75, 100]} 
        disableRowSelectionOnClick
        getRowId={(row) => row._id}
        slots={{ toolbar: GridToolbar }}
        sx={{
          borderColor: 'black', 
          '& .MuiDataGrid-row': {
            color: 'black', 
            borderBottom: '1px solid black'
          },
          '& .MuiDataGrid-columnHeaders': {
            color: 'black',
          
            borderBottom: '1px solid black' 
          },
          '& .MuiDataGrid-cell': {
            color: 'black',
            borderColor: 'black' 
          }
        }}
      />
    </Box>
  )
}

export default PurchaseTable
