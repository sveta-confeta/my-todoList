

import {ComponentMeta, ComponentStory} from "@storybook/react";
import {TasksMap} from "./TasksMap";

export default {
    title: 'TasksMap Component',
    component: TasksMap,

} as ComponentMeta<typeof TasksMap>;


const Template: ComponentStory<typeof TasksMap> = (args) => <TasksMap {...args} />;

export const TasksMapIsDone = Template.bind({});
//история , сдесь хватит и одной: то что мы хотим увидеть:нашу форму и чтоб при нажатии срабатывал наш колбэк
TasksMapIsDone.args = {

    return <Task
        taskID={'1'}
        todolistID={'string'}
    />
};