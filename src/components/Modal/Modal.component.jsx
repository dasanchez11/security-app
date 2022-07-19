import React from 'react'
import ReactDom from 'react-dom'


const Modal = ({open,onClose,children}) => {
    const handleClick = (e) =>{
        if(e.target.id === 'modal'){
            onClose()
        }
    }


 if(!open) return null
  return ReactDom.createPortal(
    <>
    <div id='modal' className='fixed top-0 left-0 right-0 bottom-0 bg-black/30 z-50' onClick={handleClick} >
        <div id='content' className='fixed h-72 w-72 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-md'>
            {children}
        </div>
    </div>
    </>,
    document.getElementById('portal')
  )
}

export default Modal