import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Input} from "./Input";
import {Button} from "./Button";
import s from "../Todolist.module.css";

type AddItemFormPropsType={
    addTask:(title:string)=>void

}

export const AddItemForm = (props:AddItemFormPropsType) => {


    //хук для инпута:
    const [newTaskTitle, setNewTaskTitle] = useState(' ');//useState for input
    const [error, setError] = useState(false); //хук для бордера инпута красный-не красный

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

    const keyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {   //функция которая добавляет таску по клику на ентер
           addTaskButton();
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setNewTaskTitle(event.currentTarget.value)
    }//cобытие инпута onChange

    return (
        <div>
            <Input onChangeHandler={onChangeHandler} newTaskTitle={newTaskTitle} keyPress={keyPress} error={error}/>
            <Button name={'+'} callback={blockButton}/>
            {error ? <div className={s.errorMessage}>Title is required</div> : ''}
        </div>
    );
};

