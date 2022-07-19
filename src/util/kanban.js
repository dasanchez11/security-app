import { v4 as uuid } from 'uuid'
import { toTimestamp } from './time'


export const onDragEnd = async (result, cols, kanbanInfo, setKanbanInfo, kanbanAxios) => {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
        try {
            const sourceColName = cols.filter(column => kanbanInfo[column].id === source.droppableId)
            const destColName = cols.filter(column => kanbanInfo[column].id === destination.droppableId)
            const result = await kanbanAxios.post('movedifferent', {sourceColName, destColName,source,destination})
            console.log(result)
            const sourceItems = [...kanbanInfo[sourceColName].tasks]
            const destinationItems = [...kanbanInfo[destColName].tasks]
            const [removed] = sourceItems.splice(source.index, 1)
            destinationItems.splice(destination.index, 0, removed)
            setKanbanInfo({
                ...kanbanInfo,
                [sourceColName]: {
                    ...kanbanInfo[sourceColName],
                    tasks: sourceItems
                },
                [destColName]: {
                    ...kanbanInfo[destColName],
                    tasks: destinationItems
                }
            })
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            const colName = cols.filter(column => kanbanInfo[column].id === source.droppableId)
            const result = await kanbanAxios.post('movesame', { colName, source, destination })
            console.log(result)
            const column = kanbanInfo[colName]
            const copiedItems = [...column.tasks]
            const [removed] = copiedItems.splice(source.index, 1)
            copiedItems.splice(destination.index, 0, removed)
            setKanbanInfo({
                ...kanbanInfo,
                [colName]: {
                    ...column,
                    tasks: copiedItems
                }
            })

        } catch (error) {
            console.log(error)
        }
    }
}


export const onDeleteTask = async (taskId, setKanbanInfo, kanbanInfo, cols, columnId, kanbanAxios) => {
    try {
        const columnName = cols.filter(column => kanbanInfo[column].id === columnId)
        const result = await kanbanAxios.patch('removetask', { taskId, columnName })
        console.log(result)
        setKanbanInfo({
            ...kanbanInfo,
            [columnName]: {
                ...kanbanInfo[columnName],
                tasks: kanbanInfo[columnName].tasks.filter(task => task.id !== taskId)
            }
        })

    } catch (error) {
        console.log(error)
    }
}

export const onTaskAdd = async (columnId, cols, kanbanInfo, setKanbanInfo, kanbanAxios) => {
    try {
        const columnName = cols.filter(column => kanbanInfo[column].id === columnId)
        const itemToAdd = { id: uuid(), name: 'New task', startDate: new Date(Date.now()).toLocaleString() }
        const result = await kanbanAxios.post('addtask', { itemToAdd, columnName })
        console.log(result)
        const oldItems = kanbanInfo[columnName].tasks
        const newItems = [...oldItems, itemToAdd]
        setKanbanInfo({
            ...kanbanInfo,
            [columnName]: {
                ...kanbanInfo[columnName],
                tasks: newItems
            }
        })
    } catch (error) {
        console.log(error)
    }
}
 

export const onTaskEdit = async (kanbanInfo, setKanbanInfo, modalInfo, kanbanAxios) => {
    try {
        const { itemId, name, startDate, column } = modalInfo
        const result = await kanbanAxios.post('edittask', { modalInfo })
        console.log(result)
        const newTasks = kanbanInfo[column].tasks.map(task => {
            if (task.id === itemId) {
                task.name = name
                task.startDate = toTimestamp(startDate)
            }
            return task
        })

        setKanbanInfo({
            ...kanbanInfo,
            [column]: {
                ...kanbanInfo[column],
                tasks: newTasks
            }
        })

    } catch (error) {
        console.log(error)
    }
}

