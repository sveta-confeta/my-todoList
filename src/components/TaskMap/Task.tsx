import React, {useCallback} from 'react';
import {Checkbox} from "@mui/material";
import s from "../../Todolist.module.css";
import EditSpan from "../EditSpan/EditSpan";
import {ButtonForm} from "../Button";
import {useDispatch, useSelector} from "react-redux";
import {apdateTaskAC, chengeCheckBoxStatusAC, removeTaskAC} from "../../reducers/tasksReducer";
import {AppRootStateType} from "../../redux/redux-store";
import {TasksType} from "../../Todolist";
import {AllTodolistsType} from "../../reducers/todolistsReducer";

type TaskPropsType={
    // changeTaskStatus: (id: string,newIsDoneValue: boolean,todolistID:string) => void
    todolistID:string
    // apdateTaskTitle:(todolistsID:string,taskID:string,title:string)=>void
    // removeTask: (mID: string,todolistID:string) => void//функция удаления
    // task:TaskType //то что мапится приходит из тасок, cдесь один обьект из тасок.т есть одна таска
    taskID:string
}

export const Task = (props:TaskPropsType) => {
    // const todolist=useSelector<AppRootStateType,AllTodolistsType[]>(state=> state.todolists.filter(f=>f.id ==props.todolistID)[0])
    const todolist=useSelector<AppRootStateType,AllTodolistsType>(state=> state.todolists.filter(f=> f.id===props.todolistID)[0])
    const tasks=useSelector<AppRootStateType,TasksType>(state=> state.tasks[props.todolistID].filter(f=> f.id==props.taskID)[0])
    const dispatch = useDispatch();

    const callbackApdateTask = useCallback((elID: string, title: string) => {
        dispatch(apdateTaskAC(props.todolistID,elID, title))
    }, [dispatch, apdateTaskAC,props.todolistID])

    const removeTaskHandler = useCallback((tId: string) => {
        dispatch(removeTaskAC(props.todolistID,tId))
    }, [dispatch,removeTaskAC,props.todolistID])


    const onChangeCheckbox = useCallback((elID: string, value: boolean) => {

        dispatch(chengeCheckBoxStatusAC(props.todolistID,elID, value))
    }, [dispatch,chengeCheckBoxStatusAC,props.todolistID])
    return (
        <div>
            <Checkbox color="success" checked={tasks.isDone}
                      onChange={(event) => onChangeCheckbox(tasks.id, event.currentTarget.checked)}/>
            {/*<span>{el.task}</span> так было */}
            <span className={tasks.isDone ? s.isDone : s.notDone}>
                <EditSpan title={tasks.task} apdateTask={(title: string) => callbackApdateTask(tasks.id, title)}/>
                {/*<button onClick={() => props.removeTask(el.id)}>x</button>*/}
                <ButtonForm name={'x'} callback={() => removeTaskHandler(tasks.id)}/>
                    </span>
        </div>
    );
};

