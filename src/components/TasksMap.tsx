import React from 'react';
import s from "../Todolist.module.css";
import {TasksType} from "../Todolist";
import EditSpan from "./EditSpan";
import {ButtonForm} from "./Button";
import {Checkbox} from "@mui/material";

type TasksMapPropsTYpe = {
    tasks: Array<TasksType>
    removeTask: (id: string, todolistID: string) => void
    chengeCheckBoxStatus: (id: string, value: boolean, todolistID: string) => void
    todolistID: string
    apdateTask: (title: string, todolistID: string, taskID: string) => void
}

export const TasksMap = (props: TasksMapPropsTYpe) => {

    const callbackApdateTask = (elID: string, title: string) => {
        props.apdateTask(props.todolistID, elID, title)
    }

    const removeTaskHandler = (tId: string) =>
        props.removeTask(tId, props.todolistID);

    const onChangeCheckbox = (elID: string, value: boolean) => {
        props.chengeCheckBoxStatus(elID, value, props.todolistID);

    }
    return (
        <ul className={s.todolist_tasks}>
            {props.tasks.map(el => <li key={el.id} >
                {/*<input type="checkbox"*/}
                {/*       checked={el.isDone}*/}
                {/*       onChange={(event) => onChangeCheckbox(el.id, event.currentTarget.checked)}/>*/}
                <Checkbox   color="success"  checked={el.isDone} onChange={(event) => onChangeCheckbox(el.id, event.currentTarget.checked)}/>
                {/*<span>{el.task}</span> так было */}
                <span className={el.isDone ? s.isDone : s.notDone}>
                <EditSpan title={el.task} apdateTask={(title: string) => callbackApdateTask(el.id, title)}/>
                {/*<button onClick={() => props.removeTask(el.id)}>x</button>*/}
                <ButtonForm name={'x'} callback={() => removeTaskHandler(el.id)}/>
                    </span>
            </li>)}

        </ul>
    );
};

