import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import logo0 from '../assets/category.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

function Categoryhome() {
    const [userCategory, setUserCategory] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);


    const handleOpen = (id) => {
        setSelectedCategoryId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedCategoryId(null);
        setOpen(false);
    };

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };
    
    const token=localStorage.getItem("token")
    useEffect(() => {
        
        // console.log(token)
        axios.get('http://localhost:5000/categorys/addcategorys',{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
            .then((res) => {
                setUserCategory(res.data);
                setIsDelete(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [isDelete,token]);

  

    const deleteCategory = (id) => {
        axios.delete(`http://localhost:5000/categorys/deletecategorys/${id}`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
            .then(() => {
                setIsDelete(true);
                toast.success("Category deleted", toastOptions);
                handleClose(); // Close the modal after deletion
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <div className="p-4 text-center w-auto mt-20">
                <div className="flex justify-between items-center text-center mb-4">
                    <h1 className="text-xl font-bold flex">
                        <img src={logo0} alt="" className="px-2" />
                        Category
                    </h1>
                    <input type="text" placeholder="Search..." className="border rounded-lg p-2 w-2/4" />
                    <button className="bg-purple-800 text-primary-foreground px-4 py-2 rounded-lg text-white">
                        <Link to="/categorys/addcategorys">Add Category</Link>
                    </button>
                </div>
                <table className="min-w-full bg-card border-0">
                    <thead className="bg-amber-200">
                        <tr className="bg-muted text-muted-foreground">
                            <th className="py-2 px-4 border-b">Id</th>
                            <th className="py-2 px-4 border-b">Category name</th>
                            <th className="py-2 px-4 border-b">Image</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Sequence</th>
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCategory.map((category, index) => (
                            <tr key={category._id} className="hover:bg-muted/50 bg-gray-100">
                                <td className="py-2 px-4 border-b">{index + 110}</td>
                                <td className="py-2 px-4 border-b">{category.categoryname}</td>
                                <td className="py-2 px-4 border-b flex justify-center">
                                    <img alt={category.categoryname} src={`http://localhost:5000/images/${category.imageUrl}`} className="w-10 h-10" />
                                </td>
                                <td className={`py-2 px-4 border-b ${category.status ? 'text-green-500' : 'text-red-500'}`}>
                                    {category.status === false ? 'Inactive' : 'Active'}
                                </td>
                                <td className="py-2 px-4 border-b">{category.number}</td>
                                <td className="py-2 px-7 border-b flex justify-center">
                                    <button className="text-destructive px-2">
                                        <Link to={`/categorys/editcategory/${category._id}`}>
                                            <EditIcon className="text-blue-700" />
                                        </Link>
                                    </button>

                                    <div>
                                        <IconButton aria-label="delete" onClick={() => handleOpen(category._id)}>
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
                                                <Typography id="modal-modal-description" sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
                                                    <Button onClick={handleClose} variant="contained" sx={{ color: "black", background: "white" }}>
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => deleteCategory(selectedCategoryId)}
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
            <ToastContainer />
        </div>
    );
}

export default Categoryhome;
