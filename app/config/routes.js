import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import NewsSources from "../screens/news-sources/news-sources";

const StackNavigator = defaultRoute =>
  createStackNavigator(
    {
      NewsSources: {
        screen: NewsSources
      }
    },
    {
      initialRouteName: defaultRoute
    }
  );

const AppContainer = defaultRoute =>
  createAppContainer(StackNavigator(defaultRoute));

export default AppContainer;
