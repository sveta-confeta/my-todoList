import {StateType} from "../App";
import {addTaskAC, apdateTaskAC, chengeCheckBoxStatusAC, getTasksAC, removeTaskAC, TasksReducer} from "./tasksReducer";
import {addTodolistsAC, getTodolistsAC} from "./todolistsReducer";
import {TaskPriorities, TaskStatuses} from "../api/ todolist-api";

let startState:StateType;

beforeEach(()=>{
    startState={
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
})

test ( "REMOVE-TASK",()=>{

    const endState=TasksReducer(startState,removeTaskAC('todolistID_2','4'))

    expect(endState['todolistID_2'].length).toBe(2);
    expect(endState['todolistID_1'].length).toBe(3);
    expect(endState['todolistID_1'][0].title).toBe( "название1 из инпут");
    expect(endState['todolistID_2'].every(t=> t.id!=='4')).toBeTruthy(); //это метод как фильтр,мап-пробегается по каждому элементу
    //массива и должен вернуть все id кроме той, что мы удалили.и проверка что каждый элемент не равен id 4
});
test ( 'ADD-TASK',()=>{


    let task=startState["todolistId1"][0];

    const endState=TasksReducer(startState,addTaskAC(task));

    expect(endState["todolistId1"][0].title).toBe( 'Css');
});

test ( 'CHENGE-STATUS-CHECKBOX',()=>{



    const endState=TasksReducer(startState,chengeCheckBoxStatusAC('todolistID_1','1',TaskStatuses.New))

    expect(endState['todolistID_1'][0].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistID_2'][0].status).toBe( TaskStatuses.New);
});

test ( 'APDATE-TASK',() => {
    let newTitle='ggggg';
    const endState=TasksReducer(startState,apdateTaskAC('todolistID_1','2',newTitle))

    expect(endState['todolistID_2'][0].title).toBe(  "название1 из инпут");
    expect(endState['todolistID_1'][1].title).toBe('ggggg');

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
test ( 'get tasks for api',()=>{


  const action=getTasksAC(startState["todolistId1"],"todolistId1");

    const endState=TasksReducer({"todolistId1":[],"todolistId2":[]},action)




    expect(endState["todolistId1"].length).toBe(2);// в тодолисте с таким ключом сидит 2 таски
    expect(endState["todolistId2"].length).toBe(0);// в тодолисте с таким ключом сидит 2 таски



});