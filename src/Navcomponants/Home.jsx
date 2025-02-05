import React from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const handleExploreClick = () => {
    navigate("/products");
  };

  return (

    <div className="">



      <section className="Home" id='Home'>



        <div className="flex flex-col justify-center items-center  text-white mt-20 mx-6 2xl:mt-32 md:mx-20 mid-home ">
          <p className="font-bold text-[30px] md:text-[60px] 2xl:text-[70px]">चिंतामणी फुड प्रोडक्टस्</p>
          <div className="">
            <p className="mt-10 md:mt-6 md:text-3xl text-center leading-[30px]">जिभेवर रेंगाळणारी मालवणी चव  </p>
            <p className="md:mt-6 md:text-3xl text-center leading-[30px]">हेच आमचे वैशिष्ट !!</p>
          </div>

        </div>

        <div className="explore-btn mt-20 md:mt-14 2xl:mt-20 md:mx-20 mx-10 flex justify-center items-center gap-4 md:gap-14">
          <hr className="border-[1.5px] border-white w-full" />
          <button type="button" className='bg-[#ff770f] hover:bg-[#be7237] px-12 py-2 rounded-2xl text-2xl text-white w-full' onClick={handleExploreClick}>Our Products</button>
          <hr className="border-[1.5px] border-white w-full" />

        </div>

      </section>

      <div className="grid md:grid-cols-3 min-[600px]:grid-cols-1 items-center md:mx-20 mx-5 mt-24 gap-6">
        <div className="max-[600px]:flex justify-center items-center flex-col">
          <h1 className="text-6xl  max-[600px]:text-center font-bold">Welcome</h1>
          <h2 className='text-2xl  max-[600px]:text-center font-semibold mt-6'>We Are Locally Crafted Food</h2>
          <p className="mt-8 max-[600px]:text-center ">Congue, gravida. Placeat nibh sunt semper elementum anim! Integer lectus debitis auctor. Molestias vivamus eligendi ut, cupidatat nisl iaculis etiam! Laboris aenean .</p>
          <Link to="" className=""><button type="button" className='flex justify-center items-center gap-6 bg-[#ff770f] px-6 py-3 rounded-full text-white mt-10 hover:mt-14 transition-all'><i class="fa-solid fa-arrow-right"></i> More About Us</button></Link>
        </div>

        <div className="max-[600px]:hidden">
          <img src="/images/login.png" alt="" className="w-full h-96 shadow-black shadow-2xl" />
        </div>

        <div className="max-[600px]:hidden">
          <img src="/Landing_page.png" alt="" className="w-full h-96 shadow-black shadow-2xl" />
        </div>

        <div className="flex justify-center gap-4 min-[600px]:hidden">
        <div className="">
          <img src="/images/login.png" alt="" className="w-80 h-80 shadow-black shadow-2xl" />
        </div>

        <div className="">
          <img src="/Landing_page.png" alt="" className="w-80 h-80 shadow-black shadow-2xl" />
        </div>
        </div>

      </div>


      <div className="mt-12 bg-slate-700 py-6">
        <p className="text-center md:text-xl text-[10px] text-white flex justify-center  items-center gap-3 ">All right reserved <li className=""><Link to="/Privacy-Policy">Privacy policy</Link></li> <li>&copy; Chintamani Food Products</li>  <li><a href="https://codequell.com/" target='_blank' className="">Developed by CodeQuell</a></li>  </p>

        <div className="flex justify-center items-center col-end-12 gap-4 py-6">
          <Link to=""> <i className="fa-brands fa-facebook-f text-white bg-[#ff770f] rounded-full p-3 transform duration-500 hover:bg-white hover:text-[#ff770f]"></i></Link>
          <Link to=""> <i className="fa-brands fa-x-twitter text-white bg-[#ff770f] rounded-full p-3 transform duration-500 hover:bg-white hover:text-[#ff770f]"></i></Link>
          <Link to=""> <i className="fa-brands fa-instagram text-white bg-[#ff770f] rounded-full p-3 transform duration-500 hover:bg-white hover:text-[#ff770f]"></i></Link>
          <Link to=""> <i className="fa-brands fa-linkedin-in text-white bg-[#ff770f] rounded-full p-3 transform duration-500 hover:bg-white hover:text-[#ff770f]"></i></Link>
        </div>

       <Link to="https://codequell.com/">
       <div className="flex justify-center items-center">
          <img src="/logo-color.png" alt="" className="w-32" />
        </div>
       </Link>
      </div>


    </div>
  );
};

export default Home;
