import {v1} from "uuid";
import {StateType} from "../App";
import {
    addTaskAC,
    addTodolistsAC,
    apdateTaskAC,
    chengeCheckBoxStatusAC,
    removeTaskAC,
    TasksReducer
} from "./tasksReducer";

test ( "REMOVE-TASK",()=>{

    const todolistID_1 = v1();
    const todolistID_2 = v1();


    const startState:StateType={
        [todolistID_1]: [
            {id: '1', task: "название1 из инпут", isDone: false},
            {id: '2', task: "название2 из инпут", isDone: true},
            {id: '3', task: "название3 из инпут", isDone: true},
        ],
        [todolistID_2]: [
            {id: '4', task: "название1 из инпут", isDone: false},
            {id: '5', task: "название2 из инпут", isDone: true},
            {id: '6', task: "название3 из инпут", isDone: true},
        ]
    };

    const endState=TasksReducer(startState,removeTaskAC(todolistID_2,'4'))

    expect(endState[todolistID_2].length).toBe(2);
    expect(endState[todolistID_1][0].task).toBe( "название1 из инпут");
});
test ( 'ADD-TASK',()=>{

    const todolistID_1 = v1();
    const todolistID_2 = v1();


    const startState:StateType={
        [todolistID_1]: [
            {id: '1', task: "название1 из инпут", isDone: false},
            {id: '2', task: "название2 из инпут", isDone: true},
            {id: '3', task: "название3 из инпут", isDone: true},
        ],
        [todolistID_2]: [
            {id: '4', task: "название1 из инпут", isDone: false},
            {id: '5', task: "название2 из инпут", isDone: true},
            {id: '6', task: "название3 из инпут", isDone: true},
        ]
    };
    let newTitle= "название4 из инпут";

    const endState=TasksReducer(startState,addTaskAC(todolistID_2,newTitle))

    expect(endState[todolistID_2].length).toBe(4);
    expect(endState[todolistID_2][0].task).toBe( "название4 из инпут");
});

test ( 'CHENGE-STATUS-CHECKBOX',()=>{

    const todolistID_1 = v1();
    const todolistID_2 = v1();


    const startState:StateType={
        [todolistID_1]: [
            {id: '1', task: "название1 из инпут", isDone: false},
            {id: '2', task: "название2 из инпут", isDone: true},
            {id: '3', task: "название3 из инпут", isDone: true},
        ],
        [todolistID_2]: [
            {id: '4', task: "название1 из инпут", isDone: false},
            {id: '5', task: "название2 из инпут", isDone: true},
            {id: '6', task: "название3 из инпут", isDone: true},
        ]
    };


    const endState=TasksReducer(startState,chengeCheckBoxStatusAC(todolistID_1,'1',true))

    expect(endState[todolistID_1][0].isDone).toBe(true);
    expect(endState[todolistID_2][0].isDone).toBe( false);
});

test ( 'APDATE-TASK',()=>{

    const todolistID_1 = v1();
    const todolistID_2 = v1();


    const startState:StateType={
        [todolistID_1]: [
            {id: '1', task: "название1 из инпут", isDone: false},
            {id: '2', task: "название2 из инпут", isDone: true},
            {id: '3', task: "название3 из инпут", isDone: true},
        ],
        [todolistID_2]: [
            {id: '4', task: "название1 из инпут", isDone: false},
            {id: '5', task: "название2 из инпут", isDone: true},
            {id: '6', task: "название3 из инпут", isDone: true},
        ]
    };
    let newTitle='ggggg';


    const endState=TasksReducer(startState,apdateTaskAC(todolistID_1,'2',newTitle))

    expect(endState[todolistID_2][0].task).toBe(  "название1 из инпут");
    expect(endState[todolistID_1][1].task).toBe('ggggg');

});
test ( 'ADD-TODOLIST',()=>{

    const todolistID_1 = v1();
    const todolistID_2 = v1();


    const startState:StateType={
        [todolistID_1]: [
            {id: '1', task: "название1 из инпут", isDone: false},
            {id: '2', task: "название2 из инпут", isDone: true},
            {id: '3', task: "название3 из инпут", isDone: true},
        ],
        [todolistID_2]: [
            {id: '4', task: "название1 из инпут", isDone: false},
            {id: '5', task: "название2 из инпут", isDone: true},
            {id: '6', task: "название3 из инпут", isDone: true},
        ]
    };
    let newTitle='newTodolist';


    const endState=TasksReducer(startState,addTodolistsAC(newTitle,));


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);


    // expect(endState[todolistID_1][0].task).toBe(  "название1 из инпут");
    // expect(endState[todolistID_1][1].task).toBe('ggggg');

});