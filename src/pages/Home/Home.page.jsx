import React from 'react'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../../components/CustomButton/CustomButton'
import Header from '../../components/Header/Header.component'
const Home = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/signin')
    }
    return (
        <section className='h-screen bg-homeBackground '>
            <Header/>
            <div className='px-[3vw] md:px-9 xl:px-40 flex flex-row pt-15'>
                <div className='sm:w-[50%] w-full px-8 sm:px-0 text-white '>
                    <h1 className='font-extrabold text-center sm:text-left text-6xl xl:text-7xl'>
                        Manage your Sales Conveniently and Effectively
                        <span className='text-Main'> Without Worrying!</span>
                    </h1>

                    <h5 className='text-base my-12'>Start now with the number 1 platform in the market</h5>
                    <div onClick={handleClick} >
                        <CustomButton name={`Get Started Now →`} className='mt-4' />
                    </div>
                </div>
                <div className='w-[50%] hidden md:flex'>

                </div>

            </div>

        </section>
    )
}

export default Home