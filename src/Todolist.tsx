import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./Todolist.module.css"
import {Button} from "./components/Button";
import {TasksMap} from "./components/TasksMap";
import {StateType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import EditSpan from "./components/EditSpan";


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
            {/*<div className={s.title}>{props.title}</div>-так было. делаем редактир название тудулистов-прикручиваем editSpan*/}
            <h3><EditSpan title={props.title} apdateTask={(title:string)=>callbackTitleTodolist(title)}/></h3>
            <Button name={'X'} callback={removeTodolists}/>
            <div className={s.input_wrapper}>
                <AddItemForm addTask={addTask}/>

            </div>
            {/*map отдельно*/}
            <TasksMap
                apdateTask={props.apdateTask}
                //@ts-ignore
                tasks={props.tasks}  todolistID={props.todolistID} removeTask={props.removeTask} chengeCheckBoxStatus={props.chengeCheckBoxStatus}/>
            {/*<ul className={s.todolist_tasks}>*/}
            {/*    {props.tasks.map(el => <li key={el.id} className={el.isDone ? s.isDone: '' }><input type="checkbox"*/}
            {/*                                                  checked={el.isDone}*/}
            {/*                                                  onChange={(event) =>onChangeCheckbox(el.id,event.currentTarget.checked)}/>*/}
            {/*        <span>{el.task}</span>*/}
            {/*        /!*<button onClick={() => props.removeTask(el.id)}>x</button>*!/*/}
            {/*        <Button name={'x'} callback={() => removeTaskHandler(el.id)}/>*/}
            {/*    </li>)}*/}

            {/*</ul>*/}
            <div className={s.btn_set}>
                <button className ={props.filter==='All' ? s.activeFilter : '' } onClick={() => filteredTask('All')}>All</button>
                <button className={props.filter==='Active' ? s.activeFilter : '' } onClick={() => filteredTask('Active')}>Active</button>
                <button className={props.filter==='Completed' ? s.activeFilter : '' } onClick={() => filteredTask('Completed')}>Completed</button>
            </div>

        </div>

    )

}
