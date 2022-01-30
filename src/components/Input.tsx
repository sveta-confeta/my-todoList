import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from "../Todolist.module.css";

type InputPropsType = {
    newTaskTitle: string
    error:boolean
    onChangeHandler:(event: ChangeEvent<HTMLInputElement>)=>void
    keyPress:(event: KeyboardEvent<HTMLInputElement>)=>void

}

export const Input = (props: InputPropsType) => {




    return (
        <div>
            <input value={props.newTaskTitle}
                   onKeyPress={props.keyPress}
                   onChange={props.onChangeHandler}
                   className={`${s.addtask} + ${props.error ? s.error:' '}`}
                   type="text"/>
        </div>
    );
};

