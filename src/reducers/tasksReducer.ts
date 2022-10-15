import {todolistAddThunkCreator, todolistsTasksID} from "./todolistsReducer";
import {TaskPriorities, TaskStatuses, todolistApi, UpdateTask} from "../api/ todolist-api";
import {AppRootStateType} from "../redux/redux-store";
import {errorAppMessageAC, RequestStatusType, setAppStatusAC} from "./appReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerNetworkError} from "../utils/error-util";

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
export const TasksDeleteThunkCreator = createAsyncThunk('task/TasksDeleteThunkCreator', (param: { todolistID: string, taskID: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({value: 'loading'}))
    thunkAPI.dispatch(disabledStatusTaskAC({
        todolistID: param.todolistID,
        taskID: param.taskID,
        disabledStatus: 'loading'
    }));
    return todolistApi.deleteTask(param.todolistID, param.taskID).then(res => {  //удаление тасок delete запрос
        thunkAPI.dispatch(setAppStatusAC({value: 'failed'}))
        thunkAPI.dispatch(disabledStatusTaskAC({
            todolistID: param.todolistID,
            taskID: param.taskID,
            disabledStatus: 'failed'
        }))
        return {todolistID: param.todolistID, taskID: param.taskID}
    })
})
export const TasksAddThunkCreator = createAsyncThunk('task/addTask', async (param: { todolistID: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({value: 'loading'}))
    try {
        const res = await todolistApi.createTask(param.todolistID, param.title);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({value: 'failed'}))
            return {item: res.data.data.item} // отправляем данные в атоматически созданный AC в extrareducer

        } else {
            thunkAPI.dispatch(setAppStatusAC({value: 'failed'})) //опять же убираем крутилку
            thunkAPI.dispatch(errorAppMessageAC({value: res.data.messages[0]})); //достаем из массива сообщение об ошибке
            return thunkAPI.rejectWithValue({})
        }
    } catch (err: any) {
        thunkAPI.dispatch(setAppStatusAC({value: 'failed'}))//крутилка отключилась
        thunkAPI.dispatch(errorAppMessageAC({value: err.message})) //текст ошибки диспатчим в стейт
        return thunkAPI.rejectWithValue({})
    }
})

export const TaskUpdateTitleThunkCreator = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, model: UpdateTask, todolistId: string },
                                                                                       thunkAPI) => {
    debugger
    const state = thunkAPI.getState() as AppRootStateType
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue('task not found in the state')
    }

    const apiModel: UpdateTask = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: param.model.title,
        status: task.status,
    }
    thunkAPI.dispatch(setAppStatusAC({value: 'loading'}))
    const res = await todolistApi.updateTask(param.todolistId, param.taskId, apiModel)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({value: 'failed'})) //опять же убираем крутилку
            return param
        } else {
            thunkAPI.dispatch(setAppStatusAC({value: 'failed'})) //опять же убираем крутилку
            thunkAPI.dispatch(errorAppMessageAC({value: res.data.messages[0]})); //достаем из массива сообщение об ошибке
            return thunkAPI.rejectWithValue({})
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

export const TaskUpdateStatusThunkCreator = createAsyncThunk('task/TasksUpdateStatus', async (param: { taskID: string, status: TaskStatuses, todolistID: string }, //getState функция которая возращает стейт всего приложения
                                                                                              thunkAPI) => {
    //здесь теперь весь стейт чтоб из него можно было достать нужные значения
    const state = thunkAPI.getState() as AppRootStateType
    const allTasks = state.tasks;//все таски
    //теперь получаем таски для конкретного тудулиста
    const tasksForTodolists = allTasks[param.todolistID]; //сдесь все таски для тодолиста на который кликаем.
    const currentTask = tasksForTodolists.find(f => { //файнд находит нужную таску и выпрыгивает
        return f.id === param.taskID
    });
    if (!currentTask) {
        return thunkAPI.rejectWithValue('task not found in the state')
    }
        const elems: UpdateTask = {
            title: currentTask.title,
            description: currentTask.description,
            status: param.status,
            priority: currentTask.priority,
            startDate: currentTask.startDate,
            deadline: currentTask.deadline
        }

        //теперь нам нужно в currentTask изменить статус,
        //  const elems:any={...currentTask,status:status} //делаем копию currentTask и говорим замени мне status на status из параметров которые пришли
        thunkAPI.dispatch(setAppStatusAC({value: 'loading'}))
        const res = await todolistApi.updateTask(param.todolistID, param.taskID, elems)
        try {
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({value: 'failed'}))
                return param
            } else {
                thunkAPI.dispatch(setAppStatusAC({value: 'failed'})) //опять же убираем крутилку
                thunkAPI.dispatch(errorAppMessageAC({value: res.data.messages[0]})); //достаем из массива сообщение об ошибке
                return thunkAPI.rejectWithValue({})
            }
        } catch (error: any) {
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } )



export const asyncActions = {
    TasksDeleteThunkCreator,
    TasksAddThunkCreator,
    TaskUpdateTitleThunkCreator,
    TaskUpdateStatusThunkCreator,
}


