import {v1} from "uuid";
import {useReducer} from "react";
import {addTodolistsAC, filteredTaskAC, removeTodolistAC, titleTodolistAC, TodolistReducer} from "./todolistsReducer";
import {todolistType} from "../App";

test('FILTERED-TASK', ()=>{

    const todolistID_1 = v1();
    const todolistID_2 = v1();

    let newFilter='Completed';

    const startState: Array<todolistType>=[
        {id: todolistID_1, titleTodolist: 'What to learn', filter: 'All'},
        {id: todolistID_2, titleTodolist: 'What to read', filter: 'All'},
    ];

    const endState=TodolistReducer(startState,filteredTaskAC(todolistID_1,newFilter));

    expect(endState[0].filter).toBe(newFilter);
    expect(endState[1].filter).toBe( 'All');
})

test('REMOVE-TODOLIST', ()=>{

    const todolistID_1 = v1();
    const todolistID_2 = v1();

    const startState: Array<todolistType>=[
        {id: todolistID_1, titleTodolist: 'What to learn', filter: 'All'},
        {id: todolistID_2, titleTodolist: 'What to read', filter: 'All'},
    ];

    const endState=TodolistReducer(startState,removeTodolistAC(todolistID_1));

    expect(endState.length).toBe(1);
})

test('TITLE-TODOLIST', ()=>{

    const todolistID_1 = v1();
    const todolistID_2 = v1();

    let newTitle='What to watch TV';

    const startState: Array<todolistType>=[
        {id: todolistID_1, titleTodolist: 'What to learn', filter: 'All'},
        {id: todolistID_2, titleTodolist: 'What to read', filter: 'All'},
    ];

    const endState=TodolistReducer(startState,titleTodolistAC(todolistID_1,newTitle));

    expect(endState[0].titleTodolist).toBe(newTitle);
    expect(endState[1].titleTodolist).toBe(  'What to read');
})

test('ADD-TODOLIST', ()=>{

    const todolistID_1 = v1();
    const todolistID_2 = v1();
    let newTitle='What to watch TV';

    const startState: Array<todolistType>=[
        {id: todolistID_1, titleTodolist: 'What to learn', filter: 'All'},
        {id: todolistID_2, titleTodolist: 'What to read', filter: 'All'},
    ];

    const endState=TodolistReducer(startState,addTodolistsAC(newTitle));

    expect(endState[2].titleTodolist).toBe(newTitle);
    expect(endState.length).toBe(  3);

})