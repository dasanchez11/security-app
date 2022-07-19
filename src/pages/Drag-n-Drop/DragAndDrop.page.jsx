import React, { useContext, useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { AiOutlinePlus } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { AuthContext } from '../../context/AuthContext'
import { FetchContext } from '../../context/FetchContext'
import Modal from '../../components/Modal/Modal.component'
import Task from '../../components/Task/Task.component'
import { onDragEnd, onDeleteTask, onTaskAdd, onTaskEdit } from '../../util/kanban'
import EditTask from '../../components/EditTask/EditTask.component'

const DragAndDrop = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalInfo, setModalInfo] = useState()
    const [edit, setEdit] = useState(false)
    const [editColumn, setEditColumn] = useState()
    const authContext = useContext(AuthContext)
    const fetchContext = useContext(FetchContext)
    const { kanbanAxios } = fetchContext
    const { kanban } = authContext.authState.userInfo
    const [kanbanInfo, setKanbanInfo] = useState()
    const [cols, setCols] = useState('')

    useEffect(() => {
        const fetchKanban = async () => {
            const result = await kanbanAxios.get(`getkanban/${kanban}`)
            setKanbanInfo(result.data.kanban)
            setCols(Object.keys(result.data.kanban).slice(0, 3))
        }
        fetchKanban()
    }, [kanbanAxios, kanban])



    const handleEdit = (col) => {
        if (edit) {
            setEdit(false)
            if (col !== editColumn) {
                setEdit(true)
                setEditColumn(col)
            } else {
                setEditColumn(undefined)
            }
        } else {
            setEdit(true)
            setEditColumn(col)
        }
    }


    const taskEdit = (itemId, column) => {
        setModalOpen(true)
        let task = kanbanInfo[column].tasks.filter(task => task.id === itemId)
        let { id, name, startDate } = task[0]
        startDate = new Date(Date.parse(startDate)).toISOString().slice(0, 16)
        setModalInfo({ itemId: id, name, startDate, column })
    }

    return (
        <div className='flex flex-row gap-3'>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>{
                <EditTask
                setEdit={()=>{setEdit(false); setEditColumn(undefined)}} 
                onClose={() => setModalOpen(false)}
                setModalInfo={setModalInfo} 
                modalInfo={modalInfo}
                editTask={() => onTaskEdit(kanbanInfo, setKanbanInfo, modalInfo,kanbanAxios)} />
            }
            </Modal>
            <DragDropContext onDragEnd={result => onDragEnd(result, cols, kanbanInfo, setKanbanInfo,kanbanAxios)}>
                {cols && cols.map((column) => {
                    const element = kanbanInfo[column]
                    return (
                        <div key={element.id} className='bg-gray-200 p-4 rounded-md flex flex-col'>
                            <div className='flex flex-row justify-between'>
                                <h2 className='p-4 font-bold'>{element.columnName}</h2>
                                <div className='flex flex-row gap-2 items-center text-gray-500'>
                                    <div className='cursor-pointer font-bold hover:bg-gray-300 hover:rounded-xl p-1'>
                                        <AiOutlinePlus />
                                    </div>
                                    <div onClick={() => handleEdit(element.columnName)} className='cursor-pointer font-bold hover:bg-gray-300 hover:rounded-xl p-1'>
                                        <BsThreeDots />
                                    </div>
                                </div>
                            </div>
                            <Droppable droppableId={element.id}  >
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            className={`max-h-[65vh] overflow-y-scroll rounded-md mb-4 py-4 w-[250px] ${snapshot.isDraggingOver ? 'bg-gray-300' : ''}`}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {element.tasks.map((item, index) => {
                                                return (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                        {(provided, snapshot) => {
                                                            return (
                                                                <Task onEdit={() => taskEdit(item.id, column)} onDelete={() => onDeleteTask(item.id, setKanbanInfo, kanbanInfo, cols, element.id, kanbanAxios)} item={item} provided={provided} snapshot={snapshot} edit={edit && element.columnName === editColumn} />
                                                            )
                                                        }}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}
                            </Droppable>

                            <div onClick={() => onTaskAdd(element.id, cols, kanbanInfo, setKanbanInfo, kanbanAxios)} className='text-sm rounded-md p-4 w-[250px] bg-slate-100 h-[15] flex flex-row items-center justify-center cursor-pointer'>
                                <div className='cursor-pointer font-bold hover:bg-gray-300 hover:rounded-xl p-1'>
                                    <AiOutlinePlus />
                                </div>
                                <h2> Add Task</h2>
                            </div>
                        </div>
                    )
                }
                )}
            </DragDropContext>
        </div >
    )
}

export default DragAndDrop