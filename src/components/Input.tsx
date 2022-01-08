import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "../Todolist.module.css";

type InputPropsType = {
    newTaskTitle: string
    setNewTaskTitle: (newTaskTitle: string) => void
    addTask: (value: string) => void

}

export const Input = (props: InputPropsType) => {
    let [error, setError] = useState(false); //хук для бордера инпута красный-не красный

    const keyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {   //функция которая добавляет таску по клику на ентер
            const trimmedTitle = props.newTaskTitle.trim();
            if (trimmedTitle) {
                props.addTask(trimmedTitle)
            }
            props.setNewTaskTitle(' ')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setNewTaskTitle(event.currentTarget.value)
    }//cобытие инпута onChange

    return (
        <div>
            <input value={props.newTaskTitle}
                   onKeyPress={keyPress}
                   onChange={onChangeHandler}
                   className={`${s.addtask} + ${error ? s.error:' '}`}
                   type="text"
                   placeholder="add task"/>
        </div>
    );
};

