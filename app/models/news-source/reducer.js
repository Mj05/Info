import { HANDLE_ERROR, SET_NEWS_SOURCES } from "./action";

const initialState = {
  news_sources: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS_SOURCES:
      return {
        ...state,
        news_sources: action.result.sources
      }
    case HANDLE_ERROR:
      return state;
    default:
      return state;
  }
};
