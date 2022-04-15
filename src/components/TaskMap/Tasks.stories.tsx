

import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "./Task";
import {Provider} from "react-redux";
import {store} from "../../redux/redux-store";

import React from "react";
import {ReduxStoreProviderDecorator} from "../../redux/ReduxStoreProviderDecorator";
import {v1} from "uuid";
import {TasksType} from "../../Todolist";

const testTask: any = {
    addedDate: 'addedDate',
    deadline: 'deadline',
    description: 'description',
    id: 'testTaskId',
    order: 1,
    priority: 0,
    startDate: 'startDate',
    status: 0,
    title: 'title',
    todoListId: 'testTodoListId',
    completed: true,
}

const testTaskCompleted = {...testTask, status: 2}


export default {
    title: 'Tasks Component',
    component: Task,
    decorators:[ReduxStoreProviderDecorator]

} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => {
let task:TasksType={id:'11',isDone: true,task:'gggg'}
    return <Task
        taskID={'1'}
        todolistID={'string'}
    />
};
export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    task: testTaskCompleted,
    toDoListID: 'testTodoListId',
};