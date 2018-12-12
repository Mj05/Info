import { StyleSheet } from "react-native";

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
        flexDirection: "row"
    },
    flexDirectionColumn: {
        flexDirection: "column"
    }
});

export default GlobalStyles;
