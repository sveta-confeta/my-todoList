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

        return instance.delete<CommonResponseType< {}>>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, titleTodolist: string) {
        return instance.put<CommonResponseType< {}>>(`todo-lists/${todolistId}`, {title: titleTodolist})
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
