import React, {useCallback} from 'react';
import s from "../../Todolist.module.css";
import EditSpan from "../EditSpan";
import {ButtonForm} from "../Button";
import {Checkbox} from "@mui/material";
import {TasksType} from "../../Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {apdateTaskAC, chengeCheckBoxStatusAC, removeTaskAC} from "../../reducers/tasksReducer";

type TasksMapPropsType = {
    // tasks:Array<TasksType> //будем делать через Redux
    // removeTask: (id: string, todolistID: string) => void
    // chengeCheckBoxStatus: (todolistID:string,id:string,value:boolean) => void
    todolistID: string//это то что нам нужно чтобы идентифицировать тодолист

    // apdateTask: (title: string, todolistID: string, taskID: string) => void
}

export const TasksMap = React.memo(({ todolistID}: TasksMapPropsType) => {
    console.log('task');
    const tasks = useSelector<AppRootStateType, Array<TasksType>>(state => state.tasks[todolistID]); //filter возращает массив-а нам нужен 1 обьект в массиве
    const dispatch = useDispatch();

    const callbackApdateTask = useCallback((elID: string, title: string) => {
        dispatch(apdateTaskAC(todolistID,elID, title))
    }, [dispatch, apdateTaskAC,todolistID])

    const removeTaskHandler = useCallback((tId: string) => {
        dispatch(removeTaskAC(todolistID,tId))
    }, [dispatch,removeTaskAC,todolistID])


    const onChangeCheckbox = useCallback((elID: string, value: boolean) => {

        dispatch(chengeCheckBoxStatusAC(todolistID,elID, value))
    }, [dispatch,chengeCheckBoxStatusAC,todolistID])

    return (
        //MaterialUI использует под капотом React.memo -только нет useCallback/нужно оборачивать
        <ul className={s.todolist_tasks}>
            {tasks.map ( el => <li key={el.id}>
                {/*<input type="checkbox"*/}
                {/*       checked={el.isDone}*/}
                {/*       onChange={(event) => onChangeCheckbox(el.id, event.currentTarget.checked)}/>*/}
                <Checkbox color="success" checked={el.isDone}
                          onChange={(event) => onChangeCheckbox(el.id, event.currentTarget.checked)}/>
                {/*<span>{el.task}</span> так было */}
                <span className={el.isDone ? s.isDone : s.notDone}>
                <EditSpan title={el.task} apdateTask={(title: string) => callbackApdateTask(el.id, title)}/>
                    {/*<button onClick={() => props.removeTask(el.id)}>x</button>*/}
                    <ButtonForm name={'x'} callback={() => removeTaskHandler(el.id)}/>
                    </span>
            </li>)}

        </ul>
    );
});

