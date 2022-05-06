import {StateType} from "../App";
import {v1} from "uuid";
import {
    removeTodolistAC,
    addTodolistsACType,
    todolistsTasksID,
    ApiTodolistsType, getTodolistsACType
} from "./todolistsReducer";

type ActionType =
    removeTaskACType
    | addTaskACType
    | chengeCheckBoxStatusACType
    | apdateTaskACType
    | addTodolistsACType
    | removeTodolistACType
    | getTodolistsACType;

type removeTaskACType = ReturnType<typeof removeTaskAC>;
type addTaskACType = ReturnType<typeof addTaskAC>;
type chengeCheckBoxStatusACType = ReturnType<typeof chengeCheckBoxStatusAC>
type apdateTaskACType = ReturnType<typeof apdateTaskAC>
type removeTodolistACType = ReturnType<typeof removeTodolistAC>


const initialState: StateType = {
    [todolistsTasksID.todolistID_1]: [
        {id: v1(), task: "название1 из инпут", isDone: false},
        {id: v1(), task: "название2 из инпут", isDone: true},
        {id: v1(), task: "название3 из инпут", isDone: true},
    ],
    [todolistsTasksID.todolistID_2]: [
        {id: v1(), task: "название1 из инпут", isDone: false},
        {id: v1(), task: "название2 из инпут", isDone: true},
        {id: v1(), task: "название3 из инпут", isDone: true},
    ]
};

export const TasksReducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        }
        case 'ADD-TASK': {
            let newObj = {id: v1(), task: action.value, isDone: false};
            return {...state, [action.todolistID]: [newObj, ...state[action.todolistID]]}
        }
        case 'CHENGE-STATUS-CHECKBOX': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(m => m.id === action.id ? {
                    ...m,
                    isDone: action.value
                } : m)
            }
        }
        case  'APDATE-TASK': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    task: action.title
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
                copyState[tl.id]=[];
            })
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

export const chengeCheckBoxStatusAC = (todolistID: string, id: string, value: boolean) => {
    return {
        type: 'CHENGE-STATUS-CHECKBOX',
        todolistID,
        id,
        value,
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



