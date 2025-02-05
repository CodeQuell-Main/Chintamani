import React from 'react'

export default function Landing() {
    setTimeout(() => {
        window.location.href='/Home'
    }, 2000);
  return (
   <>
    <div className="flex justify-center items-center w-full h-[100vh] animate-ping animate-twice animate-duration-1000 animate-ease-in-out overflow-hidden">
        <img src="/Logo.png" alt="" className="" />
    </div>
   </>
  )
}
