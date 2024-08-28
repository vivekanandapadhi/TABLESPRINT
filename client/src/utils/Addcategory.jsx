import React, { useState } from 'react';
import axios from 'axios';
import Navbars from '../components/Navbar';
import Drawer from '../components/Drawer';
// import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Addcategory() {
  const [categoryName, setCategoryName] = useState('');
  const [sequence, setSequence] = useState('');
  const navigate=useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [image,setImage]=useState()
  const toastOptions={
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
}
  const handleImageUpload = (e) => {
    setImagePreview(e.target.files[0]);
   
    const file=e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
      
        setImage(reader.result); // Set the preview to the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };
 
  const dataSave = (e) => {
    e.preventDefault(); 
    
    const categoryData=new FormData()
    categoryData.append("categoryname", categoryName);
    categoryData.append("number", sequence);
    categoryData.append("file",imagePreview)


    if (categoryName === '' || sequence === '') {
      toast.error("please fill all the inputs",toastOptions)
    } else {
      try {
        const token=localStorage.getItem("token")
        console.log(token)
        axios.post('http://localhost:5000/categorys/addcategorys', categoryData,{
          headers:{
            'Authorization':`Bearer ${token}`
        }
        })
        .then((res)=>{
            setCategoryName("")
            setSequence("")
            setImage(null)
            toast.success("Data added successfully",toastOptions)
        })
        .catch((err)=>{
            console.log(err)
        })
        
        
      } catch (error) {
        console.error('Failed to send data:', error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const dataCancel = () => {
    navigate('/categorys')
  };

  return (
    <div>
      <Navbars />
      <div className="flex justify-between">
        <Drawer />
        <div className="p-6 m-6 bg-background rounded-lg shadow-md w-4/5 mt-24">
          <h2 className="text-lg font-semibold mb-4">
            <button className="mr-4">
              <Link to="/categorys">
                {/* <FaArrowLeft /> */}
                <ArrowBackIcon/>
              </Link>
            </button>
            Add Category
          </h2>
          <form onSubmit={dataSave}>
            <div className="flex gap-10">
              <div className="mb-4">
              <label className="block text-muted-foreground mb-1">Category Name</label>

                <input
                  type="text"
                  className="mt-1 block w-full border border-border rounded-md p-2 focus:ring focus:ring-ring placeholder:text-black focus:outline-none"
                  placeholder="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
              <label className="block text-muted-foreground mb-1">Category Sequence</label>
                <input
                  type="number"
                  min="1"
                  placeholder="Category Sequence"
                  className="block text-sm font-medium text-muted-foreground border-2 placeholder:text-black rounded-md h-12 text-center focus:ring focus:ring-ring focus:outline-none"
                  value={sequence}
                  onChange={(e) => setSequence(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              {/* <div className="border rounded-lg p-4 bg-card">
                <img hidden alt="Uploaded image preview" src="https://placehold.co/100x100" className="rounded-md mb-2" />
                <span className="text-muted-foreground">Upload Image</span>
              </div> */}
              <div className="border rounded-lg p-4 bg-card">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden" // Hide the file input
                  id="imageUpload"
                />
                {image ? (
                  <img alt="preview" src={image} className="rounded-md mb-2 w-20 h-20" />
                ) : (
                  <span className="text-muted-foreground">Upload Image</span>
                )}
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <div className="text-muted-foreground text-blue-800">Click here to upload an image</div>
                </label>
              </div>
              <div className="border rounded-lg p-4 bg-card flex flex-col border-dashed">
                <input type="file" />
                <span className="text-muted-foreground">
                  Upload Maximum allowed
                  <br />
                  file size is 10MB
                </span>
              </div>
            </div>
            <div className="flex justify-end mt-12 gap-8">
              <button
                type="button"
                className="bg-muted text-muted-foreground hover:bg-muted/80 p-2 w-28 border border-border rounded-full"
                onClick={dataCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded-full bg-purple-800 w-28 text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Addcategory;
