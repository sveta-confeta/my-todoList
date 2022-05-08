import {StateType} from "../App";
import {v1} from "uuid";
import {
    removeTodolistAC,
    addTodolistsACType,
    todolistsTasksID,
    getTodolistsACType,
} from "./todolistsReducer";
import {ItemType, TaskPriorities, TaskStatuses, todolistApi} from "../api/ todolist-api";
import {Dispatch} from "redux";

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
            // completed: required(boolean
            let newObj: ItemType = {
                id: v1(), title: action.value,
                description: '', status:TaskStatuses.New, priority:TaskPriorities.Low , startDate: '', deadline: '', todoListId: action.todolistID,
                order: 0, addedDate: ''
            };
            return {...state, [action.todolistID]: [newObj, ...state[action.todolistID]]}
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

export const addTaskAC = (todolistID: string, value: string) => {
    return {
        type: 'ADD-TASK',
        todolistID,
        value,
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
    todolistApi.deleteTask(todolistID,taskID).then(res=>{  //удаление тасок
        dispatch(removeTaskAC(todolistID,taskID))
    })
}



