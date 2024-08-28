import React, { useState } from 'react'
import Navbars from '../components/Navbar'
import Drawer from '../components/Drawer';
import Menu from '../assets/menu.png';
// import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function Addsubcategory() {
    const [category, setCategory] = useState('');
    const [subname, setSubname] = useState('');
    const [sequence, setSequence] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [image,setImage]=useState()
    const navigate=useNavigate()
    const handleImageUpload = (e) => {
        setImagePreview(e.target.files[0])
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result); // Set the preview to the uploaded image
          };
          reader.readAsDataURL(file);
        }
      };
    // let obj = useParams()
    const toastOptions={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    }
    const dataSave = async (e) => {
        e.preventDefault();
        const categoryData=new FormData()
        categoryData.append("category", category);
        categoryData.append("subCategoryName",subname)
        categoryData.append("subCategorySequence", sequence);
        categoryData.append("file",imagePreview)

        // const categoryData = {
        //     category,
        //     subCategoryName: subname,
        //     subCategorySequence: sequence,
        // };
        // console.log(categoryData);

        if (!category || !subname || !sequence) {
            toast.error("please fill all the inputs",toastOptions)
        } else {
            try {
                const token=localStorage.getItem("token")
                await axios.post('http://localhost:5000/subcategorys/subaddcategory', categoryData,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                });
               
                toast.success("data added successfully",toastOptions)
                setCategory('');
                setSubname('');
                setSequence('');
                setImage(null)
            } catch (error) {
                console.error('Failed to send data:', error);
                alert(`Error: ${error.message}`);
            }
        }
    };

    const dataCancel = () => {
        navigate("/subcategorys")
    };

    return (
        <div>
            <Navbars />
            <div className="flex justify-between">
                <Drawer />
                <div className="p-6 m-6 bg-background rounded-lg shadow-md w-4/5 mt-24">

                    <h1 className="text-xl font-bold flex items-center mb-4 md:mb-0">
                        <Link to="/subcategorys">
                            {/* <FaArrowLeft /> */}
                            <ArrowBackIcon/>
                        </Link>
                        <img src={Menu} alt="Menu Icon" className="px-2 w-12 h-8 mr-5" />
                        Add Sub Category
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-8">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-foreground">
                                Category
                            </label>
                            <select id="category" className="mt-1 block w-full border border-border rounded-md p-2"  value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option>Select category name</option>
                                <option>Ghee & Oil</option>
                                <option>Tea</option>
                                <option>Dal & Pulses</option>
                                <option>Atta & Flours</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sub-category-name" className="block text-sm font-medium text-foreground">
                                Sub category name
                            </label>
                            <input type="text" id="sub-category-name" placeholder="Enter Sub Category Name" className="mt-1 block w-full border border-border rounded-md p-2" value={subname} onChange={(e) => { setSubname(e.target.value) }} />
                        </div>

                        <div>
                            <label htmlFor="sub-category-sequence" className="block text-sm font-medium text-foreground">
                                Sub Category Sequence
                            </label>
                            <input type="number" min="1" id="sub-category-sequence" className="mt-1 block w-full border border-border rounded-md p-2" value={sequence} onChange={(e) => { setSequence(e.target.value) }} />
                        </div>
                    </div>
                    <div className="flex space-x-4 justify-end m-24">
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
                    <div className="mt-6 flex justify-end">
                        <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-4 py-2 mr-2 w-28 border border-border rounded-full" onClick={dataCancel}>Cancel</button>
                        <button className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-md px-4 py-2 rounded-full bg-purple-800 w-28 text-white" onClick={dataSave}>Save</button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>


    )
}


export default Addsubcategory