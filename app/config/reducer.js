import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import NewsSource from '../models/news-source/reducer';
import NewsHeadline from "../models/news-headline/reducer";

const persistConfig = {
  key: "root",
  storage
};

const reducers = {
  NewsSource,
  NewsHeadline
};

export default persistCombineReducers(persistConfig, reducers);
