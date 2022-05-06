import {v1} from "uuid";
import {StateType} from "../App";
import {
    addTaskAC,
    apdateTaskAC,
    chengeCheckBoxStatusAC,
    removeTaskAC,
    TasksReducer
} from "./tasksReducer";
import {addTodolistsAC, ApiTodolistsType, getTodolistsAC} from "./todolistsReducer";

let startState:StateType;

beforeEach(()=>{
    startState={
        ['todolistID_1']: [
            {id: '1', task: "название1 из инпут", isDone: false},
            {id: '2', task: "название2 из инпут", isDone: true},
            {id: '3', task: "название3 из инпут", isDone: true},
        ],
        ['todolistID_2']: [
            {id: '4', task: "название1 из инпут", isDone: false},
            {id: '5', task: "название2 из инпут", isDone: true},
            {id: '6', task: "название3 из инпут", isDone: true},
        ]
    };
})

test ( "REMOVE-TASK",()=>{

    const endState=TasksReducer(startState,removeTaskAC('todolistID_2','4'))

    expect(endState['todolistID_2'].length).toBe(2);
    expect(endState['todolistID_1'].length).toBe(3);
    expect(endState['todolistID_1'][0].task).toBe( "название1 из инпут");
    expect(endState['todolistID_2'].every(t=> t.id!=='4')).toBeTruthy(); //это метод как фильтр,мап-пробегается по каждому элементу
    //массива и должен вернуть все id кроме той, что мы удалили.и проверка что каждый элемент не равен id 4
});
test ( 'ADD-TASK',()=>{

    let newTitle= "название4 из инпут";

    const endState=TasksReducer(startState,addTaskAC('todolistID_2',newTitle))

    expect(endState['todolistID_2'].length).toBe(4);
    expect(endState['todolistID_2'][0].task).toBe( "название4 из инпут");
});

test ( 'CHENGE-STATUS-CHECKBOX',()=>{



    const endState=TasksReducer(startState,chengeCheckBoxStatusAC('todolistID_1','1',true))

    expect(endState['todolistID_1'][0].isDone).toBe(true);
    expect(endState['todolistID_2'][0].isDone).toBe( false);
});

test ( 'APDATE-TASK',() => {
    let newTitle='ggggg';
    const endState=TasksReducer(startState,apdateTaskAC('todolistID_1','2',newTitle))

    expect(endState['todolistID_2'][0].task).toBe(  "название1 из инпут");
    expect(endState['todolistID_1'][1].task).toBe('ggggg');

});
test ( 'ADD-TODOLIST',()=>{


    let newTitle='newTodolist';


    const endState=TasksReducer(startState,addTodolistsAC(newTitle));


    const keys = Object.keys(endState);//возращает массив в виде строковых ключей передаваемого обьекта
    const newKey = keys.find(k => k != 'todolistID_1' && k != 'todolistID_2'); //записываем в переменную ключ который не равняется ни одному из тодолистов
    if (!newKey) { //если не нашелся такой ключ то выдать ошибку
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);//в массиве кеу должно теперь быть 3 строковых ключа

    expect(endState[newKey]).toEqual([]); //если новый ключ нашелся то он должен быть равен пустому массиву

});

test ( 'GET-TODOLIST i tasks',()=>{  //получили с "сервера" тодолисты и теперь нам нужно добавть место для тасок
    //{[id]:[],[id]:[],},те добавить пустые массивы


    let action=getTodolistsAC([
        {id: '1', title: "What to learn",addedDate:'',order:1},
        {id: '2', title: "What to buy",addedDate:'',order:2},
    ]);

    const endState=TasksReducer({},action);


    const keys = Object.keys(endState);//возращает массив в виде строковых ключей передаваемого обьекта


    expect(keys.length).toBe(2);//в массиве кеу должно теперь быть 3 строковых ключа

    expect(endState['1']).toEqual([]);
    expect(endState['2']).toEqual([]);

});