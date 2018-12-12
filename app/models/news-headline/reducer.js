import { HANDLE_ERROR, SET_NEWS_HEADLINES } from "./action";

const initialState = {
    news_headlines: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS_HEADLINES:
      return {
          ...state,
          news_headlines: action.result.articles
      }
    case HANDLE_ERROR:
      return state;
    default:
      return state;
  }
};
