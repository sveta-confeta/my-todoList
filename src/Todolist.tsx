import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./Todolist.module.css"
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import {TasksMap} from "./components/TasksMap";

export type TasksType = {
    id: string
    task: string
    isDone: boolean

}
export type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    filteredTask: (value: string,todolistID:string) => void
    addTask: (value: string) => void
    chengeCheckBoxStatus: (id:string,value: boolean) => void
    filter:string
    todolistID:string
}


export function Todolist(props: TodolistPropsType) {
    //хук для инпута:
    const [newTaskTitle, setNewTaskTitle] = useState(' ');//useState for input

    const [error, setError] = useState(false); //хук для бордера инпута красный-не красный

    //вместо 3х функций фильтрации тасок напишем одну функцию:
    // const filteredTaskAll = () => props.filteredTask('All');
    // const filreredTaskActive = () => props.filteredTask('Active');
    // const filteredTaskCompleted=() => props.filteredTask('Completed');

    const filteredTask = (value: string) => {
        props.filteredTask(value,props.todolistID);
    }



    const blockButton = () => {
        addTaskButton();
    }

    const addTaskButton=()=>{
        const trimmedTitle = newTaskTitle.trim();
        if (trimmedTitle) {
            props.addTask(trimmedTitle);
            setNewTaskTitle(' ');
        }else{
            setError(true);
        }
    }


    return (
        <div className={s.todolist_wrapper}>
            <div className={s.title}>{props.title}</div>
            <div className={s.input_wrapper}>
                <Input newTaskTitle={newTaskTitle} setNewTaskTitle={setNewTaskTitle} addTask={props.addTask} error={error} setError={setError}/>
                {/*<input value={newTaskTitle}*/}
                {/*       onKeyPress={keyPress}*/}
                {/*       onChange={onChangeHandler}*/}
                {/*       className={s.addtask}*/}
                {/*       type="text"*/}
                {/*       placeholder="add task"/>*/}
                {/*<button className={s.btn_title} onClick={addTask}>+*/}
                {/*</button>*/}
                <Button name={'+'} callback={blockButton}/>
                {error ? <div className={s.errorMessage}>Title is required</div> : ''}
            </div>
            {/*map отдельно*/}
            <TasksMap tasks={props.tasks} removeTask={props.removeTask} chengeCheckBoxStatus={props.chengeCheckBoxStatus}/>
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
                <button className ={props.filter==='All' ? s.activeFilter : '' }onClick={() => filteredTask('All')}>All</button>
                <button className={props.filter==='Active' ? s.activeFilter : '' } onClick={() => filteredTask('Active')}>Active</button>
                <button className={props.filter==='Completed' ? s.activeFilter : '' } onClick={() => filteredTask('Completed')}>Completed</button>
            </div>

        </div>

    )

}
