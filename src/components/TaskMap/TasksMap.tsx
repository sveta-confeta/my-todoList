import React from 'react';
import s from "./../../Todolist.module.css";

import {useAppSelector} from "../../redux/redux-store";
import {Task} from "./Task";
import {TaskStatuses} from "../../api/ todolist-api";
import {RequestStatusType} from "../../reducers/appReducer";
import {ItemType} from "../../reducers/tasksReducer";
import {Paper} from "@mui/material";

type TasksMapPropsType = {
    filter:string
    todolistID: string//это то что нам нужно чтобы идентифицировать тодолист

}

export const TasksMap = React.memo(({ todolistID,filter}: TasksMapPropsType) => {
    const tasks =useAppSelector<Array<ItemType>>(state => state.tasks[todolistID]); //filter возращает массив-а нам нужен 1 обьект в массиве
    const status=useAppSelector<RequestStatusType>(state=>state.app.status);
    let tasksFilter = tasks;

    if (filter === 'Active') {

        tasksFilter = tasks.filter(f => f.status===TaskStatuses.New); //в массив данных записывается профильтрованный массив данных и он уходит в тудулист по пропсам
    }
    if (filter === 'Completed') { //выполненные таски

        tasksFilter = tasks.filter(f => f.status===TaskStatuses.Completed); //true значит,выполненные
    }

    return (
        //MaterialUI использует под капотом React.memo -только нет useCallback/нужно оборачивать
        <ul className={s.todolist_tasks}>
            {tasksFilter?.map ( el => {//без ? не отрисовываются тасок с апи может пока и не быть

               return  <Paper className={s.li} elevation={2} key={el.id}>

                {/*//в статусе прилетает 'loading'*/}
                <Task taskID={el.id} todolistID={todolistID} disabledStatus={status}/>
               </Paper>})}

        </ul>
    );
});

