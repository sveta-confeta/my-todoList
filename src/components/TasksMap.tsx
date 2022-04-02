import React, {useCallback} from 'react';
import s from "../Todolist.module.css";
import EditSpan from "./EditSpan";
import {ButtonForm} from "./Button";
import {Checkbox} from "@mui/material";
import {TasksType} from "../Todolist";

type TasksMapPropsTYpe = {
    tasks:Array<TasksType>
    removeTask: (id: string, todolistID: string) => void
    chengeCheckBoxStatus: (todolistID:string,id:string,value:boolean) => void
    todolistID: string
    apdateTask: (title: string, todolistID: string, taskID: string) => void
}

export const TasksMap = (props: TasksMapPropsTYpe) => {

    const callbackApdateTask =useCallback( (elID: string, title: string) => {
        props.apdateTask(props.todolistID, elID, title)
    },[ props.apdateTask,props.todolistID])

    const removeTaskHandler =useCallback( (tId: string) => props.removeTask(tId, props.todolistID),[props.removeTask,props.todolistID])

    const onChangeCheckbox =useCallback( (elID: string, value: boolean) => {
        props.chengeCheckBoxStatus(props.todolistID,elID, value);
    },[ props.chengeCheckBoxStatus,props.todolistID])
    return (
        //MaterialUI использует под капотом React.memo -только нет useCallback/нужно оборачивать
        <ul className={s.todolist_tasks}>
            {props.tasks.map( el => <li key={el.id}>
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

