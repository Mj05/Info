import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './header-style';
import Icon from 'react-native-vector-icons/Ionicons';
import GlobalStyles from '../config/style';

class Header extends Component {
	render() {
		return (
			<View style={[ styles.header, GlobalStyles.flexDirectionRow ]}>
				<View style={GlobalStyles.alignLeft}>
					<View style={[ GlobalStyles.flexDirectionRow, styles.iconPaddingLeft, styles.alignItemCenter ]}>
						<View>
							<Icon name="ios-paper" size={30} color={GLOBAL_CONFIG.COLOR.BLACK} />
						</View>
						<View style={styles.titlePaddingLeft}>
							<Text>{this.props.title}</Text>
						</View>
					</View>
				</View>
				{this.props.isSettingsVisible ? (
					<View style={GlobalStyles.alignRight}>
						<View style={styles.iconPaddingRight}>
							<TouchableOpacity
								onPress={() => {
									this.props.navigation.push('NewsSources');
								}}
							>
								<Icon name="ios-options" size={30} color={GLOBAL_CONFIG.COLOR.BLACK} />
							</TouchableOpacity>
						</View>
					</View>
				) : null}
			</View>
		);
	}
}

export default Header;
