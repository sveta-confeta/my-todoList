import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import App from "./App";

import {ReduxStoreProviderDecorator} from "../redux/ReduxStoreProviderDecorator";

export default {
    title: 'App Component',
    component: App,
    decorators:[ReduxStoreProviderDecorator]

} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = () =>  <App /> ;

export const AppStory = Template.bind({});
AppStory.args = {

};