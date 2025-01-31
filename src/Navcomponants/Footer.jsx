import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <div className="block md:hidden">
        <div className="fixed bottom-[0%] w-full bg-[#D8D2C2] py-2">
          <nav>
            <ul className="flex justify-around items-center">
              <li>
                <Link to="/" className='flex flex-col justify-center items-center font-bold'>
                  <img src="/images/mobile-Home.svg" alt="Home" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/addtocart" className='flex flex-col justify-center items-center font-bold'>
                  <img src="/images/Mobile-cart.svg" alt="Cart" />
                  <span>Cart</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className='flex flex-col justify-center items-center font-bold'>
                  <img src="/images/mobile-products.svg" alt="Products" />
                  <span>Products</span>
                </Link>
              </li>

              <li>
                <Link to="/contact" className='flex flex-col justify-center items-center font-bold'>
                <i className="fa-solid fa-phone text-xl"></i>
                  <span>Contact</span>
                </Link>
              </li>

            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
