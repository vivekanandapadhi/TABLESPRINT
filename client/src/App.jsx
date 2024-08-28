import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css"
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Categorys from './pages/Category';
import Subcategorys from './pages/Subcategory';
import Product from './pages/Product';
import Addcategory from './utils/Addcategory';
import Editcategory from './utils/EditCategory';
import Addsubcategory from './utils/Addsubcategory';
import AddProduct from './utils/AddProduct';
import Subedit from './utils/EditSubCategory';
import EditProduct from './utils/EditProduct';
import ForgetPassword from './components/ForgetPassword';




function App() {
  return (
    <div>  

    <Router>
        <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/categorys" element={<Categorys />}/>
          <Route path='/categorys/addcategorys' element={<Addcategory />}/>
          <Route path='/categorys/editcategory/:id' element={<Editcategory/>}/>
          <Route path='/subcategorys' element={<Subcategorys />}/>
          <Route path='/subcategorys/addsubcategory' element={<Addsubcategory />}/>
          <Route path='/subcategorys/subedit/:id' element={<Subedit/>}/>
          <Route path='/product' element={<Product />}/>
          <Route path="/product/addproduct" element={<AddProduct />}/>
          <Route path="/product/editproduct/:id" element={<EditProduct/>}/>
          <Route path="/forgetpassword" element={<ForgetPassword/>}/>

        </Routes>
      
    </Router>
    </div>
  );
}

export default App;
