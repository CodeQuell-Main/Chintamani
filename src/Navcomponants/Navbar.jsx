import React from 'react';
import { Link } from 'react-router-dom';
import "../style/navbar.css"

const Navbar = () => {
  return (
    <div className="bg-[#faf7f0] max-[800px]:bg-[#D8D2C2]">
    <nav>
      <ul className="flex md:justify-around justify-between items-center">
        <img src="/images/Logo.svg" alt="Logo" className="md:w-20 w-20 " />
        
        <li className="text-black font-bold text-xl max-[900px]:hidden">
          <Link to="/">Home</Link>
        </li>
        <li
          id="our_products"
          className="relative text-black font-bold text-xl max-[900px]:hidden"
        >
          <Link to="/products" className="cursor-pointer">Our Products</Link>
         
        </li>
        <li className="text-black font-bold text-xl max-[900px]:hidden">
          <Link to="/Contact">Contact</Link>
        </li>
        <li className="text-black font-bold ">
          <Link to="/profile" className="flex flex-col items-center justify-center">
            <img src="/images/Profile.svg" alt="Profile" className="w-16" />
          </Link>
        </li>
      </ul>
    </nav>
  </div>
  );
};

export default Navbar;
