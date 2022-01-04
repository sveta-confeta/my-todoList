import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./Todolist.module.css"

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
}


export function Todolist(props: TodolistPropsType) {
    //хук для инпута:
    const [newTaskTitle, setNewTaskTitle] = useState(' ');//useState for input

    //
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }//cобытие инпута onChange


    const addTask = () => {  //функция добавления таски вынесенная отдельно
        props.addTask(newTaskTitle)
        setNewTaskTitle(' ')
    }
    const keyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {   //функция которая добавляет таску по клику на ентер
            addTask()
        }
    }
    //вместо 3х функций фильтрации тасок напишем одну функцию:
    // const filteredTaskAll = () => props.filteredTask('All');
    // const filreredTaskActive = () => props.filteredTask('Active');
    // const filteredTaskCompleted=() => props.filteredTask('Completed');

    const filteredTask=(value:string)=> {
        props.filteredTask(value);
    }


    return (
        <div className={s.todolist_wrapper}>
            <div className={s.title}>{props.title}</div>
            <div className={s.input_wrapper}>
                <input value={newTaskTitle}
                       onKeyPress={keyPress}
                       onChange={onChangeHandler}
                       className={s.addtask}
                       type="text"
                       placeholder="add task"/>
                <button className={s.btn_title} onClick={addTask}>+
                </button>
            </div>
            <ul className={s.todolist_tasks}>
                {props.tasks.map(el => <li key={el.id}><input type="checkbox"
                                                              checked={el.isDone}/><span>{el.task}</span>
                    <button onClick={() => props.removeTask(el.id)}>x</button>
                </li>)}

            </ul>
            <div className={s.btn_set}>
                <button onClick={()=>filteredTask('All')}>All</button>
                <button onClick={()=>filteredTask('Active')}>Active</button>
                <button onClick={()=>filteredTask('Completed')}>Completed</button>
            </div>

        </div>

    )

}