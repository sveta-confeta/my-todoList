import {StateType} from "../App";
import {v1} from "uuid";
import {
    removeTodolistAC,
    addTodolistsACType,
    todolistsTasksID,
    getTodolistsACType,
} from "./todolistsReducer";
import {ItemType, TaskPriorities, TaskStatuses, todolistApi, UpdateTask} from "../api/ todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../redux/redux-store";

type ActionType =
    removeTaskACType
    | addTaskACType
    | chengeCheckBoxStatusACType
    | apdateTaskACType
    | addTodolistsACType
    | removeTodolistACType
    | getTodolistsACType
    | getTasksACType;

type removeTaskACType = ReturnType<typeof removeTaskAC>;
type addTaskACType = ReturnType<typeof addTaskAC>;
type chengeCheckBoxStatusACType = ReturnType<typeof chengeCheckBoxStatusAC>
type apdateTaskACType = ReturnType<typeof apdateTaskAC>
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type getTasksACType = ReturnType<typeof getTasksAC>


const initialState: StateType = {
    [todolistsTasksID.todolistID_1]: [
        // {id: v1(), title: "название1 из инпут", isDone: false},
        // {id: v1(), title: "название2 из инпут", isDone: true},
        // {id: v1(), title: "название3 из инпут", isDone: true},
    ],
    [todolistsTasksID.todolistID_2]: [
        // {id: v1(), title: "название1 из инпут", isDone: false},
        // {id: v1(), title: "название2 из инпут", isDone: true},
        // {id: v1(), title: "название3 из инпут", isDone: true},
    ]
};

export const TasksReducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        }
        case 'ADD-TASK': { //это добавить одну таску
            // let newObj: ItemType = {
            //     id: v1(), title: action.value,
            //     description: '', status:TaskStatuses.New, priority:TaskPriorities.Low , startDate: '', deadline: '', todoListId: action.todolistID,
            //     order: 0, addedDate: ''
            // };
            return {...state, [action.item.todoListId]: [ action.item,...state[action.item.todoListId]]}
        }
        case 'CHENGE-STATUS-CHECKBOX': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(m => m.id === action.id ? {
                    ...m,
                    status: action.status
                } : m)
            }
        }
        case  'APDATE-TASK': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }
        case  'ADD-TODOLIST': {
            // let newTodolist = {id: action.newTodolistID, titleTodolist: action.titleTodolist, filter: 'All'};
            // return [newTodolist, ...state];
            return {...state, [action.newTodolistID]: []}
        }
        case "REMOVE-TODOLIST": {
            let newState = {...state}
            delete newState[action.todolistID];
            return newState
        }
        case  'GET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState;
        }
        case 'GET-TASKS':{
            //debugger
            const copyState = {...state}
            copyState[action.todolistID]=action.tasks;
            return copyState;
        }
        default:
            return state;
    }
}


export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: "REMOVE-TASK",
        todolistID,
        taskID,
    } as const
};

export const addTaskAC = (item:ItemType) => {
    return {
        type: 'ADD-TASK',
        item
    } as const
};




export const chengeCheckBoxStatusAC = (todolistID: string, id: string, status:TaskStatuses) => {
    return {
        type: 'CHENGE-STATUS-CHECKBOX',
        todolistID,
        id,
        status,
    } as const
};

export const apdateTaskAC = (todolistID: string, taskID: string, title: string) => {
    return {
        type: 'APDATE-TASK',
        todolistID,
        taskID,
        title,
    } as const
};
export const getTasksAC = (tasks:ItemType[],todolistID: string) => { //c апи пришли все таски
    return {
        type: 'GET-TASKS',
        tasks,
        todolistID
    } as const
};


export const TasksThunkCreator = (todolistID:string) => (dispatch: Dispatch) => {
    todolistApi.getTasks(todolistID).then((res) => { //get запрос за тасками. хочет id тодолиста в котором создавать будем таски
        dispatch(getTasksAC(res.data.items,todolistID))
    })
}

export const TasksDeleteThunkCreator=(todolistID:string,taskID:string)=>(dispatch: Dispatch)=>{
    todolistApi.deleteTask(todolistID,taskID).then(res=>{  //удаление тасок delete запрос
        dispatch(removeTaskAC(todolistID,taskID))
    })
}

export const TasksAddThunkCreator=(todolistID:string,title:string)=>(dispatch: Dispatch)=>{
    todolistApi.createTask(todolistID,title).then(res=>{  //добавление тасок в уже созданные тодолисты
        // -мы посылаем название таски и id тодолиста- post запрос
        dispatch(addTaskAC(res.data.data.item))
    })
}

export const  TaskUpdateStatusThunkCreator=(todolistID:string,taskID:string,status:TaskStatuses)=>(dispatch: Dispatch,getState:()=>AppRootStateType)=> { //getState функция которая возращает стейт всего приложения
    const state = getState(); //здесь теперь весь стейт чтоб из него можно было достать нужные значения
    const allTasks = state.tasks;//все таски
    //debugger
    //теперь получаем таски для конкретного тудулиста
    const tasksForTodolists = allTasks[todolistID]; //сдесь все таски для тодолиста на который кликаем.
    const currentTask = tasksForTodolists.find(f  => { //файнд находит нужную таску и выпрыгивает
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

        todolistApi.updateTask(todolistID, taskID, elems).then(res => {  //в саночку нужно положить каким то образом elems который ждет апишка
            // -мы посылаем название таски и id тодолиста- put запрос
           // debugger
            dispatch(chengeCheckBoxStatusAC(todolistID, taskID, status))
        })
    }

}

