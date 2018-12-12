export const HANDLE_ERROR = "HANDLE_ERROR";
export const GET_NEWS_HEADLINES = "GET_NEWS_HEADLINES";
export const SET_NEWS_HEADLINES = "SET_NEWS_HEADLINES";

export const getNewsHeadlines = (source_id, success_callback, error_callback) => ({
    type: GET_NEWS_HEADLINES,
    source_id: source_id,
    success_callback: success_callback,
    error_callback: error_callback
});