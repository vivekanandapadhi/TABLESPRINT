import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
// import Menu from '../assets/menu.png';
import Product from "../assets/product.svg"
import axios from 'axios';
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ProductHome() {
  const [usersub, setUsersub] = useState([]);  
  const [isDelete,setIsDelete]=useState(false)
  const [open, setOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  // console.log(usersub)
  const toastOptions={
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
}
const handleOpen = (id) => {
  setSelectedCategoryId(id);
  setOpen(true);
};

const handleClose = () => {
  setSelectedCategoryId(null);
  setOpen(false);
};
const token=localStorage.getItem("token")
    // let navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:5000/products/getproduct',{
          headers:{
            'Authorization':`Bearer ${token}`
        }
        })
            .then((res) => {
              // console.log(setUsersub(res.data));
                setIsDelete(false)
                 setUsersub(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [isDelete,token]);
   
    

    const deleteProduct = (id) => {
      // console.log(`Attempting to delete subcategory with ID: ${id}`);
  
      axios.delete(`http://localhost:5000/products/deleteproduct/${id}`,{
        headers:{
          'Authorization':`Bearer ${token}`
      }
      })
          .then(() => {
              // console.log('Category deleted successfully');
              setIsDelete(true)
              // navigate('/product');
              handleClose()
              toast.success("product deleted successfully",toastOptions)
          })
          .catch((err) => {
              console.error('Error deleting category:', err);
          });
  };
  
    
  return (
    <div className="p-4 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
      
        <h1 className="text-xl font-bold flex items-center mb-4 md:mb-0">
        <img src={Product} alt="Product Icon" className="px-2 w-10 h-8 mr-2 " />
        
          Product
        </h1>
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg p-2 w-full md:w-1/2 mb-4 md:mb-0"
        />
        <button className="bg-purple-800 text-primary-foreground px-4 py-2 rounded-lg text-white">
          <Link to="/product/addproduct">Add product</Link>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-card border-0">
          <thead className="bg-amber-200">
            <tr className="bg-muted text-muted-foreground">
              <th className="py-2 px-4 border-b">Id</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">SubCategory</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Status</th>
              
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {usersub.map((subcategory, index) => (
              <tr key={subcategory._id} className="hover:bg-muted/50 bg-gray-100">
                <td className="py-2 px-4 border-b text-center">{index + 110}</td>
                <td className="py-2 px-4 border-b text-center">{subcategory.categoryname}</td>
                <td className="py-2 px-4 border-b text-center">{subcategory.productname}</td>
                <td className="py-2 px-4 border-b text-center">{subcategory.subcategory}</td>
                <td className="py-2 px-4 border-b text-center flex justify-center items-center">
                  <img alt={subcategory.categoryname} src={`http://localhost:5000/images1/${subcategory.imageUrl}`} className="w-10 h-10" />

                </td>


                
                <td className={`py-2 px-4 border-b text-center ${subcategory.status?'text-green-500':'text-red-500'}`}>
                                    {/* {console.log(subcategory.status)} */}
                                    {subcategory.status === false ?  'Inactive':'Active'  }
                                </td>
                
                <td className="py-2 px-7 border-b text-center flex justify-center items-center">
                  <button className="text-destructive px-2">
                    <Link to={`/product/editproduct/${subcategory._id}`}>
                      <EditIcon className="text-blue-700" />
                    </Link>
                  </button>
                  <div>
                    <IconButton aria-label="delete" onClick={() => handleOpen(subcategory._id)}>
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: "center" }}>
                          Are you sure you want to delete?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ display: "flex", justifyContent: "space-around" }}>
                          <Button onClick={handleClose} variant="contained" sx={{ color: "black", background: "white" }}>
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => deleteProduct(selectedCategoryId)}
                          >
                            Confirm
                          </Button>
                        </Typography>
                      </Box>
                    </Modal>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default ProductHome;
