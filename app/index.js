import React, { Component } from 'react';
import { Provider } from 'react-redux';
import reduxStore from './config/store';
import { PersistGate } from 'redux-persist/integration/react';
import Splash from '../app/screens/splash/splash';
import Navigator from '../app/config/routes';
import { connect } from 'react-redux';

const NewsSources = Navigator('NewsSources');
const NewsHeadlines = Navigator('NewsHeadlines');

const Route = ({ NewsSource }) => {
	return NewsSource.is_news_source_selected ? <NewsHeadlines /> : <NewsSources />;
};

const mapStateToProps = (state) => {
	return {
		NewsSource: state.NewsSource
	};
};

const AppRoute = connect(mapStateToProps)(Route);

export default class NewsApp extends Component {
	constructor() {
		super();
		this.state = { rehydrated: false };
	}

	componentWillMount() {
		setTimeout(() => {
			this.setState({ rehydrated: true });
		}, 2000);
	}

	render() {
		if (!this.state.rehydrated) {
			return <Splash />;
		} else {
			return (
				<Provider store={reduxStore.store}>
					<PersistGate persistor={reduxStore.persistor}>
						<AppRoute />
					</PersistGate>
				</Provider>
			);
		}
	}
}
