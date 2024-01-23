import React from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import useStockCalls from '../service/useStockCalls';



  
export default function ProductTable() {
  const { products } = useSelector((state) => state.stock);
  const dispatch = useDispatch()
const {deleteStock}=useStockCalls()

  function getRowId(row) {
    return row._id;
  }
  

     const columns = [
        {
          field: '_id',
          headerName: '#',
          flex: 1.4,
          headerAlign: 'center',
          align: 'center',
          sortable: false,
          valueGetter: (params) => params?.value.slice(-1),
        },
        {
          field: 'categoryId',
          headerName: 'Category',
          flex: 1,
          headerAlign: 'center',
          align: 'center',
          valueGetter: (params) => params?.row.categoryId.name, //parametre alır row a erişim var rowa apiden gelen bilgileri alıyoruz
        },
        {
          field: 'brandId',
          headerName: 'Brand',
          flex: 1.2,
          headerAlign: 'center',
          align: 'center',
          valueGetter: (params) => params?.row.brandId?.name,
        },
        {
          field: 'name',
          headerName: 'Name',
          flex: 1.5,
          headerAlign: 'center',
          align: 'center', 
        },
        {
          field: 'quantity',
          headerName: 'Stock',
          type: 'number',
          flex: 1.5,
          headerAlign: 'center',
          align: 'center', 
        },
        {
          field: 'actions',
          headerName: 'Actions',
          flex: 1.5,
          headerAlign: 'center',
          align: 'center', 
          sortable: false,
          valueGetter: (params) =>
            `${params?.row.firstName || ""} ${params?.row.lastName || ""}`,
            renderCell: (params) => (
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteStock("products",params?.row._id)}
                >
                  <DeleteForeverIcon />
                </IconButton>)
        },
        // {
        //   field: 'actions',
        //   type: 'actions',
        //   getActions: (params: GridRowParams) => [
        //     <GridActionsCellItem icon={<DeleteForeverIcon />}  label="Delete" />,
        //    
        //   ]
        // }
      ];
      
  return (
    <Box sx={{ width: '100%', height: 600 }}>
      <DataGrid
        rows={products}
        columns={columns}
        loading={!products}
        getRowId={getRowId}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        components={{
          Toolbar: GridToolbar,
        }}
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
  );
}