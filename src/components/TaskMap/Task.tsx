import React, {ChangeEvent, useCallback, useMemo} from 'react';
import {Checkbox} from "@mui/material";
import EditSpan from "../EditSpan/EditSpan";
import {ButtonForm} from "../Button";
import {useSelector} from "react-redux";
import {
    ItemType,
    TasksDeleteThunkCreator, TaskUpdateStatusThunkCreator,
    TaskUpdateTitleThunkCreator
} from "../../reducers/tasksReducer";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {AllTodolistsType} from "../../reducers/todolistsReducer";
import {TaskStatuses} from "../../api/ todolist-api";
import s from './../../Todolist.module.css'
import {RequestStatusType} from "../../reducers/appReducer";

type TaskPropsType={
    todolistID:string
    taskID:string
    disabledStatus:RequestStatusType
}

export const Task =(props:TaskPropsType) => {
    // const todolist=useSelector<AppRootStateType,AllTodolistsType[]>(state=> state.todolists.filter(f=>f.id ==props.todolistID)[0])
    const todolist=useSelector<AppRootStateType,AllTodolistsType>(state=> state.todolists.filter(f=> f.id===props.todolistID)[0])
    const tasks=useSelector<AppRootStateType,ItemType>(state=> state.tasks[props.todolistID].filter(f=> f.id==props.taskID)[0])
    const dispatch = useAppDispatch();


    const callbackUpdateTask = useCallback((elID: string, title: string) => {
        dispatch(TaskUpdateTitleThunkCreator({
            taskId: elID,
            model: {title},
            todolistId: props.todolistID}))
    }, [])

    const removeTaskHandler = useCallback(( taskID: string) => {  //удаление тасок
        dispatch(TasksDeleteThunkCreator({todolistID: props.todolistID, taskID}))

    }, [])

const checkedHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        // let doneValue= event.currentTarget.checked; //в чекед сидит либо тру либо фолз
    //  onChangeCheckbox(tasks.id, doneValue ? TaskStatuses.Completed :TaskStatuses.New)

    dispatch(TaskUpdateStatusThunkCreator({
        taskID: props.taskID,
        status:event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
        todolistID: props.todolistID
    }))
    }


    // const onChangeCheckbox = useCallback((elID: string, status:TaskStatuses) => { //изменения статуса таски
    //     dispatch( TaskUpdateStatusThunkCreator({todolistID:props.todolistID,taskID:elID, status})) //диспатчим в санку .пут запрос
    // }, [])
    return (
        <div className={s.liTask}>
            <Checkbox  className={s.checkbox} color="success" checked={tasks.status===TaskStatuses.Completed}//было tasks.isDone
                      onChange={checkedHandler}/>
            <span className={`${s.span} ${tasks.status===TaskStatuses.Completed ? s.isDone : s.notDone}`}>
                <EditSpan title={tasks.title} apdateTask={(title: string) => callbackUpdateTask(tasks.id, title)}/>
                <ButtonForm name={'x'} callback={() => removeTaskHandler(tasks.id)} disabledStatus={props.disabledStatus}/>
                    </span>
        </div>
    )
};

