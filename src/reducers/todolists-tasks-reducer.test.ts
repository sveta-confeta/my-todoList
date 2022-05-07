import {StateType} from "../App";
import { TasksReducer} from "./tasksReducer";
import {
    addTodolistsAC,
    AllTodolistsType,
    removeTodolistAC,
    TodolistReducer
} from "./todolistsReducer";
import {TaskPriorities, TaskStatuses} from "../api/ todolist-api";

test('ids should be equals', () => {
    const startTasksState: StateType = {};
    const startTodolistsState:  Array<AllTodolistsType> = [];

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
        ["todolistId1"]: [
            { id: '1', title: 'Css', description: '', status:TaskStatuses.New, priority:TaskPriorities.Low , startDate: '', deadline: '',  todoListId:"todolistId1",
                order: 0, addedDate: ''},
            {id: '2', title: 'JS',
                description: '', status:TaskStatuses.New, priority:TaskPriorities.Low , startDate: '', deadline: '', todoListId: "todolistId1",
                order: 0, addedDate: ''}
        ],
        ["todolistId2"]: [
            { id: '1', title:  "Milk", description: '', status:TaskStatuses.New, priority:TaskPriorities.Low , startDate: '', deadline: '',  todoListId:"todolistId2",
                order: 0, addedDate: ''},
            {id: '2', title:  "React Book",
                description: '', status:TaskStatuses.New, priority:TaskPriorities.Low , startDate: '', deadline: '', todoListId:"todolistId2",
                order: 0, addedDate: ''}
        ]
    };

    const action = removeTodolistAC("todolistId2");

    const endState =  TasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

