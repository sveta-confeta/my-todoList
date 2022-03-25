import {StateType, todolistType} from "../App";
import {addTodolistsAC, TasksReducer} from "./tasksReducer";
import {removeTodolistAC, TodolistReducer} from "./todolistsReducer";

test('ids should be equals', () => {
    const startTasksState: StateType = {};
    const startTodolistsState: Array<todolistType> = [];

    const action = addTodolistsAC("new todolist");

    const endTasksState =  TasksReducer(startTasksState, action) //в результате будет создана 'ggg':[]
    const endTodolistsState = TodolistReducer(startTodolistsState, action)//в результате будет создана {id:action.newTodolistID, titleTodolist: action.titleTodolist, filter: 'All'}

    const keys = Object.keys(endTasksState); // массив со строковым айди тудулиста
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.newTodolistID);
    expect(idFromTodolists).toBe(action.newTodolistID);
    expect(idFromTodolists).toBe(idFromTasks);
});




test('property with todolistId should be deleted', () => {
    const startState: StateType = {
        "todolistId1": [
            { id: "1",  task: "CSS", isDone: false },
            { id: "2",  task: "JS", isDone: true },
            { id: "3",  task: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1",  task: "bread", isDone: false },
            { id: "2",  task: "milk", isDone: true },
            { id: "3",  task: "tea", isDone: false }
        ]
    };

    const action = removeTodolistAC("todolistId2");

    const endState =  TasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

