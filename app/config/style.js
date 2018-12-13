import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GLOBAL_CONFIG.COLOR.WHITE
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	textAlignCenter: {
		textAlign: 'center'
	},
	flexDirectionRow: {
		flexDirection: 'row'
	},
	flexDirectionColumn: {
		flexDirection: 'column'
	},
	alignLeft: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	alignRight: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	underlineText: {
		textDecorationLine: 'underline'
	},
	containerBackground: {
		backgroundColor: GLOBAL_CONFIG.COLOR.BACKGROUND
	},
	flex: {
		flex: 1
	}
});

export default GlobalStyles;
