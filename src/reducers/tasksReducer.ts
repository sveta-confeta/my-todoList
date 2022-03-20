import {StateType} from "../App";
import {v1} from "uuid";

 type ActionType = removeTaskACType | addTaskACType | chengeCheckBoxStatusACType|apdateTaskACType|addTodolistsACType;

type removeTaskACType=ReturnType<typeof removeTaskAC>;
type addTaskACType=ReturnType<typeof addTaskAC>;
type chengeCheckBoxStatusACType=ReturnType<typeof chengeCheckBoxStatusAC>
type apdateTaskACType=ReturnType<typeof apdateTaskAC>
type addTodolistsACType=ReturnType<typeof addTodolistsAC>

export const TasksReducer = (state:StateType, action:ActionType):StateType=> {
    switch (action.type) {
        case "REMOVE-TASK":{
            return {...state,[action.todolistID]:state[action.todolistID].filter(t => t.id !== action.taskID)}
        }
        case 'ADD-TASK':{
            let newObj={id: v1(), task: action.value, isDone: false};
            return {...state,[action.todolistID]:[newObj, ...state[action.todolistID]]}
        }
        case 'CHENGE-STATUS-CHECKBOX':{
           return {...state,[action.todolistID]:state[action.todolistID].map(m=>m.id===action.id ? {...m,isDone:action.value}: m)}
        }
        case  'APDATE-TASK':{
            return {...state,[action.todolistID]:state[action.todolistID].map(t => t.id === action.taskID ? {...t, task: action.title} : t)}
        }
        case  'ADD-TODOLIST': {
            // let newTodolist = {id: action.newTodolistID, titleTodolist: action.titleTodolist, filter: 'All'};
            // return [newTodolist, ...state];
            return  {...state, [action.newTodolistID]: []}
        }
        default:
            return state;
    }
}


 export const removeTaskAC=(todolistID:string,taskID:string)=>{
    return {
        type:"REMOVE-TASK",
        todolistID,
        taskID,
    } as const
 };

 export const addTaskAC=( todolistID: string,value: string)=>{
    return{
        type:'ADD-TASK',
        todolistID,
        value,
    } as const
 };

 export const chengeCheckBoxStatusAC=(todolistID: string,id: string, value: boolean)=>{
     return{
         type:'CHENGE-STATUS-CHECKBOX',
         todolistID,
         id,
         value,
     } as const
 };

 export const apdateTaskAC=(todolistID: string, taskID: string, title: string)=>{
     return {
         type: 'APDATE-TASK',
         todolistID,
         taskID,
         title,
     } as const
 };
export const addTodolistsAC = (titleTodolist: string) => {
    return {
        type: 'ADD-TODOLIST',
        titleTodolist,
        newTodolistID:v1(),
    } as const
};

