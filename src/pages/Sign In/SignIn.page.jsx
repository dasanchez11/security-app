import React from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../../components/Logo/Logo.component'
import SignIn from '../../components/SignIn/SignIn.component'
import SignUp from '../../components/SignUp/Signup.component'


const SignInSignUp = () => {
    const location = useLocation()
    const currentLocation = location.pathname.split("/")[1]
    const signup = currentLocation === 'signup'
    return (
        <section className='h-screen w-screen flex flex-row gap-11 bg-slate-100 items-center'>
            <div className='bg-slate-50 hidden md:flex flex-col md:visible md:m-4 md:border-2 md:p-14 md:h-[95vh] md:w-[400px] md:rounded-md shadow-md'>
                <span className='text-4xl text-left'><Logo /></span>

                <h3 className='text-3xl font-bold mt-16'>{signup? 'Manage Your Company has never been so Easy!':' Welcome Back!'}</h3>

                <div>Image</div>


            </div>

            <div className='w-full md:w-[700px] h-[95vh] flex flex-col items-center justify-center text-Main'>
                <div>
                    <div>
                        <h2 className='font-semibold text-3xl pb-4 text-black'>{signup ? `Register for Free!`:'Sign In to Logistics Platform!'}</h2>
                        <h5 className='font-light text-gray-600 text-base pb-10'>Enter your details below</h5>
                    </div>
                        {signup ? <SignUp/> :<SignIn/> }      
                </div>
            </div>
        </section>
    )
}

export default SignInSignUp