import { StyleSheet } from "react-native";

const baseStyles=StyleSheet.create({
    loading: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        alignSelf: "center",
      },
      error: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        alignSelf: "center",
        color: "red",
        padding: 10,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
      },
      shadowBase : {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      primaryButton: {
        padding: 15,
        width: 200,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    
});

export default baseStyles;