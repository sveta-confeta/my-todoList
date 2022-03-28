import {v1} from "uuid";
import {useReducer} from "react";
import {addTodolistsAC, filteredTaskAC, removeTodolistAC, titleTodolistAC, TodolistReducer} from "./todolistsReducer";
import {todolistType} from "../App";

let  todolistID_1: string; //вынесем переменные глобально.чтоб их видели тесты
let  todolistID_2: string;
let startState: Array<todolistType>;
///////// вынесем наши стартовые данные  наверх.они одинаковые для каждого теста
beforeEach(() => {
    todolistID_1 = v1();
    todolistID_2= v1();
    startState = [
        {id:  todolistID_1, titleTodolist: "What to learn", filter: "All"},
        {id:  todolistID_2, titleTodolist: "What to buy", filter: "All"}
    ]
});

test('FILTERED-TASK', ()=>{

    let newFilter='Completed';

    const endState=TodolistReducer(startState,filteredTaskAC(todolistID_1,newFilter));

    expect(endState[0].filter).toBe(newFilter);
    expect(endState[1].filter).toBe( 'All');
})

test('REMOVE-TODOLIST', ()=>{

    const endState=TodolistReducer(startState,removeTodolistAC(todolistID_1));

    expect(endState.length).toBe(1);
})

test('TITLE-TODOLIST', ()=>{

    let newTitle='What to watch TV';

    const endState=TodolistReducer(startState,titleTodolistAC(todolistID_1,newTitle));

    expect(endState[0].titleTodolist).toBe(newTitle);
    expect(endState[1].titleTodolist).toBe(  'What to read');
})

test('ADD-TODOLIST', ()=>{

    let newTitle='What to watch TV';


    const endState=TodolistReducer(startState,addTodolistsAC(newTitle));

    expect(endState[2].titleTodolist).toBe(newTitle);
    expect(endState.length).toBe(  3);

})