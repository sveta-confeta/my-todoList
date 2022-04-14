

import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "./Task";
import {Provider} from "react-redux";
import {store} from "../../redux/redux-store";

import React from "react";


export default {
    title: 'Tasks Component',
    component: Task,

} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Provider  store={store}> <Task {...args} />  </Provider> ;

export const TaskIsDone = Template.bind({});
//история , сдесь хватит и одной: то что мы хотим увидеть:нашу форму и чтоб при нажатии срабатывал наш колбэк
TaskIsDone.args = {
};