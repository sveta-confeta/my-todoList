import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from "./AddItemsForm/AddItemForm.module.css";
import {TextField} from "@mui/material";


type InputPropsType = {
    newTaskTitle: string
    error: boolean
    onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
    keyPress: (event: KeyboardEvent<HTMLInputElement>) => void

}

export const Input = (props: InputPropsType) => {


    return (
        <div>
            {/*<input value={props.newTaskTitle}*/}
            {/*       onKeyPress={props.keyPress}*/}
            {/*       onChange={props.onChangeHandler}*/}
            {/*       className={`${s.addtask} + ${props.error ? s.error:' '}`}*/}
            {/*       type="text"/>*/}
            <TextField
                value={props.newTaskTitle}
                onKeyPress={props.keyPress}
                onChange={props.onChangeHandler}
                // className={props.error ? s.error : ''}
                size={'small'} id="outlined-basic"
                // label={ props.error ? <div className={s.errorMessage}>Title is required</div> : 'write title'}
                variant="outlined"
                label={props.error ? 'Title is requires' : "write title"}
                error={props.error}/>
        </div>
    );
};

