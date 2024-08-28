import React, { useState } from 'react';
// import { FaTimes } from 'react-icons/fa';
import Menu from "../assets/menu.png";
import Home from "../assets/HomeIcon.png";
import Ca from "../assets/category.svg";
import Product from "../assets/product.svg";
import { Link } from 'react-router-dom';

const Drawer = ({color}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2"
      >
        {isOpen ? "he": <img src={Menu} alt="Menu" className="w-6 h-6" />}
      </button>

      <div
        className={`fixed top-0 left-0 bg-gray-100 text-black w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300`}
        style={{ height: "80vh", marginTop: "6%" }}
      >
        <div className="p-4">
          <ul className="mt-4 space-y-2">
            <li className="relative">
              <Link to="/dashboard" className="block p-2 hover:bg-amber-200 rounded flex items-center space-x-2" style={{color:color}}>
                <img
                  src={Home} // Replace with your image URL
                  alt="Icon 1"
                  className="w-6 h-6"
                />
                <span className="flex-1 font-medium">Dashboard</span>
                <svg
                  className="w-8 h-8 transition-colors duration-300 fill-current text-gray-400 hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 17l5-5-5-5v10z" />
                </svg>
              </Link>
            </li>
            <li className="relative">
              <Link to="/categorys" className="block p-2 hover:bg-amber-200 rounded flex items-center space-x-2">
                <img
                  src={Ca} // Replace with your image URL
                  alt="Icon 2"
                  className="w-6 h-6"
                />
              <span className="flex-1 font-medium">Category</span>
                <svg
                  className="w-8 h-8 transition-colors duration-300 fill-current text-gray-400 hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 17l5-5-5-5v10z" />
                </svg>
              </Link>
            </li>
            <li className="relative">
              <Link to="/subcategorys" className="block p-2 hover:bg-amber-200 rounded flex items-center space-x-2">
                <img
                  src={Menu} // Replace with your image URL
                  alt="Icon 3"
                  className="w-6 h-6"
                />
                <span className="flex-1 font-medium">Subcategory</span>
                <svg
                  className="w-8 h-8 transition-colors duration-300 fill-current text-gray-400 hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 17l5-5-5-5v10z" />
                </svg>
              </Link>
            </li>
            <li className="relative">
              <Link to="/product" className="block p-2 hover:bg-amber-200 rounded flex items-center space-x-2">
                <img
                  src={Product} // Replace with your image URL
                  alt="Icon 4"
                  className="w-6 h-6"
                />
                <span className="flex-1 font-medium">Products</span>
                <svg
                  className="w-8 h-8 transition-colors duration-300 fill-current text-gray-400 hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 17l5-5-5-5v10z" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
