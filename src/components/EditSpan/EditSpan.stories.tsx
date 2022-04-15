import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {action} from "@storybook/addon-actions";
import EditSpan from "./EditSpan";


export default {
    title: 'EditSpan Component',
    component: EditSpan,
argTypes:{
        value:{
            defaultValue:'whrite me',
            description :'string',
        },
    onChange:{
            description:'change value span'
    }
}
} as ComponentMeta<typeof EditSpan>;


const Template: ComponentStory<typeof EditSpan> = (args) => <EditSpan {...args} />;

export const EditSpanStory = Template.bind({});
EditSpanStory.args = {    //история , сдесь хватит и одной: то что мы хотим увидеть:нашу форму и чтоб при нажатии срабатывал наш колбэк
    title:'whrite me',
    apdateTask:action('apdateTask')
};