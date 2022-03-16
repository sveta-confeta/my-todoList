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
    tasks:Array<StateType>
    removeTask: (id: string,todolistID:string) => void
    filteredTask: (value: string,todolistID:string) => void
    addTask: (value: string,todolistID:string) => void
    chengeCheckBoxStatus: (id:string,value: boolean,todolistID:string) => void
    filter:string
    todolistID:string
    removeTodolist:(todolistID:string)=>void
    apdateTask:(title:string,todolistID:string,taskID:string)=>void
    titleTodolist:(title:string,todolistID:string)=>void
}


export function Todolist(props: TodolistPropsType) {
 const addTask=(newTaskTitle:string)=>{
     props.addTask(newTaskTitle,props.todolistID)
 }



    //вместо 3х функций фильтрации тасок напишем одну функцию:
    // const filteredTaskAll = () => props.filteredTask('All');
    // const filreredTaskActive = () => props.filteredTask('Active');
    // const filteredTaskCompleted=() => props.filteredTask('Completed');

    const filteredTask = (value: string) => {
        props.filteredTask(value,props.todolistID);
    }


    const removeTodolists= () => {
      removeTodolist();
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
            <ButtonForm name={'x'} callback={removeTodolists}/>
            </div>
            <div className={s.input_wrapper}>
                <AddItemForm addTask={addTask}/>

            </div>
            {/*map отдельно*/}
            <TasksMap
                apdateTask={props.apdateTask}
                //@ts-ignore
                tasks={props.tasks}  todolistID={props.todolistID} removeTask={props.removeTask} chengeCheckBoxStatus={props.chengeCheckBoxStatus}/>

            {/*<div className={s.btn_set}>*/}
            {/*    <button className ={props.filter==='All' ? s.activeFilter : '' } onClick={() => filteredTask('All')}>All</button>*/}
            {/*    <button className={props.filter==='Active' ? s.activeFilter : '' } onClick={() => filteredTask('Active')}>Active</button>*/}
            {/*    <button className={props.filter==='Completed' ? s.activeFilter : '' } onClick={() => filteredTask('Completed')}>Completed</button>*/}
            {/*</div>*/}
            <ButtonGroup  className={s.btn_set} variant="contained">
                <Button  style={{fontSize:'13px',border:'1px solid grey'}}  color ={props.filter==='All' ? "success" : "inherit" } onClick={() => filteredTask('All')}>All</Button>
                <Button  style={{fontSize:'13px',border:'1px solid grey' }}  color ={props.filter==='Active' ? "success" : "inherit"  } onClick={() => filteredTask('Active')}>Active</Button>
                <Button  style={{fontSize:'13px',border:'1px solid grey' }}  color ={props.filter==='Completed' ? "success" : "inherit" } onClick={() => filteredTask('Completed')}>Completed</Button>
            </ButtonGroup>

        </div>

    )

}
