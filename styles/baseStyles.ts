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
});

export default baseStyles;