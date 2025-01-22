import React from 'react'

const Contact = () => {
  return (
    <>
    <div className="bg-[#faf7f0] px-20 h-[78vh]">
        <div className="grid grid-cols-6 pt-10">
            
            <div className="col-span-4">
                <h1 className="text-[#4A4947] text-3xl font-extrabold">Get in touch</h1>

                <div className="grid grid-cols-6 pt-6 gap-8 contact">
                    
                    <div className="col-span-2 bg-white pt-6 border-2 border-gray-200 rounded-xl">
                        <div className="flex justify-evenly items-center">
                            <a href="" className=" bg-[#d8d2c233] p-4 rounded-xl"><img src="/images/Instagram.svg" alt="ChintamaniInsatgram" className="" /></a>
                            <a href="" className=" bg-[#d8d2c233] p-4 rounded-xl"><img src="/images/Facebook.svg" alt="ChintamaniFacebook" className="" /></a>
                        </div>
                        <p className="text-[#4A4947] font-semibold text-lg text-center pt-3 pb-8">Connect on social media </p>
                    </div>

                    <div className="col-span-2 col-start-4 bg-white pt-6 border-2 border-gray-200 rounded-xl">
                        <div className="flex justify-start px-8 items-center">
                            <a href="https://wa.me/+919146238835" target="_blank" rel="noreferrer" className=" bg-[#d8d2c233] p-4 rounded-xl"><img src="/images/WhatsApp.svg" alt="ChintamaniWhatsapp" className="" /></a>
                            
                        </div>
                        <p className="text-[#4A4947] font-semibold text-lg text-left px-8 pt-3 pb-8">Chat to support </p>
                    </div>

                    <div className="col-span-2  bg-white pt-6 border-2 border-gray-200 rounded-xl">
                        <div className="flex justify-start px-8 items-center">
                            <a href="" className=" bg-[#d8d2c233] p-4 rounded-xl"><img src="/images/MapMarker.svg" alt="ChintamaniLocation" className="" /></a>
                            
                        </div>
                        <p className="text-[#4A4947] font-semibold text-lg text-left px-8 pt-3 pb-8">Visit us  </p>
                    </div>

                    <div className="col-span-2 col-start-4 bg-white pt-6 border-2 border-gray-200 rounded-xl">
                        <div className="flex justify-start px-8 items-center">
                            <a href="" className=" bg-[#d8d2c233] p-4 rounded-xl"><img src="/images/Phone.svg" alt="ChintamaniPhone" className="" /></a>
                            
                        </div>
                        <p className="text-[#4A4947] font-semibold text-lg text-left px-8 pt-3 pb-8">Call Us </p>
                    </div>
                    
                </div>
            </div>
            
            
            <div className="col-span-2">
                <div className="bg-white text-[#4A4947] px-8 py-6 rounded-xl">

                    <form action="" className="">
                        <div className="flex flex-col justify-start gap-2">
                            <label htmlFor="" className='font-bold text-lg '>Name </label>
                            <input type="text" name="" id="" className=' rounded-full text-black px-4 py-2 border-[1.5px] border-black bg-[#F6F6F6] w-full' />
                        </div>

                        <div className="flex flex-col justify-start gap-2 pt-6">
                            <label htmlFor="" className='font-bold text-lg '>Email </label>
                            <input type="email" name="" id="" className=' rounded-full text-black px-4 py-2 border-[1.5px] border-black bg-[#F6F6F6] w-full' />
                        </div>

                        <div className="flex flex-col justify-start gap-2 pt-6">
                            <label htmlFor="" className='font-bold text-lg '>Message </label>
                            <textarea name="" id="" placeholder='Text Here' className=" rounded-2xl text-black px-4 py-2 border-[1.5px] border-black bg-[#F6F6F6] w-full"></textarea>
                        </div>

                        <div className="flex justify-center items-center pt-6">
                            <button type="submit" className='text-white font-bold text-2xl bg-[#232629] rounded-full px-10 py-2 '>Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        
        </div>
    </div>
  </>
  )
}

export default Contact
