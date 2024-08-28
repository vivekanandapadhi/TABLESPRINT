import Navbars from '../components/Navbar'
import Drawer from '../components/Drawer'
// import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function EditSubCategory() {

  let [name, setName] = useState("")
  let [qty, setQty] = useState("")
  let [subCategory,setSubCategory]=useState("")
//   let [categorySequence,setCategorySequence]=useState("")
  let [status, setStatus] = useState(false)
  let [image,setImage]=useState()

  let navigate = useNavigate()
  const toastOptions={
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
}
  let obj = useParams()
//   console.log(obj);
const token=localStorage.getItem("token")
  useEffect(() => {
    axios.get(`http://localhost:5000/subcategorys/updatesubcategory/${obj.id}`,{
      headers:{
        'Authorization':`Bearer ${token}`
    }
    })
      .then((response) => {
        // console.log(response.data)
        setName(response.data.category)
        // setCategorySequence(response.data.subCategorySequence)
        setQty(response.data.subCategorySequence)
        setSubCategory(response.data.subCategoryName)
        setStatus(response.data.status ? 'false' : 'true')
        setImage(response.data.imageUrl)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [obj.id,token])

  const cancelCategory=()=>{
    navigate("/subcategorys")
  }

  const updateCategory = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/subcategorys/addsubcategorys/${obj.id}`, {
        category: name,
        subCategoryName:subCategory,
        subCategorySequence: qty,
        status: status
    },{
      headers:{
        'Authorization':`Bearer ${token}`
    }
    })
      .then((response) => {
        // console.log(response);
        toast.success("Category added successfully",toastOptions)
        navigate('/subcategorys')
      })
      .catch((error) => {
        console.log(error);
      })
  }


  return (
    <div>
      <Navbars />
      <div className='flex justify-between'>
        <Drawer />
        <div className="p-6 bg-background rounded-lg shadow-md w-4/5 mt-24">
          <h2 className="text-lg font-semibold mb-4">
            <button className='mr-4'>  <Link to="/subcategorys"><ArrowBackIcon/></Link></button>Edit SubCategory</h2>
          <form >
            <div className='flex gap-20'>
              <div className="mb-4">
              <label className="block text-muted-foreground mb-1">Category</label>

                <input type="text" className="mt-1 block w-full border border-border rounded-md p-2 focus:ring focus:ring-ring placeholder:text-black focus:outline-none" placeholder="Category Name" value={name} onChange={(e) => { setName(e.target.value) }} />
              </div>
              <div className="mb-4">
              <label className="block text-muted-foreground mb-1">Sub Category Name</label>

                <input type="text" placeholder='Category Sequence' className="block text-sm font-medium text-muted-foreground border-2 placeholder:text-black rounded-md h-12 text-center focus:ring focus:ring-ring focus:outline-none" value={subCategory} onChange={(e) => { setSubCategory(e.target.value) }} />

              </div>
              <div className="mb-4">
              <label className="block text-muted-foreground mb-1">Sub Category Sequence</label>

                <input type="number" placeholder='Category Sequence' className="block text-sm font-medium text-muted-foreground border-2 placeholder:text-black rounded-md h-12 text-center focus:ring focus:ring-ring focus:outline-none" value={qty} onChange={(e) => { setQty(e.target.value) }} />

              </div>
              <div className="mb-4 flex gap-4">
                <label className="block text-muted-foreground mb-1">Status
                  <select id="status" className="border border-border rounded-md p-2 w-full" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="flex space-x-4">
            <div className="border rounded-lg p-4 bg-card">
             
             {image ? (
               <img alt="preview" src={`http://localhost:5000/images2/${image}`} className="rounded-md mb-2 w-20 h-20" />
             ) : (
               <span className="text-muted-foreground">Image is not uploaded</span>
             )}
             
           </div>
              {/* <div className="border rounded-lg p-4 bg-card flex flex-col border-dashed">
                <img undefinedhidden="true" alt="Upload icon" src="https://openui.fly.dev/openui/50x50.svg?text=📸" className="mb-2 " />
                <input type="file" />
                <span className="text-muted-foreground">Upload Maximum allowed<br />file size is 10MB</span>
              </div> */}
            </div>
            <div className="flex justify-end  mt-12 gap-8">
              <button type="button" onClick={cancelCategory} className="bg-muted text-muted-foreground hover:bg-muted/80 p-2 w-28 border border-border rounded-full ">
                Cancel
              </button>
              <button onClick={updateCategory} type="submit" className="bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded-full  bg-purple-800 w-28 text-white">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default EditSubCategory