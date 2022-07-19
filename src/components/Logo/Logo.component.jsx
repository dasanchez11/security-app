import React from 'react'
import {GiCubes} from 'react-icons/gi'

const Logo = () => {
  return (
    <div className='flex flex-row items-center gap-2 '>
         <svg width="10" height="10">
          <linearGradient id="purple-gradient" x1="0" y1="0%" x2="0%" y2="100%">
            <stop stopColor="#B985F4" offset="0%" />
            <stop stopColor="#431A9E" offset="100%" />
          </linearGradient>
        </svg>
          <GiCubes style={{ fill: "url(#purple-gradient)" }}/>
          <span className='text-lg text-transparent bg-clip-text bg-gradient-to-b from-Light to-Dark '>Cubes</span>
    </div>
  )
}

export default Logo