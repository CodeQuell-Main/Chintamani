import React from 'react'

import { Link } from 'react-router'

export default function Footer() {
  return (
    <div>
      <div className="w-full bg-[#D8D2C2]">
                <div className="mx-10 flex justify-between items-center py-1">
                    <Link to="/Setting" className=""><img src="/images/Settings.svg" alt="" className="" /></Link>
                    <Link to="/addtocart" className=""><button type='button' className='bg-white  rounded-full'><img src="/images/Shopping_bag.svg" alt="" className="w-14 h-14" /></button></Link>
                </div>  
        </div>
    </div>
  )
}
