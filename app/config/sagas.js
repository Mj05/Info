import { takeEvery, call, put } from 'redux-saga/effects';
GLOBAL_CONFIG = require('./global'); // import app's global configuations
GLOBAL_LANG = require('./lang'); // import global language for localization
import { GET_NEWS_SOURCES, SET_NEWS_SOURCES } from '../models/news-source/action';
import { GET_NEWS_HEADLINES, SET_NEWS_HEADLINES } from '../models/news-headline/action';
import { NetInfo, Alert } from 'react-native';

// Check Internet Connectivity
function* checkConnectivity() {
	let isConnected = yield call(NetInfo.isConnected.fetch);
	if (!isConnected) {
		Alert.alert(
			'No Internet',
			'Please check your Intenet Connection!',
			[
				{
					text: 'OK'
				}
			],
			{ cancelable: false }
		);
	}
	return isConnected;
}

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

function getNewsHeadlines(news_source) {
	let API_URL =
		'https://newsapi.org/v2/top-headlines?sources=' + news_source + '&apiKey=a80f5fc144c741959e0925a08bea413b';
	return fetch(API_URL, {
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
		let connection = yield call(checkConnectivity);
		if (connection) {
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
		} else {
			return yield call(action.error_callback, GLOBAL_LANG.NETWORK_ERROR);
		}
	} catch (e) {
		return yield call(action.error_callback, GLOBAL_LANG.COMMON_ERR_MESSAGE);
	}
};

const initaiteRequestToGetNewsHeadlines = function*(action) {
	try {
		let connection = yield call(checkConnectivity);
		if (connection) {
			let source = action.source_id;
			const response = yield call(getNewsHeadlines, source);
			const result = yield response.json();

			if (result.status == 'ok') {
				yield put({
					type: SET_NEWS_HEADLINES,
					result
				});
				yield call(action.success_callback);
			} else {
				return yield call(action.error_callback, result.error.message);
			}
		} else {
			return yield call(action.error_callback, GLOBAL_LANG.NETWORK_ERROR);
		}
	} catch (e) {
		return yield call(action.error_callback, GLOBAL_LANG.COMMON_ERR_MESSAGE);
	}
};

const rootSaga = function*() {
	yield takeEvery(GET_NEWS_SOURCES, initiateRequestToGetNewsSources);
	yield takeEvery(GET_NEWS_HEADLINES, initaiteRequestToGetNewsHeadlines);
};

export default rootSaga;
