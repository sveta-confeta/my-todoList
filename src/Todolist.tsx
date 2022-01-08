import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./Todolist.module.css"
import {Button} from "./components/Button";
import {Input} from "./components/Input";

export type TasksType = {
    id: string
    task: string
    isDone: boolean

}
export type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    filteredTask: (value: string) => void
    addTask: (value: string) => void
    chengeCheckBoxStatus: (id:string,value: boolean) => void
}


export function Todolist(props: TodolistPropsType) {
    //хук для инпута:
    const [newTaskTitle, setNewTaskTitle] = useState(' ');//useState for input


    //вместо 3х функций фильтрации тасок напишем одну функцию:
    // const filteredTaskAll = () => props.filteredTask('All');
    // const filreredTaskActive = () => props.filteredTask('Active');
    // const filteredTaskCompleted=() => props.filteredTask('Completed');

    const filteredTask = (value: string) => {
        props.filteredTask(value);
    }
    const blockButton = () => {
        props.addTask(newTaskTitle);
    }
    const removeTaskHandler = (tId: string) =>
        props.removeTask(tId);
    const onChangeCheckbox=(elID:string,value:boolean)=>{
props.chengeCheckBoxStatus(elID, value);

    }

    return (
        <div className={s.todolist_wrapper}>
            <div className={s.title}>{props.title}</div>
            <div className={s.input_wrapper}>
                <Input newTaskTitle={newTaskTitle} setNewTaskTitle={setNewTaskTitle} addTask={props.addTask}/>
                {/*<input value={newTaskTitle}*/}
                {/*       onKeyPress={keyPress}*/}
                {/*       onChange={onChangeHandler}*/}
                {/*       className={s.addtask}*/}
                {/*       type="text"*/}
                {/*       placeholder="add task"/>*/}
                {/*<button className={s.btn_title} onClick={addTask}>+*/}
                {/*</button>*/}
                <Button name={'+'} callback={blockButton}/>
            </div>
            <ul className={s.todolist_tasks}>
                {props.tasks.map(el => <li key={el.id}><input type="checkbox"
                                                              checked={el.isDone}
                                                              onChange={(event) =>onChangeCheckbox(el.id,event.currentTarget.checked)}/>
                    <span>{el.task}</span>
                    {/*<button onClick={() => props.removeTask(el.id)}>x</button>*/}
                    <Button name={'x'} callback={() => removeTaskHandler(el.id)}/>
                </li>)}

            </ul>
            <div className={s.btn_set}>
                <button onClick={() => filteredTask('All')}>All</button>
                <button onClick={() => filteredTask('Active')}>Active</button>
                <button onClick={() => filteredTask('Completed')}>Completed</button>
            </div>

        </div>

    )

}
