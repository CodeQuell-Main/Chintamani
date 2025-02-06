import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
<div className="bg-white max-[900px]:bg-[#D8D2C2]  ">
           <nav>
             <ul className="grid grid-cols-10 items-center mx-20">
               <img src="/images/Logo.svg" alt="Logo" className="md:w-20 w-20 " />
               
               <li className="text-black   hover:text-[#ff770f] max-[900px]:hidden col-start-6 justify-self-center">
                 <Link to="/">Home</Link>
               </li>
               <li
                 id="our_products"
                 className="relative text-black   hover:text-[#ff770f] max-[900px]:hidden justify-self-center"
               >
                 <Link to="/products" className="cursor-pointer">Our Products</Link>
                
               </li>
               <li className="text-black   hover:text-[#ff770f] max-[900px]:hidden justify-self-center">
                 <Link to="/Contact">Contact</Link>
               </li>
               
               <li className="text-black   hover:text-[#ff770f] max-[900px]:hidden justify-self-center">
                 <Link to="/addtocart"><img src="/images/cart.png" alt="" className="w-12" /></Link>
               </li>
       
               <li className="text-black max-[900px]:col-end-10   justify-self-center">
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
