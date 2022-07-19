import React from 'react'
import CustomButton from '../CustomButton/CustomButton'

const EditTask = ({setEdit,onClose,setModalInfo,modalInfo,editTask}) => {

    const handleChange = (e) =>{
        setModalInfo(state=>({...state,[e.target.name]:e.target.value}))
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        editTask()
        onClose()
        setEdit()
        setModalInfo()
    }

    return (
        <div className='h-full flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold'>Edit task</h1>
            <form className='flex flex-col gap-2 p-5'>
                <div className="relative mt-2 border-b-2 focus-within:border-Main bg-transparent z-0">
                    <input onChange={handleChange} value={modalInfo.name} type='text' name="name" placeholder='' className={`block w-full appearance-none focus:outline-none bg-transparent text-gray-600`} />
                    <label className="absolute top-0 -z-10 duration-300 origin-0 text-Main">Task Name</label>
                </div>
                <div className="relative mt-8 border-b-2 focus-within:border-Main bg-transparent z-0">
                    <input onChange={handleChange} value={modalInfo.startDate} type='datetime-local' name="startDate" placeholder=" " className={`block w-full appearance-none focus:outline-none bg-transparent text-gray-600`} />
                    <label className="absolute top-0 -z-10 duration-300 origin-0 text-Main">Start Date</label>
                </div>
                <div className='mt-12 w-full flex flex-col justify-center'>
                    <CustomButton type='submit' onClick={handleSubmit} name='Update Task'>Submit</CustomButton>
                </div>
            </form>
        </div>
    )
}

export default EditTask