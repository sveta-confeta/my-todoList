import React from 'react';
import s from "../Todolist.module.css";
type InputPropsType={

}

export const Input = () => {

    return (
        <div>
            <input value={newTaskTitle}
                   onKeyPress={keyPress}
                   onChange={onChangeHandler}
                   className={s.addtask}
                   type="text"
                   placeholder="add task"/>
        </div>
    );
};

