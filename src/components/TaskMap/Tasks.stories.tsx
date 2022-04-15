

import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "./Task";
import React from "react";
import {ReduxStoreProviderDecorator} from "../../redux/ReduxStoreProviderDecorator";



export default {
    title: 'Tasks Component',
    component: Task,
    decorators:[ReduxStoreProviderDecorator],

} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    todolistID:"todolistId1",
    taskID:'1',
};

export const TaskIsNotDone = Template.bind({});
TaskIsNotDone.args = {
    todolistID:"todolistId1",
    taskID:'2',
};