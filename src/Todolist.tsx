import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./Todolist.module.css"
import {TasksMap} from "./components/TasksMap";
import {StateType} from "./App";
import {AddItemForm} from "./components/AddItemsForm/AddItemForm";
import EditSpan from "./components/EditSpan";
import {ButtonForm} from "./components/Button";
import {Button, ButtonGroup} from "@mui/material";



export type TasksType = {
    id: string
    task: string
    isDone: boolean

}
export type TodolistPropsType = {
    title: string
    tasks:TasksType[]
    removeTask: (todolistID:string,id: string) => void
    filteredTask: (todolistID:string,value: string) => void
    addTask: (todolistID:string,value: string) => void
    chengeCheckBoxStatus: (todolistID:string,id:string,value:boolean) => void
    filter:string
    todolistID:string
    removeTodolist:(todolistID:string)=>void
    apdateTask:(todolistID:string,taskID:string,title:string)=>void
    titleTodolist:(todolistID:string,title:string)=>void
}


export function Todolist(props: TodolistPropsType) {
 const addTask=(newTaskTitle:string)=>{
     props.addTask(props.todolistID,newTaskTitle)
 }



    //вместо 3х функций фильтрации тасок напишем одну функцию:
    // const filteredTaskAll = () => props.filteredTask('All');
    // const filreredTaskActive = () => props.filteredTask('Active');
    // const filteredTaskCompleted=() => props.filteredTask('Completed');

    const filteredTask = (value: string) => {
        props.filteredTask(props.todolistID,value);
    }

    const removeTodolist = () => {
      props.removeTodolist(props.todolistID)
    }

    const callbackTitleTodolist=(title:string)=>{
     props.titleTodolist(props.todolistID,title)

    }


    return (
        <div className={s.todolist_wrapper}>
            <div className={s.wrapperForm}>
            <h3><EditSpan title={props.title} apdateTask={(title:string)=>callbackTitleTodolist(title)}/></h3>
            <ButtonForm name={'x'} callback={removeTodolist}/>
            </div>
            <div className={s.input_wrapper}>
                <AddItemForm addTask={addTask}/>

            </div>
            {/*map отдельно*/}
            <TasksMap
                apdateTask={props.apdateTask}
                tasks={props.tasks}  todolistID={props.todolistID} removeTask={props.removeTask} chengeCheckBoxStatus={props.chengeCheckBoxStatus}/>

            <ButtonGroup  className={s.btn_set} variant="contained">
                <Button  style={{fontSize:'13px',border:'1px solid grey'}}  color ={props.filter==='All' ? "success" : "inherit" } onClick={() => filteredTask('All')}>All</Button>
                <Button  style={{fontSize:'13px',border:'1px solid grey' }}  color ={props.filter==='Active' ? "success" : "inherit"  } onClick={() => filteredTask('Active')}>Active</Button>
                <Button  style={{fontSize:'13px',border:'1px solid grey' }}  color ={props.filter==='Completed' ? "success" : "inherit" } onClick={() => filteredTask('Completed')}>Completed</Button>
            </ButtonGroup>

        </div>

    )

}
