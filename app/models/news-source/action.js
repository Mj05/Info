export const HANDLE_ERROR = "HANDLE_ERROR";
export const GET_NEWS_SOURCES = "GET_NEWS_SOURCES";
export const SET_NEWS_SOURCES = "SET_NEWS_SOURCES";

export const getNewsSources = (success_callback, error_callback) => ({
    type: GET_NEWS_SOURCES,
    success_callback: success_callback,
    error_callback: error_callback
});