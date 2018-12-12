import { StyleSheet, Dimensions } from 'react-native';
const cardWidth = Dimensions.get('window').width - 20;

const styles = StyleSheet.create({
	cardView: {
		height: 200,
		width: cardWidth,
		backgroundColor: GLOBAL_CONFIG.COLOR.THEME_COLOR,
		borderRadius: 20,
		padding: '5%',
		marginBottom: '4%',
		marginTop: '4%',
		justifyContent: 'center'
    },
    imageSection: {
        width: "40%"
    },
    contentSecton: {
        width: "60%"
    },
    imageBox: {
        height: 100,
        width: 100
    },
    imageBoxBorderRadius: {
        borderRadius: 20
    },
    textPadding: {
        paddingTop: '2%'
    },
    descriptionFonts: {
        fontSize: 11
    }
});

export default styles;
