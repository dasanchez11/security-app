import React from 'react'
import { MdDeleteOutline, MdModeEdit } from 'react-icons/md'

const Task = ({onEdit, onDelete, item, provided, snapshot, edit }) => {
    return (
        <div className='relative'>
            <div ref={provided.innerRef}
                className={`select-none rounded-md py-4 w-[250px] bg-slate-100 my-2 flex flex-row items-center justify-center ${snapshot.isDragging ? 'bg-gray-400' : 'bg-slate-100'} `}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{ ...provided.draggableProps.style }}>
                <span className={`${edit ? '-translate-x-12 duration-200' : ''}`}>
                    {item.name}
                </span>
            </div>
            <div className={`absolute right-0 top-0 items-center justify-center text-white rounded-r-md  bg-red-600 h-full w-[25%]  flex flex-row  ${edit ? ' animate-edit-transition' : 'hidden'}`}>
                <div onClick={onEdit} className='cursor-pointer hover:border hover:border-white h-full w-full flex items-center justify-center'>
                    <MdModeEdit />
                </div>
                <div onClick={onDelete} className='cursor-pointer hover:border hover:border-white hover:rounded-r-md h-full w-full flex items-center justify-center  '>
                    <MdDeleteOutline />

                </div>
            </div>
        </div>
    )
}

export default Task