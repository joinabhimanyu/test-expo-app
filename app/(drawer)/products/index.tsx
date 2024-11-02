import {useFetchGeneric} from "@/hooks/api/useFetch";
import {ProductResponse} from "@/models/product";
import React, {useEffect, useMemo} from "react";
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Image,
    TouchableHighlight,
    TextInput,
    TouchableOpacity, Button
} from "react-native";
import baseStyles from "../../../styles/baseStyles";
import {Stack, useRouter} from "expo-router";
import {useColorScheme} from "@/hooks/useColorScheme";
import {FontAwesome} from "@expo/vector-icons";

export default function Index() {

    const router = useRouter();
    const colorScheme = useColorScheme()
    const {loading, error, data, fetchData} = useFetchGeneric<ProductResponse>(
        {
            url: 'https://dummyjson.com/products',
            headers: {'Content-Type': 'application/json'},
            method: 'GET'
        });

    useEffect(() => {
        fetchData();
    }, []);


    const renderFlatList = useMemo(() => {
        if (data && data.products && data.products.length) {

            return (
                <>
                    <View style={styles.gridContainer}>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput
                                style={{
                                    alignSelf: 'flex-start',
                                    flex: 1,
                                    paddingBottom: 20,
                                    paddingLeft: 30,
                                    borderRadius: 30,
                                    shadowColor: 'gray',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 1,
                                    elevation: 2,
                                    textAlign:'justify',
                                    textAlignVertical:'bottom'
                            }}
                                placeholder={`Enter search term`}
                                onChangeText={(text) => {
                                    console.log(text);
                                }}/>
                            <TouchableOpacity style={{position:'absolute', right:10, top:15}} onPress={() => {
                                return false;
                            }}>
                                <FontAwesome name="search" size={14}/>
                            </TouchableOpacity>

                        </View>

                        <FlatList
                            data={data.products}
                            renderItem={({item}) => (
                                <TouchableHighlight underlayColor="transparent" onPress={() => {
                                    router.push({
                                        pathname: '/(drawer)/products/[id]',
                                        params: {id: item.id},
                                    })
                                    // router.navigate({pathname: '/products', params: {productId: item.id}});
                                }}>
                                    <View style={styles.listItem}>
                                        {item.images && item.images.length ? (
                                            <>
                                                <Image width={80} height={80}
                                                       source={{uri: item.images[0]}}/>
                                                <Text style={{flex: 0.9, marginLeft: 20}}>{item.description}</Text>
                                            </>
                                        ) : null}
                                    </View>
                                </TouchableHighlight>
                            )}
                            keyExtractor={(item, index) => item.description ?? ""}
                        />
                        <Button title={`Load More`} onPress={()=>false}/>
                    </View>
                </>
            )

        }
        return (
            <View style={baseStyles.error}><Text>No data found</Text></View>
        )
    }, [data]);

    return (
        <>
            {loading ? (
                <ActivityIndicator style={baseStyles.loading} size='large'/>
            ) : (
                <>
                    {error ? (
                        <View style={baseStyles.error}><Text>{error}</Text></View>
                    ) : (
                        <>
                            {renderFlatList}
                        </>
                    )}
                </>
            )}
        </>
    );
}

const styles = StyleSheet.create({

    gridContainer: {
        flex: 1,
        padding: 10,
        marginBottom: 20,
        backgroundColor: "#f2f2f2",
        borderRadius: 8,
        width: "100%",
        overflow: "hidden"
    },

    listItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#f2f2f2",
        borderRadius: 8,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "nowrap"
    },

    // buttonContainer: {
    //   flex: 0.2,
    //   marginTop: 5,
    //   marginBottom: 5,
    //   padding: 10,
    //   backgroundColor: "#007aff",
    //   borderRadius: 30,
    //   width: 150,
    //   justifyContent: "center",
    //   alignItems: "center",
    // },

    // buttonText: {
    //   color: "white",
    //   fontSize: 18,
    // },

});