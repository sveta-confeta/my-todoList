import {
    StateType, TasksAddThunkCreator, TasksDeleteThunkCreator,
    TasksReducer, TasksThunkCreator, TaskUpdateStatusThunkCreator, TaskUpdateTitleThunkCreator
} from "./tasksReducer";
import {TaskPriorities, TaskStatuses} from "../api/ todolist-api";
import {todolistAddThunkCreator} from "./todolistsReducer";

let startState: StateType;

beforeEach(() => {
    startState = {
        ["todolistId1"]: [
            {
                id: '1',
                title: 'Css',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: '',
                disabledStatus: 'idle'
            },
            {
                id: '2',
                title: 'JS',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId1",
                order: 0,
                addedDate: '',
                disabledStatus: 'idle'
            }
        ],
        ["todolistId2"]: [
            {
                id: '1',
                title: "Milk",
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 0,
                addedDate: '',
                disabledStatus: 'idle'
            },
            {
                id: '2',
                title: "React Book",
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: "todolistId2",
                order: 0,
                addedDate: '',
                disabledStatus: 'idle'
            }
        ]
    };
})

test("REMOVE-TASK", () => {

    const endState = TasksReducer(startState,TasksDeleteThunkCreator.fulfilled({todolistID: "todolistId2", taskID: '2'},'', {todolistID: "todolistId2", taskID: '2'}))

    expect(endState["todolistId2"].length).toBe(1);
    expect(endState["todolistId1"].length).toBe(2);
    expect(endState["todolistId1"][0].title).toBe('Css');
    expect(endState["todolistId2"].every(t => t.id !== '2')).toBeTruthy(); //это метод как фильтр,мап-пробегается по каждому элементу
    //массива и должен вернуть все id кроме той, что мы удалили.и проверка что каждый элемент не равен id 2
});
test('ADD-TASK', () => {


    let task:any = startState["todolistId1"][0];

    const endState = TasksReducer(startState, TasksAddThunkCreator.fulfilled(task,"",{todolistID:task.todoListId,title:task.title}));

    expect(endState["todolistId1"][0].title).toBe('Css');
});

test('CHENGE-STATUS-CHECKBOX', () => {

    const subject={taskID: '1', status: TaskStatuses.New, todolistID: "todolistId1"}


    const endState = TasksReducer(startState, TaskUpdateStatusThunkCreator.fulfilled(subject,'',subject))

    expect(endState["todolistId1"][0].status).toBe(TaskStatuses.New);
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test('UPDATE-TASK', () => {
    let title = 'ggggg';
    const subject={ taskId: '2',model: {title},todolistId: "todolistId1"}
    const endState = TasksReducer(startState, TaskUpdateTitleThunkCreator.fulfilled(subject, "", subject))

    expect(endState["todolistId2"][0].title).toBe("Milk");
    expect(endState["todolistId1"][1].title).toBe('ggggg');

});

test('ADD-TODOLIST', () => {

    let item = {
        "id": '3',
        "title": 'REACT',
        "addedDate": '',
        "order": 4,
    }
    const endState = TasksReducer(startState, todolistAddThunkCreator.fulfilled({item},'',item.title));


    const keys = Object.keys(endState);//возращает массив в виде строковых ключей передаваемого обьекта
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2"); //записываем в переменную ключ который не равняется ни одному из тодолистов
    if (!newKey) { //если не нашелся такой ключ то выдать ошибку
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);//в массиве кеу должно теперь быть 3 строковых ключа

    expect(endState[newKey]).toEqual([]); //если новый ключ нашелся то он должен быть равен пустому массиву

});
//теперь вместо AC явного он сидит в TasksThunkCreator.fulfilled
test('get tasks for api', () => {

//   const action=getTasksAC({tasks:startState["todolistId1"],todolistID:"todolistId1"});
    const action = TasksThunkCreator.fulfilled({
        tasks: startState["todolistId1"],
        todolistID: "todolistId1"
    }, '', "todolistId1");
    const endState = TasksReducer({"todolistId1": [], "todolistId2": []}, action)
    expect(endState["todolistId1"].length).toBe(2);// в тодолисте с таким ключом сидит 2 таски
    expect(endState["todolistId2"].length).toBe(0);// в тодолисте с таким ключом сидит 2 таски
});