import React from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../CustomButton/CustomButton'
import Logo from '../Logo/Logo.component'

const Header = () => {
  const navigate = useNavigate()
  return (
    <header className='flex flex-row justify-between py-4 px-[3vw] md:px-9 xl:px-40 text-lg items-center text-white font-semibold'>
      <div onClick={()=>navigate('/')} className='text-3xl align-center cursor-pointer'>
       <Logo/>
      </div>
      
      <div className='hidden sm:flex'>
        <ul className='flex flex-row gap-4 '>
          <li className='text-white cursor-pointer hover:text-Main'>Home</li>
          <li className='text-white cursor-pointer hover:text-Main'>About Us</li>
        </ul>
      </div> 
      
      <div className='flex flex-row gap-3 items-center text-sm md:text-base'>
        <span onClick={()=>navigate('/signup')} className='text-Main cursor-pointer hover:text-Dark'>Register</span>
        <CustomButton onClick={()=>navigate('/signin')} name='Log In'/>
        <div className='sm:hidden self-center cursor-pointer text-lg text-white' >
          <GiHamburgerMenu/>
        </div>
      </div>


    </header>
  )
}

export default Header