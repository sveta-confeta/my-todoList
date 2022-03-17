import {StateType} from "../App";
import {v1} from "uuid";

 type ActionType = removeTaskACType | addTaskACType | chengeCheckBoxStatusACType|apdateTaskACType;

type removeTaskACType=ReturnType<typeof removeTaskAC>;
type addTaskACType=ReturnType<typeof addTaskAC>;
type chengeCheckBoxStatusACType=ReturnType<typeof chengeCheckBoxStatusAC>
type apdateTaskACType=ReturnType<typeof apdateTaskAC>

export const TasksReducer = (state:StateType, action:ActionType):StateType=> {
    switch (action.type) {
        case "REMOVE-TASK":{
            return {...state,[action.todolistID]:state[action.todolistID].filter(t => t.id !== action.taskID)}
        }
        case 'ADD-TASK':{
            let newObj={id: v1(), task: action.value, isDone: false};
            return {...state,[action.todolistID]:[newObj, ...state[action.todolistID]]}
        }
        case 'CHENGE-STATUS-CHECKBOX':
           return {...state,[action.todolistID]:state[action.todolistID].map(m=>m.id===action.id ? {...m,isDone:action.value}: m)}

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

