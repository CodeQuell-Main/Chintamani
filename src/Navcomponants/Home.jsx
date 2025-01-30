import React from 'react';
import { Link } from 'react-router-dom';
// import "../style/home.css"
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate(); // Get the navigate function
  const handleExploreClick = () => {
    navigate("/products"); // Navigate to the "MyProducts" page
  };

  return (
    
    <div className="">
        <section className="Home" id='Home'>
       

        <div className="flex flex-col justify-center items-start  text-white mt-60 mx-6 md:mt-20 2xl:mt-52 md:mx-20 mid-home ">
          <p className="font-bold text-[30px] md:text-[60px] 2xl:text-[70px]">चिंतामणी फुड प्रोडक्टस्</p>
          <div className="">
          <p className="mt-10 md:mt-6 md:text-3xl text-left">जिभेवर रेंगाळणारी मालवणी चव <br  /> हेच आमचे वैशिष्ट !! </p>
          </div>
          
        </div>

        <div className="explore-btn mt-20 md:mt-14 2xl:mt-28 md:mx-20 mx-10 flex justify-start items-start">
          <button type="button" className='bg-[#439C33] hover:bg-[#358327] px-12 py-2 rounded-2xl text-2xl text-white max-[900px]:hidden' onClick={handleExploreClick}>Explore</button>
          <button type="button" className='bg-[#439C33] hover:bg-[#358327] px-12 py-2 rounded-2xl text-2xl text-white min-[900px]:hidden' onClick={handleExploreClick}>Get Start</button>

        </div>

      
    </section>

      <div className="Home-Logo max-[500px]:flex justify-center items-center absolute top-2 left-2">
          <img src="/images/Logo.svg" alt="" className="md:w-24 w-44 max-[900px]:mt-10" />
        </div>
    </div>
  );
};

export default Home;
