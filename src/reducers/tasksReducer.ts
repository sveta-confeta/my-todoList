import {addTodolistsAC, ApiTodolistsType, todolistsTasksID} from "./todolistsReducer";
import {TaskPriorities, TaskStatuses, todolistApi, UpdateTask} from "../api/ todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../redux/redux-store";
import {errorAppMessageAC, RequestStatusType, setAppStatusAC} from "./appReducer";
import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ItemType = { //get tasks
    description: string,
    title: string,
    status: TaskStatuses, //вместо isDone :обращение по номеру
    priority: TaskPriorities,
    startDate: string
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
    disabledStatus: RequestStatusType
}
export type StateType = {
    [key: string]: Array<ItemType>
}


const initialState: StateType = {
    [todolistsTasksID.todolistID_1]: [
        // {id: v1(), title: "название1 из инпут", isDone: false},

    ],
    [todolistsTasksID.todolistID_2]: [
        // {id: v1(), title: "название1 из инпут", isDone: false},
    ]
};

export const TasksThunkCreator = createAsyncThunk('task/TasksThunkCreator', (todolistID: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({value: 'loading'}))
    return todolistApi.getTasks(todolistID)
        .then((res) => { //get запрос за тасками. хочет id тодолиста в котором создавать будем таски
            const tasks = res.data.items
            thunkAPI.dispatch(setAppStatusAC({value: 'failed'}))
            // return  thunkAPI.dispatch(getTasksAC({tasks, todolistID}))
            return {tasks, todolistID} //payload вместо диспатча ретурн обьекта
        })
})

// export const TasksThunkCreator = (todolistID: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({value: 'loading'}))
//     todolistApi.getTasks(todolistID).then((res) => { //get запрос за тасками. хочет id тодолиста в котором создавать будем таски
//         dispatch(setAppStatusAC({value: 'failed'}))
//         dispatch(getTasksAC({tasks: res.data.items, todolistID}))
//     })
// }
export const TasksDeleteThunkCreator = createAsyncThunk ('task/TasksDeleteThunkCreator', (param:{todolistID: string, taskID: string},thunkAPI) =>{
    thunkAPI.dispatch(setAppStatusAC({value: 'loading'}))
    thunkAPI.dispatch(disabledStatusTaskAC({todolistID:param.todolistID, taskID:param.taskID, disabledStatus: 'loading'}));
    return todolistApi.deleteTask(param.todolistID,param.taskID).then(res => {  //удаление тасок delete запрос
        thunkAPI.dispatch(setAppStatusAC({value: 'failed'}))
        thunkAPI.dispatch(disabledStatusTaskAC({todolistID:param.todolistID, taskID:param.taskID, disabledStatus: 'failed'}))
       return {todolistID:param.todolistID, taskID:param.taskID}
    })
})

const slice = createSlice({
        name: 'task',
        initialState: initialState,
        reducers: {
            // логику удаления таски переносим в экстраредьюсскр
            //    имутабельное удаление:
            // state[action.payload.todolistID] = state[action.payload.todolistID].filter(t => t.id !== action.payload.taskID)
            addTaskAC(state, action: PayloadAction<{ item: ItemType }>) {
                state[action.payload.item.todoListId].unshift(action.payload.item);
                // state[action.payload.item.todoListId] = [action.payload.item, ...state[action.payload.item.todoListId]]
            },
            chengeCheckBoxStatusAC(state, action: PayloadAction<{ todolistID: string, id: string, status: TaskStatuses }>) {
                state[action.payload.todolistID] = state[action.payload.todolistID].map(m => m.id === action.payload.id ? {
                    ...m,
                    status: action.payload.status
                } : m)

            },
            apdateTaskAC(state, action: PayloadAction<{ todolistID: string, taskID: string, title: string }>) {
                const tasks = state[action.payload.todolistID];
                const index = tasks.findIndex(t => t.id === action.payload.taskID);
                tasks[index].title = action.payload.title;

                // state[action.payload.todolistID] = state[action.payload.todolistID].map(t => t.id === action.payload.taskID ? {
                //     ...t,
                //     title: action.payload.title
                // } : t)

            },
            disabledStatusTaskAC(state, action: PayloadAction<{ todolistID: string, taskID: string, disabledStatus: RequestStatusType }>) {
                state[action.payload.todolistID] = state[action.payload.todolistID].map(m => m.id === action.payload.taskID ? {
                    ...m, disabledStatus: action.payload.disabledStatus
                } : m)
            },
        },
        extraReducers: (builder) => {
            builder.addCase(addTodolistsAC, (state, action) => {
                state[action.payload.item.id] = [] //без этого кейса все работает)
            });
            builder.addCase(TasksThunkCreator.fulfilled, (state, action) => {
                state[action.payload.todolistID] = action.payload.tasks;
            });
            builder.addCase(TasksDeleteThunkCreator.fulfilled,(state, action) => {
                const tasks = state[action.payload.todolistID];
                    const index = tasks.findIndex(t => t.id === action.payload.taskID);
                    if (index > -1) {
                        tasks.splice(index, 1);
                    }
            });
        },


    })
