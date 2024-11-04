import {useFetchGeneric} from "@/hooks/api/useFetch";
import {Product, ProductResponse, PurchasedProduct} from "@/models/product";
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
import {useDispatch, useSelector} from "react-redux";
import {addItemsToCart} from "@/redux/cart/actions";

export default function Index() {

    const router = useRouter();
    const colorScheme = useColorScheme();
    const dispatch=useDispatch();
    const {items}:{items: PurchasedProduct[]}=useSelector((state:any)=>state.cart);
    const {loading, error, data, fetchData} = useFetchGeneric<ProductResponse>(
        {
            url: 'https://dummyjson.com/products',
            headers: {'Content-Type': 'application/json'},
            method: 'GET'
        });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log('items changed');
    }, [items]);

    const renderAddToCartButton=(item: Product)=>{
        let disabled=false;
        if(items.find(x=>x.id==item.id)){
            disabled=true;
        }
        return (
            <TouchableOpacity style={{
                backgroundColor: `${disabled?'gray':'orange'}`,
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 20,
                marginTop: 10,
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
            }} disabled={disabled} onPress={()=>{
                dispatch(addItemsToCart(item));
            }}>
                <Text style={{color: 'white'}}>Add to Cart</Text>
            </TouchableOpacity>
        )
    };


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
                                    shadowColor: '#d3d2d2',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 1,
                                    shadowRadius: 1,
                                    elevation: 1,
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
                                <TouchableOpacity onPress={() => {
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
                                                <View style={{flex:0.95, paddingLeft: 15, paddingTop: 10}}>
                                                    <Text style={{fontWeight:'bold'}}>{item.title}</Text>
                                                    <Text>{item.description}</Text>
                                                    <Text style={{marginTop: 10}}>Price: {item.price}</Text>
                                                    <Text>Shipping: {item.shippingInformation}</Text>
                                                    <Text>Availability: {item.availabilityStatus}</Text>
                                                    {renderAddToCartButton(item)}
                                                </View>

                                            </>
                                        ) : null}
                                    </View>
                                </TouchableOpacity>
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
    }, [data, items]);

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
        alignItems: "flex-start",
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