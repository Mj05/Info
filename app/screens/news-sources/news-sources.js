import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../config/style';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getNewsSources, updateNewsSource } from '../../models/news-source/action';
import Loader from '../../components/loader';
import styles from './style';
import GridView from 'react-native-super-grid';

class NewsSources extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		news_sources: PropTypes.array,
		selected_news_source: PropTypes.string
	};

	constructor() {
		super();
		this.state = {
			isLoadingSources: false,
			isNotificationSectionVisible: false,
			errorNotification: null
		};
	}

	componentWillMount = () => {
		this.setState({ isLoadingSources: true });
		// Dispatch action to get news sources
		this.props.dispatch(
			getNewsSources(this.getNewsSourcesSuccess, (error_message) => this.getNewsSourcesFailed(error_message))
		);
	};

	getNewsSourcesSuccess = () => {
		this.setState({ isLoadingSources: false });
	};

	getNewsSourcesFailed = (error_message) => {
		this.setState({
			isLoadingSources: false,
			isNotificationSectionVisible: true,
			errorNotification: error_message
		});
	};

	selectNewsSource = (source) => {
		this.props.dispatch(updateNewsSource(source));
		this.props.navigation.push('NewsHeadlines');
	};

	_renderItem = (news_source) => {
		return (
			<TouchableOpacity
				style={[ GlobalStyles.center, styles.newsSourceView, { flexDirection: 'column' } ]}
				onPress={() => {
					this.selectNewsSource(news_source.id);
				}}
			>
				<Text style={GlobalStyles.textAlignCenter}>{news_source.name}</Text>
				{this.props.selected_news_source == news_source.id ? <Text>selected</Text> : null}
			</TouchableOpacity>
		);
	};

	render() {
		if (this.state.isLoadingSources) {
			return (
				<View style={GlobalStyles.container}>
					<Loader title={GLOBAL_LANG.LOADING} />
				</View>
			);
		} else {
			return (
				<View style={[ GlobalStyles.container, GlobalStyles.center ]}>
					<ScrollView>
						<GridView
							itemDimension={100}
							items={this.props.news_sources}
							renderItem={(news_source) => this._renderItem(news_source)}
						/>
					</ScrollView>
					{this.state.isNotificationSectionVisible ? (
						<View style={styles.notificationSection}>
							<Text>{this.state.errorNotification}</Text>
						</View>
					) : null}
				</View>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		news_sources: state.NewsSource.news_sources,
		selected_news_source: state.NewsSource.selected_news_source
	};
};

export default connect(mapStateToProps)(NewsSources);
