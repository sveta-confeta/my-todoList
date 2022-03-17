
import {todolistType} from "../App";
type ActionType=filteredTaskACType;
type filteredTaskACType=ReturnType<typeof filteredTaskAC>



export const TodolistReducer = (state:Array<todolistType>,action:ActionType):Array<todolistType> => {
    switch (action.type) {
        case 'FILTERED-TASK':{
            return [state.map(m => m.id===action.todolistID ? {...m,filter:action.value}: m)]
        }
    }}


export const filteredTaskAC=(todolistID: string,value: string)=>{
    return{
        type:'FILTERED-TASK',
        todolistID,
        value,

    } as const
}