;

export const TasksReducer = slice.reducer;
export const {
    disabledStatusTaskAC, addTaskAC, chengeCheckBoxStatusAC,
    apdateTaskAC,
} = slice.actions;


export const TasksAddThunkCreator = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({value: 'loading'}))
    todolistApi.createTask(todolistID, title)
        .then(res => {  //добавление тасок в уже созданные тодолисты
            if (res.data.resultCode === 0) { //если нет ошибки то выполни добавление тасок
                dispatch(setAppStatusAC({value: 'failed'}))
                dispatch(addTaskAC({item: res.data.data.item})) // -мы посылаем название таски и id тодолиста- post запрос
            } else {
                dispatch(setAppStatusAC({value: 'failed'})) //опять же убираем крутилку
                dispatch(errorAppMessageAC({value: res.data.messages[0]})); //достаем из массива сообщение об ошибке
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppStatusAC({value: 'failed'}))//крутилка отключилась
            dispatch(errorAppMessageAC({value: err.message})) //текст ошибки диспатчим в стейт
        })

}

export const TaskUpdateStatusThunkCreator = (todolistID: string, taskID: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => { //getState функция которая возращает стейт всего приложения
    const state = getState(); //здесь теперь весь стейт чтоб из него можно было достать нужные значения
    const allTasks = state.tasks;//все таски
    //debugger
    //теперь получаем таски для конкретного тудулиста
    const tasksForTodolists = allTasks[todolistID]; //сдесь все таски для тодолиста на который кликаем.
    const currentTask = tasksForTodolists.find(f => { //файнд находит нужную таску и выпрыгивает
        return f.id === taskID
    });
    if (currentTask) { //find нужна проверка
        const elems: UpdateTask = {
            title: currentTask.title,
            description: currentTask.description,
            status: status,
            priority: currentTask.priority,
            startDate: currentTask.startDate,
            deadline: currentTask.deadline
        }
        //теперь нам нужно в currentTask изменить статус,
        //  const elems:any={...currentTask,status:status} //делаем копию currentTask и говорим замени мне status на status из параметров которые пришли
        dispatch(setAppStatusAC({value: 'loading'}))
        todolistApi.updateTask(todolistID, taskID, elems).then(res => {  //в саночку нужно положить каким то образом elems который ждет апишка
            // -мы посылаем название таски и id тодолиста- put запрос
            // debugger
            dispatch(setAppStatusAC({value: 'failed'}))
            dispatch(chengeCheckBoxStatusAC({todolistID, id: taskID, status}))
        })
    }

}

export const TaskUpdateTitleThunkCreator = (todolistID: string, taskID: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => { //getState функция которая возращает стейт всего приложения
    const state = getState(); //здесь теперь весь стейт чтоб из него можно было достать нужные значения
    const allTasks = state.tasks;//все таски
    //теперь получаем таски для конкретного тудулиста
    const tasksForTodolists = allTasks[todolistID]; //сдесь все таски для тодолиста на который кликаем.
    const currentTask = tasksForTodolists.find(f => { //файнд находит нужную таску и выпрыгивает
        return f.id === taskID
    });
    if (currentTask) { //find нужна проверка
        const elems: UpdateTask = {
            title: title, //из параметров обновится
            description: currentTask.description,
            status: currentTask.status,
            priority: currentTask.priority,
            startDate: currentTask.startDate,
            deadline: currentTask.deadline
        }
        //теперь нам нужно в currentTask изменить статус,
        //  const elems:any={...currentTask,status:status} //делаем копию currentTask и говорим замени мне status на status из параметров которые пришли
        dispatch(setAppStatusAC({value: 'loading'}))
        todolistApi.updateTask(todolistID, taskID, elems).then(res => {  //в саночку нужно положить каким то образом elems который ждет апишка
            dispatch(setAppStatusAC({value: 'failed'}))
            // -мы посылаем название таски и id тодолиста- put запрос
            // debugger
            dispatch(apdateTaskAC({todolistID, taskID, title}))
        })
    }
}

export type addTodolistsACType = ReturnType<typeof addTodolistsAC>







