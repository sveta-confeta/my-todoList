import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '06ccb261-83c8-42d1-935e-fdc7e7fd8b48'
    }

});


export const todolistApi = {
    getTodolist() {
        const promise = instance.get<TodoType[]>(`todo-lists`)
        return promise;
    },
    createNewTodolist(titleTodolist: string) {
        return instance.post<CommonResponseType<{
            item: TodoType[],
        }>>('todo-lists', {title: titleTodolist})
    },
    deleteTodolist(todolistId: string) {

        return instance.delete<CommonResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, titleTodolist: string) {
        return instance.put<CommonResponseType<{}>>(`todo-lists/${todolistId}`, {title: titleTodolist})
    },
    getTasks(todolistID: string) {
        const promise = instance.get<TasksResponseType>(`todo-lists/${todolistID}/tasks`)
        return promise;
    },
     deleteTask(todolistID:string,taskId:string){
       return instance.delete<CommonResponseType<{}>>(`todo-lists/${todolistID}/tasks/${taskId}`)
     },
    createTask(todolistID:string ,title:string){ //в каком тодолисте будет создание тасок и с каким названием
        return  instance.post<CommonResponseType<{item:ItemType}>>(`todo-lists/${todolistID}/tasks`,{title:title})

    },
    updateTask(todolistID:string ,taskID:string, elems:UpdateTask ){
        return  instance.put<CommonResponseType<{item:ItemType}>>(`todo-lists/${todolistID}/tasks/${taskID}`,elems )

    },

}


type TodoType = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number,
}
type CommonResponseType<T> = { //общий тип
    resultCode: number,  //закидываем одинаковую часть для всех
    fieldsErrors: string[],
    messages: string[],
    data: T,  //обьявим переменную которая будет меняться
}

// type PostTodolistType = {
//     resultCode: number
//     messages: string[],
//     fieldsErrors: string[],
//     data: {
//         item: TodoType[],
//     }
// }
//
// type DeletePutTodolistType = {
//     resultCode: number,
//     fieldsErrors: string[],
//     messages: string[],
//     data: {},
// }

type TasksResponseType = {
    "items": ItemType[],
    "totalCount": number,
    "error": null,
}
 export type ItemType= { //get tasks
    description: string,
    title: string,
    status:TaskStatuses, //вместо isDone :обращение по номеру
    priority:TaskPriorities,
    startDate: string
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate:string,
}
export enum TaskStatuses { //вместо isDone идет перечисление
    New = 0,//isDone-false-не выполнено
    InProgress = 1,
    Completed = 2, //isDone-true-выполнено
    Draft = 3
}
//сonst a:TaskStatuses=TaskStatuses.InProgress// как пример обращения к свойству
//const a:TaskStatuses=1;

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

 type UpdateTask={  //for put
     title: string,
     description: string,
     completed: boolean,
     status: number,
     priority: number,
     startDate: string,
     deadline: string,

 }

