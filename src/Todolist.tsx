import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import s from "./Todolist.module.css"
import {TasksMap} from "./components/TaskMap/TasksMap";
import {AddItemForm} from "./components/AddItemsForm/AddItemForm";
import EditSpan from "./components/EditSpan/EditSpan";
import {ButtonForm} from "./components/Button";
import {Button, ButtonGroup} from "@mui/material";


export type TasksType = {
    id: string
    task: string
    isDone: boolean

}
export type TodolistPropsType = {
    title: string //это не меняется
    tasks: Array<TasksType> //а это каждый раз приходит разное, в зависимости от фильтра получается всегда новый обьект
    //поэтому фильтрацию мы будем делать в самом тудулисте

    filteredTask: (todolistID: string, value: string) => void
    addTask: (todolistID: string, value: string) => void

    filter: string
    todolistID: string//это не меняется
    removeTodolist: (todolistID: string) => void

    titleTodolist: (todolistID: string, title: string) => void
}


export const Todolist = React.memo((props: TodolistPropsType) => {
    console.log('Todolist')

    const addTask = useCallback((newTaskTitle: string) => {
        props.addTask(props.todolistID, newTaskTitle)
    }, [props.addTask, props.todolistID])


    //вместо 3х функций фильтрации тасок напишем одну функцию:
    // const filteredTaskAll = () => props.filteredTask('All');
    // const filreredTaskActive = () => props.filteredTask('Active');
    // const filteredTaskCompleted=() => props.filteredTask('Completed');

    const filteredTask = useCallback((value: string) => {
        props.filteredTask(props.todolistID, value);
    }, [props.filteredTask, props.todolistID]);

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolistID)
    }, [props.removeTodolist, props.todolistID])

    const callbackTitleTodolist = useCallback((title: string) => {
        props.titleTodolist(props.todolistID, title)
    }, []);




    return (
        <div className={s.todolist_wrapper}>
            <div className={s.wrapperForm}>
                <h3><EditSpan title={props.title} apdateTask={(title: string) => callbackTitleTodolist(title)}/></h3>
                <ButtonForm name={'x'} callback={removeTodolist}/>
            </div>
            <div className={s.input_wrapper}>
                <AddItemForm addTask={addTask}/>

            </div>
            {/*map отдельно*/}
            <TasksMap
                filter={props.filter}
                todolistID={props.todolistID}/>
            {/*MaterialUI использует под капотом React.memo -только нет useCallback/нужно оборачивать*/}
            <ButtonGroup className={s.btn_set} variant="contained">
                <Button style={{fontSize: '13px', border: '1px solid grey'}}
                        color={props.filter === 'All' ? "success" : "inherit"}
                        onClick={() => filteredTask('All')}>All</Button>
                <Button style={{fontSize: '13px', border: '1px solid grey'}}
                        color={props.filter === 'Active' ? "success" : "inherit"}
                        onClick={() => filteredTask('Active')}>Active</Button>
                <Button style={{fontSize: '13px', border: '1px solid grey'}}
                        color={props.filter === 'Completed' ? "success" : "inherit"}
                        onClick={() => filteredTask('Completed')}>Completed</Button>
            </ButtonGroup>

        </div>

    )

});
