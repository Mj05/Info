import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import NewsSources from "../screens/news-sources/news-sources";
import NewsHeadlines from "../screens/news-headlines/news-headlines";

const StackNavigator = defaultRoute =>
  createStackNavigator(
    {
      NewsSources: {
        screen: NewsSources
      },
      NewsHeadlines: {
        screen: NewsHeadlines
      }
    },
    {
      initialRouteName: defaultRoute
    }
  );

const AppContainer = defaultRoute =>
  createAppContainer(StackNavigator(defaultRoute));

export default AppContainer;
