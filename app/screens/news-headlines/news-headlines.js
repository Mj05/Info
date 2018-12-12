import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import GlobalStyles from '../../config/style';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getNewsHeadlines } from '../../models/news-headline/action';
import Loader from '../../components/loader';
import styles from './style';

class NewsHeadlines extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		news_headlines: PropTypes.array,
		news_source: PropTypes.string
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
		// Dispatch action to get news headlines from the selected news source
		this.props.dispatch(
			getNewsHeadlines(this.props.news_source, this.getNewsHeadlinesSuccess, (error_message) =>
				this.getNewsHeadlinesFailed(error_message)
			)
		);
	};

	getNewsHeadlinesSuccess = () => {
		this.setState({ isLoadingSources: false });
	};

	getNewsHeadlinesFailed = (error_message) => {
		this.setState({
			isLoadingSources: false,
			isNotificationSectionVisible: true,
			errorNotification: error_message
		});
	};

	_renderItem = (news) => {
		return (
			<View style={styles.cardView} key={news.source.id}>
				<View style={GlobalStyles.flexDirectionRow}>
					<View style={[ GlobalStyles.center, GlobalStyles.flexDirectionColumn, styles.imageSection ]}>
						<View style={[ styles.imageBox, styles.imageBoxBorderRadius ]}>
							<Image
								style={[styles.imageBoxBorderRadius, styles.imageBox ]}
								source={{ uri: news.urlToImage }}
							/>
						</View>
						<View style={[ GlobalStyles.center, styles.textPadding ]}>
							<Text>{news.source.name}</Text>
						</View>
					</View>
					<View style={[ GlobalStyles.flexDirectionColumn, styles.contentSecton ]}>
						<View stye={GlobalStyles.center}>
							<Text>{news.title}</Text>
						</View>
						<View style={[ GlobalStyles.center, styles.textPadding ]}>
							<Text style={styles.descriptionFonts}>{news.description}</Text>
						</View>
					</View>
				</View>
			</View>
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
						<FlatList data={this.props.news_headlines} renderItem={(news) => this._renderItem(news.item)} />
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
		news_headlines: state.NewsHeadline.news_headlines,
		news_source: state.NewsSource.selected_news_source
	};
};

export default connect(mapStateToProps)(NewsHeadlines);
