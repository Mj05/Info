import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	notificationSection: {
		padding: '5%'
	},
	newsSourceView: {
		height: 100,
		backgroundColor: GLOBAL_CONFIG.COLOR.THEME_COLOR,
		borderColor: GLOBAL_CONFIG.COLOR.OFF_WHITE,
		borderRadius: 20,
		borderWidth: 2
	},
	titleText: {
		fontSize: 17,
		fontWeight: "500"
	},
	titleTextView: {
		padding: "3%"
	}
});

export default styles;
