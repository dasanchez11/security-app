import React from 'react'

const CustomButton = ({name,onClick,type}) => {
  return (
    <button type={type?type:''} onClick={onClick} className='px-2 py-2 bg-Main hover:bg-Dark text-white rounded-lg'>
        {name}
    </button>
  )
}

export default CustomButton