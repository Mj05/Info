import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	FlatList,
	Alert,
	Image,
	Linking,
	RefreshControl
} from 'react-native';
import GlobalStyles from '../../config/style';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getNewsHeadlines } from '../../models/news-headline/action';
import Loader from '../../components/loader';
import styles from './style';
import Header from '../../components/header';
import Icon from 'react-native-vector-icons/Ionicons';

class NewsHeadlines extends Component {
	static navigationOptions = ({ navigation }) => ({
		header: <Header title={GLOBAL_LANG.MY_FEED} isSettingsVisible={true} navigation={navigation} />
	});

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
			errorNotification: null,
			refreshing: false
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
		this.setState({ isLoadingSources: false, refreshing: false });
	};

	getNewsHeadlinesFailed = (error_message) => {
		this.setState({
			isLoadingSources: false,
			isNotificationSectionVisible: true,
			errorNotification: error_message,
			refreshing: false
		});
	};

	exploreHeadlines = (url) => {
		Linking.canOpenURL(url).then((supported) => {
			if (supported) {
				Linking.openURL(url);
			} else {
				Alert.alert(
					'Oops..',
					'ERR: Unable to explore this news',
					[
						{
							text: 'OK'
						}
					],
					{ cancelable: false }
				);
			}
		});
	};

	_renderItem = (news) => {
		return (
			<TouchableOpacity
				style={styles.cardView}
				key={news.source.id}
				onPress={() => {
					this.exploreHeadlines(news.url);
				}}
			>
				<View style={GlobalStyles.flexDirectionRow}>
					<View style={[ GlobalStyles.center, GlobalStyles.flexDirectionColumn, styles.imageSection ]}>
						<View
							style={[
								styles.imageBox,
								styles.imageBoxBorderRadius,
								styles.imageBoxBackground,
								GlobalStyles.center
							]}
						>
							{news.urlToImage != null ? (
								<Image
									style={[ styles.imageBoxBorderRadius, styles.imageBox ]}
									source={{ uri: news.urlToImage }}
								/>
							) : (
								<Icon name="ios-paper" size={30} color={GLOBAL_CONFIG.COLOR.BLACK} />
							)}
						</View>
						<View style={[ GlobalStyles.center, styles.textPadding ]}>
							<Text style={styles.newsSourceName}>{news.source.name}</Text>
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
			</TouchableOpacity>
		);
	};

	_onRefresh = () => {
		this.setState({ refreshing: true, isNotificationSectionVisible: false });
		// Dispatch action to get news headlines from the selected news source
		this.props.dispatch(
			getNewsHeadlines(this.props.news_source, this.getNewsHeadlinesSuccess, (error_message) =>
				this.getNewsHeadlinesFailed(error_message)
			)
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
					<ScrollView
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._onRefresh}
								colors={[ GLOBAL_CONFIG.COLOR.THEME_COLOR ]}
							/>
						}
					>
						<FlatList
							data={this.props.news_headlines}
							renderItem={(news) => this._renderItem(news.item)}
							keyExtractor={(news, index) => index.toString()}
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
		news_headlines: state.NewsHeadline.news_headlines,
		news_source: state.NewsSource.selected_news_source
	};
};

export default connect(mapStateToProps)(NewsHeadlines);
