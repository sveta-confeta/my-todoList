import React, {useEffect, useState} from 'react'
import axios from "axios";
import { todolistApi} from "../api/ todolist-api";

export default {
    title: 'API'
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '9883dd41-f700-4fd2-894f-1e8d0c2dca77';
      todolistApi.deleteTodolist(todolistId)
    .then((res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolist()
            .then(res => setState(res.data))


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let titleTodolist = 'Learn JS'
        todolistApi.createNewTodolist(titleTodolist)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'bd6a164b-7455-4467-8763-f3800983be4f';
        const titleTodolist = "Learn REACT"
        todolistApi.updateTodoTitle(todolistId,titleTodolist)
            .then((res) => {
                setState(res.data)
            })


    }, [])


    return <div> {JSON.stringify(state)}</div>
}

