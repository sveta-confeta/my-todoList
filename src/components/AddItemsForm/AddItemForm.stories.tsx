import {ComponentMeta, ComponentStory} from "@storybook/react";
import {AddItemForm} from "./AddItemForm";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
    argTypes: {   //то что приходит в компоненту
        addTask:{
            description:'callback'//любое описание
        }
    },
} as ComponentMeta<typeof AddItemForm>;


const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
AddItemFormStory.args = {    //история , сдесь хватит и одной: то что мы хотим увидеть:нашу форму и чтоб при нажатии срабатывал наш колбэк
   addTask: action('addTask')
};