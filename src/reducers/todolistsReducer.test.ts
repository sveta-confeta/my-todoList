import {v1} from "uuid";
import {
    addTodolistsAC,
    AllTodolistsType,
    filteredTaskAC, getTodolistsAC,
    removeTodolistAC,
    titleTodolistAC,
    TodolistReducer
} from "./todolistsReducer";

let  todolistID_1: string; //вынесем переменные глобально.чтоб их видели тесты
let  todolistID_2: string;
let startState: Array<AllTodolistsType>;
///////// вынесем наши стартовые данные  наверх.они одинаковые для каждого теста
beforeEach(() => {
    todolistID_1 = v1();
    todolistID_2= v1();
    startState = [
        {id:  todolistID_1, title: "What to learn", filter: "All",addedDate:'',order:1},
        {id:  todolistID_2, title: "What to buy", filter: "All",addedDate:'',order:2}
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

    expect(endState[0].title).toBe(newTitle);
    expect(endState[1].title).toBe(   "What to buy");
})

test('ADD-TODOLIST', ()=>{


    let item= {
        "id": '3',
        "title": 'REACT',
        "addedDate": '',
        "order": 4,
    }


    const endState=TodolistReducer(startState,addTodolistsAC(item));

     expect(endState[0].title).toBe('REACT');
    expect(endState.length).toBe(  3);

})
test('GET-TODOLIST', ()=>{ //добавление тодолистов из api
//но когда мы создаем тодолисты -мы должны создать место для тасок в новосозданных тудулистах
    let todolists=startState;//тодолисты возьмем из startState как будто мы из получили из сервера


    const endState=TodolistReducer(startState,getTodolistsAC(todolists));

    expect(endState[0].order).toBe(1);
    expect(endState.length).toBe(  2);

})