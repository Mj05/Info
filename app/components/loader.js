import React, { Component } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import GlobalStyles from '../config/style';

class Loader extends Component {
	render() {
		return (
			<View style={[ GlobalStyles.container, GlobalStyles.center ]}>
				<View style={GlobalStyles.center}>
					<ActivityIndicator size="small" color={GLOBAL_CONFIG.COLOR.THEME_COLOR} />
					<Text>{this.props.title}</Text>
				</View>
			</View>
		);
	}
}

export default Loader;