const slice = createSlice({
    name: 'task',
    initialState: initialState,
    reducers: {
        // логику удаления таски переносим в экстраредьюсскр
        //    имутабельное удаление:
        // state[action.payload.todolistID] = state[action.payload.todolistID].filter(t => t.id !== action.payload.taskID)

        disabledStatusTaskAC(state, action: PayloadAction<{ todolistID: string, taskID: string, disabledStatus: RequestStatusType }>) {
            state[action.payload.todolistID] = state[action.payload.todolistID].map(m => m.id === action.payload.taskID ? {
                ...m, disabledStatus: action.payload.disabledStatus
            } : m)
        },
    },
    extraReducers: (builder) => {
        builder.addCase( todolistAddThunkCreator.fulfilled,(state, action) => {
            state[action.payload.item.id] = [] //без этого кейса все работает)
        });
        builder.addCase(TasksThunkCreator.fulfilled, (state, action) => {
            state[action.payload.todolistID] = action.payload.tasks;
        });
        builder.addCase(TasksDeleteThunkCreator.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistID];
            const index = tasks.findIndex(t => t.id === action.payload.taskID);
            if (index > -1) {
                tasks.splice(index, 1);
            }
        });
        builder.addCase(TasksAddThunkCreator.fulfilled, (state, action) => {
            state[action.payload.item.todoListId].unshift(action.payload.item);
            // state[action.payload.item.todoListId] = [action.payload.item, ...state[action.payload.item.todoListId]]
        })
        builder.addCase(TaskUpdateTitleThunkCreator.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
        builder.addCase(TaskUpdateStatusThunkCreator.fulfilled, (state, action) => {
            state[action.payload.todolistID] = state[action.payload.todolistID].map(m => m.id === action.payload.taskID ? {
                ...m,
                status: action.payload.status
            } : m)

        })
    },


})


export const TasksReducer = slice.reducer;
export const {
    disabledStatusTaskAC,
} = slice.actions;


// export const TaskUpdateStatusThunkCreator = (todolistID: string, taskID: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => { //getState функция которая возращает стейт всего приложения
//     const state = getState(); //здесь теперь весь стейт чтоб из него можно было достать нужные значения
//     const allTasks = state.tasks;//все таски
//     //debugger
//     //теперь получаем таски для конкретного тудулиста
//     const tasksForTodolists = allTasks[todolistID]; //сдесь все таски для тодолиста на который кликаем.
//     const currentTask = tasksForTodolists.find(f => { //файнд находит нужную таску и выпрыгивает
//         return f.id === taskID
//     });
//     if (currentTask) { //find нужна проверка
//         const elems: UpdateTask = {
//             title: currentTask.title,
//             description: currentTask.description,
//             status: status,
//             priority: currentTask.priority,
//             startDate: currentTask.startDate,
//             deadline: currentTask.deadline
//         }
//         //теперь нам нужно в currentTask изменить статус,
//         //  const elems:any={...currentTask,status:status} //делаем копию currentTask и говорим замени мне status на status из параметров которые пришли
//         dispatch(setAppStatusAC({value: 'loading'}))
//         todolistApi.updateTask(todolistID, taskID, elems).then(res => {  //в саночку нужно положить каким то образом elems который ждет апишка
//             // -мы посылаем название таски и id тодолиста- put запрос
//             // debugger
//             dispatch(setAppStatusAC({value: 'failed'}))
//             dispatch(chengeCheckBoxStatusAC({todolistID, id: taskID, status}))
//         })
//     }
//
// }
// была такая санка до перехода на тулкит
// export const TaskUpdateTitleThunkCreator = (todolistID: string, taskID: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => { //getState функция которая возращает стейт всего приложения
//     const state = getState(); //здесь теперь весь стейт чтоб из него можно было достать нужные значения
//     const allTasks = state.tasks;//все таски
//     //теперь получаем таски для конкретного тудулиста
//     const tasksForTodolists = allTasks[todolistID]; //сдесь все таски для тодолиста на который кликаем.
//     const currentTask = tasksForTodolists.find(f => { //файнд находит нужную таску и выпрыгивает
//         return f.id === taskID
//     });
//     if (currentTask) { //find нужна проверка
//         const elems: UpdateTask = {
//             title: title, //из параметров обновится
//             description: currentTask.description,
//             status: currentTask.status,
//             priority: currentTask.priority,
//             startDate: currentTask.startDate,
//             deadline: currentTask.deadline
//         }
//         //теперь нам нужно в currentTask изменить статус,
//         //  const elems:any={...currentTask,status:status} //делаем копию currentTask и говорим замени мне status на status из параметров которые пришли
//         dispatch(setAppStatusAC({value: 'loading'}))
//         todolistApi.updateTask(todolistID, taskID, elems).then(res => {  //в саночку нужно положить каким то образом elems который ждет апишка
//             dispatch(setAppStatusAC({value: 'failed'}))
//             // -мы посылаем название таски и id тодолиста- put запрос
//             // debugger
//             dispatch(apdateTaskAC({todolistID, taskID, title}))
//         })
//     }
// }








