import { HANDLE_ERROR, SET_NEWS_SOURCES, UPDATE_NEWS_SOURCE } from "./action";

const initialState = {
  news_sources: [],
  selected_news_source: null,
  is_news_source_selected: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS_SOURCES:
      return {
        ...state,
        news_sources: action.result.sources
      }
    case UPDATE_NEWS_SOURCE:
      return {
        ...state,
        selected_news_source: action.source_id,
        is_news_source_selected: true
      }
    case HANDLE_ERROR:
      return state;
    default:
      return state;
  }
};
