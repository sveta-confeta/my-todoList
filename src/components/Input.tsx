import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "../Todolist.module.css";

type InputPropsType = {
    newTaskTitle: string
    setNewTaskTitle: (newTaskTitle: string) => void
    addTask: (value: string) => void
    error:boolean
    setError:(value:boolean)=>void

}

export const Input = (props: InputPropsType) => {


    const keyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {   //функция которая добавляет таску по клику на ентер
            const trimmedTitle = props.newTaskTitle.trim();
            if (trimmedTitle) {
                props.addTask(trimmedTitle);
                props.setNewTaskTitle(' ')
            }else{
                props.setError(true);
            }
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setError(false);
        props.setNewTaskTitle(event.currentTarget.value)
    }//cобытие инпута onChange

    return (
        <div>
            <input value={props.newTaskTitle}
                   onKeyPress={keyPress}
                   onChange={onChangeHandler}
                   className={`${s.addtask} + ${props.error ? s.error:' '}`}
                   type="text"
                   placeholder="add task"/>
        </div>
    );
};

