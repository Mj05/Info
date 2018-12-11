import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import NewsSource from '../models/news-source/reducer';

const persistConfig = {
  key: "root",
  storage
};

const reducers = {
  NewsSource
};

export default persistCombineReducers(persistConfig, reducers);
