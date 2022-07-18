import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import App from "./App";


import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "../redux/ReduxStoreProviderDecorator";

export default {
    title: 'App Component',
    component: App,
    decorators:[ReduxStoreProviderDecorator,BrowserRouterDecorator]

}


const Template: ComponentStory<typeof App> = () =>  <App /> ;

export const AppStory = Template.bind({});
AppStory.args = {

};