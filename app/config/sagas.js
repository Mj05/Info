import { takeEvery, call, put } from 'redux-saga/effects';
GLOBAL_CONFIG = require('./global');  // import app's global configuations
GLOBAL_LANG = require('./lang');   // import global language for localization
import { GET_NEWS_SOURCES, SET_NEWS_SOURCES } from '../models/news-source/action';

/**
 * ==========================================================================================================================
 * Functions to get server response
 * ==========================================================================================================================
 */

function getNewsSources() {
	return fetch(GLOBAL_CONFIG.API_URL, {
		method: 'GET',
		headers: new Headers({
			'Content-Type': 'application/json' // specifying the Content-Type
		})
	});
}

/**
 * ==========================================================================================================================
 * Functions to handle reducers actions and iniitiate api calls
 * ==========================================================================================================================
 */

const initiateRequestToGetNewsSources = function*(action) {
	try {
		const response = yield call(getNewsSources);
		const result = yield response.json();

		if (result.status == 'ok') {
			yield put({
				type: SET_NEWS_SOURCES,
				result
			});
			yield call(action.success_callback);
		} else {
			return yield call(action.error_callback, result.error.message);
		}
	} catch (e) {
		return yield call(action.error_callback, GLOBAL_LANG_COMMON_ERR_MESSAGE);
	}
};

const rootSaga = function*() {
	yield takeEvery(GET_NEWS_SOURCES, initiateRequestToGetNewsSources);
};

export default rootSaga;
