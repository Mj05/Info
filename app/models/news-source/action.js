export const HANDLE_ERROR = "HANDLE_ERROR";
export const GET_NEWS_SOURCES = "GET_NEWS_SOURCES";
export const SET_NEWS_SOURCES = "SET_NEWS_SOURCES";
export const UPDATE_NEWS_SOURCE = "UPDATE_NEWS_SOURCE";

export const getNewsSources = (success_callback, error_callback) => ({
    type: GET_NEWS_SOURCES,
    success_callback: success_callback,
    error_callback: error_callback
});

export const updateNewsSource = (source_id) => ({
    type: UPDATE_NEWS_SOURCE,
    source_id: source_id
});