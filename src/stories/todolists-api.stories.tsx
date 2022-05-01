import React, {ChangeEvent, useEffect, useState} from 'react'
import axios from "axios";
import {todolistApi} from "../api/ todolist-api";

export default {
    title: 'API'
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>(''); //нужны локальгые стейты для отображения на ui

    const deleteTodolist = () => {
        todolistApi.deleteTodolist(todolistID)
            .then((res) => {
                setState(res.data);

            })
    }

    const onchangeHandlerID = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistID(e.currentTarget.value)

    }
    return <div> {JSON.stringify(state)}<br/>
        <input placeholder={'todolistID'} value={todolistID} onChange={onchangeHandlerID}/><br/>
        <button onClick={deleteTodolist}>delete todolist</button>
    </div>
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolist()
            .then(res => setState(res.data))


    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => { //cоздать  нов тодолист
    const [state, setState] = useState<any>(null);
    const [todolistTitle, setTodolistTitle] = useState<string>('') //нужны локальгые стейты для отображения на ui

    const addTaskHandler = () => {
        todolistApi.createNewTodolist(todolistTitle)
            .then(res => setState(res.data))

    }
    const onchangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistTitle(e.currentTarget.value)
    }

    return <div> {JSON.stringify(state)}<br/>
        <input placeholder={'todolistTitle'} value={todolistTitle} onChange={onchangeHandlerTitle}/><br/>
        <button onClick={addTaskHandler}>add Task</button>
    </div>
}

export const UpdateTodolistTitle = () => {  //переименовать титл тодолиста
    const [state, setState] = useState<any>(null)
    const [todolistTitle, setTodolistTitle] = useState<string>('') //нужны локальгые стейты для отображения на ui
    const [todolistID, setTodolistID] = useState<string>(''); //нужны локальгые стейты для отображения на ui


    const updateTodolistTitle = () => {
        todolistApi.updateTodoTitle(todolistID, todolistTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    const onchangeHandlerID = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistID(e.currentTarget.value)
    }

    const onchangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistTitle(e.currentTarget.value)
    }

    return <div> {JSON.stringify(state)}<br/>
        <input placeholder={'todolistID'} value={todolistID} onChange={onchangeHandlerID}/><br/>
        <input placeholder={'new todolistTitle'} value={todolistTitle} onChange={onchangeHandlerTitle}/><br/>
        <button onClick={updateTodolistTitle}>new title todolist</button>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>('') //нужны локальгые стейты для отображения на ui


    const getTasks = () => {
        todolistApi.getTasks(todolistID)
            .then(res => {
                setState(res.data.items)//[] пусто
            })
    }

    const onchangeHandlerID = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistID(e.currentTarget.value)
    }

    return <div> {JSON.stringify(state)}<br/>
        <input placeholder={'todolistID'} value={todolistID} onChange={onchangeHandlerID}/><br/>
        <button onClick={getTasks}>get tasks</button>
    </div>

}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskID, setTaskID] = useState<string>('') //нужны локальгые стейты для отображения на ui
    const [todolistID, setTodolistID] = useState<string>('') //нужны локальгые стейты для отображения на ui


    const deleteTask = () => {
        todolistApi.deleteTask(todolistID, taskID)
            .then(res => {
                debugger;
                setState(res.data)//[] пусто
            })
    }

    const onchangeHandlerID = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistID(e.currentTarget.value)
    }
    const onchangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskID(e.currentTarget.value)
    }

    return <div> {JSON.stringify(state)}
        <button onClick={deleteTask}>delete task</button>
        <input placeholder={'todolistID'} value={todolistID} onChange={onchangeHandlerID}/>
        <input placeholder={'taskID'} value={taskID} onChange={onchangeHandlerTitle}/>


    </div>
}


export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('') //нужны локальгые стейты для отображения на ui
    const [todolistID, setTodolistID] = useState<string>('') //нужны локальгые стейты для отображения на ui

    const createHandler = () => {

        todolistApi.createTask(todolistID, taskTitle)
            .then(res => {
                setState(res.data)
            })
    }

    const onchangeHandlerID = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistID(e.currentTarget.value)
    }
    const onchangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    return <div> {JSON.stringify(state)} <br/>
        <div>
            <input placeholder={'todolistID'} value={todolistID} onChange={onchangeHandlerID}/><br/>
            <input placeholder={'taskTitle'} value={taskTitle} onChange={onchangeHandlerTitle}/><br/>
            <button onClick={createHandler}>create new task</button>
        </div>
    </div>

}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>(''); //нужны локальгые стейты для отображения на ui
    const [todolistID, setTodolistID] = useState<string>(''); //нужны локальгые стейты для отображения на ui
    const [taskID, setTaskID] = useState<string>('')
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>('');
    const [deadline, setDeadline] = useState<string>('');

    const updateHandler = () => {

        todolistApi.updateTask(todolistID, taskID, {
            deadline: '',
            description: description,
            priority: priority,
            completed: false,
            startDate: '',
            status: status,
            title: taskTitle,
        })
            .then(res => {
                setState(res.data)
            })
    }

    const onchangeHandlerID = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistID(e.currentTarget.value)
    }
    const onchangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const taskHandlerID = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskID(e.currentTarget.value)
    }
    const descriptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.currentTarget.value)
    }
    const statusHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(+e.currentTarget.value)
    }

    return <div> {JSON.stringify(state)} <br/>
        <div>
            <input placeholder={'todolistID'} value={todolistID} onChange={onchangeHandlerID}/><br/>
            <input placeholder={'taskID'} value={taskID} onChange={taskHandlerID}/><br/>
            <input placeholder={'taskTitle'} value={taskTitle} onChange={onchangeHandlerTitle}/><br/>
            <input placeholder={'description'} value={description} onChange={descriptionHandler}/><br/>
            <input placeholder={'status'} value={status} onChange={statusHandlerTitle}/><br/>
            <button onClick={updateHandler}>update task</button>
        </div>
    </div>

}


