import {useFetchGeneric} from "@/hooks/api/useFetch";
import {Product} from "@/models/product";
import React, {useEffect} from "react";
import {
    ActivityIndicator,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native";
import baseStyles from "../../../styles/baseStyles";
import {useLocalSearchParams} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";
import Drawer from "expo-router/drawer";

export default function ProductDetails() {

    const {id} = useLocalSearchParams<{ id: string }>();
    const colorScheme=useColorScheme()
    const {loading, error, data, fetchData} = useFetchGeneric<Product>(
        {
            url: `https://dummyjson.com/products/${id}`,
            headers: {'Content-Type': 'application/json'},
            method: 'GET'
        });

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {/*<Drawer.Screen options={{headerShown:false}}/>*/}
            {loading ? (
                <ActivityIndicator style={baseStyles.loading} size='large'/>
            ) : (
                <>
                    {error ? (
                        <View style={baseStyles.error}><Text>{error}</Text></View>
                    ) : (
                        <>
                            {data ? (
                                <>
                                    <ScrollView>
                                        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                                            <Image source={{uri: data.images[0]}} width={200} height={200}/>

                                            <Text>{data.title}</Text>

                                            <View style={{
                                                flex: 1,
                                                maxWidth: '95%',
                                                paddingTop: 20,
                                                justifyContent: 'flex-start',
                                                alignItems: 'flex-start'
                                            }}>
                                                <Text style={{fontWeight: 'bold'}}>Description</Text>
                                                <Text style={{paddingTop: 10}}>{data.description}</Text>

                                                <View style={{
                                                    flex: 1,
                                                    marginTop: 20,
                                                    marginBottom: 10,
                                                    maxWidth: '95%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: 'orange',
                                                    alignSelf: 'center',
                                                    borderRadius: 30,
                                                    width: 250,
                                                    height: 45
                                                }}>
                                                    <TouchableOpacity><Text>Add
                                                        to Cart</Text></TouchableOpacity>
                                                </View>

                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{fontWeight: 'bold'}}>Category</Text>
                                                    <Text style={{paddingLeft: 10}}>{data.category}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{fontWeight: 'bold'}}>Price</Text>
                                                    <Text style={{paddingLeft: 10}}>{data.price}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{fontWeight: 'bold'}}>Discount</Text>
                                                    <Text style={{paddingLeft: 10}}>{data.discountPercentage} %</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{fontWeight: 'bold'}}>Stock</Text>
                                                    <Text style={{paddingLeft: 10}}>{data.stock}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{fontWeight: 'bold'}}>Brand</Text>
                                                    <Text style={{paddingLeft: 10}}>{data.brand}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{fontWeight: 'bold'}}>SKU</Text>
                                                    <Text style={{paddingLeft: 10}}>{data.sku}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{fontWeight: 'bold'}}>Warranty</Text>
                                                    <Text style={{paddingLeft: 10}}>{data.warrantyInformation}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{fontWeight: 'bold'}}>Shipping</Text>
                                                    <Text style={{paddingLeft: 10}}>{data.shippingInformation}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{fontWeight: 'bold'}}>Availability</Text>
                                                    <Text style={{paddingLeft: 10}}>{data.availabilityStatus}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{fontWeight: 'bold'}}>Return Policy</Text>
                                                    <Text style={{paddingLeft: 10}}>{data.returnPolicy}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{fontWeight: 'bold'}}>Rating</Text>
                                                    <Text
                                                        style={{paddingLeft: 10, paddingRight: 20}}>{data.rating}</Text>
                                                    {[...Array(Math.ceil(data.rating)).keys()].map(i => (
                                                        <Ionicons key={i} name="star" color="orange" size={15}/>
                                                    ))}
                                                </View>

                                                <View
                                                    style={{paddingTop: 20, gap: 20, paddingBottom: 20}}>
                                                    {data.reviews?.map(item => {
                                                        return (
                                                            <View key={item.reviewerName} style={{
                                                                justifyContent: 'flex-start',
                                                                alignItems: 'flex-start'
                                                            }}>
                                                                <TouchableOpacity style={{
                                                                    borderStyle: 'dashed',
                                                                    borderBottomColor: 'black',
                                                                    borderBottomWidth: 1,

                                                                }} onPress={() => console.log('clicked')}>

                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        paddingTop: 20,
                                                                        justifyContent: 'flex-start',
                                                                        alignItems: 'center'
                                                                    }}>
                                                                        <Text
                                                                            style={{fontWeight: 'bold'}}>Reviewer: </Text>
                                                                        <Text
                                                                            style={{paddingLeft: 10}}>{item.reviewerName}</Text>
                                                                    </View>
                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        paddingTop: 20,
                                                                        justifyContent: 'flex-start',
                                                                        alignItems: 'center'
                                                                    }}>
                                                                        <Text
                                                                            style={{fontWeight: 'bold'}}>Email: </Text>
                                                                        <Text
                                                                            style={{paddingLeft: 10}}>{item.reviewerEmail}</Text>
                                                                    </View>
                                                                    <View style={{
                                                                        flexDirection: 'column',
                                                                        paddingTop: 20,
                                                                        justifyContent: 'flex-start',
                                                                        alignItems: 'flex-start'
                                                                    }}>
                                                                        <Text
                                                                            style={{fontWeight: 'bold'}}>Comment: </Text>
                                                                        <Text>{item.comment}</Text>
                                                                    </View>
                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        paddingTop: 20,
                                                                        justifyContent: 'flex-start',
                                                                        alignItems: 'center'
                                                                    }}>
                                                                        <Text style={{fontWeight: 'bold'}}>Date: </Text>
                                                                        <Text
                                                                            style={{paddingLeft: 10}}>{item.date}</Text>
                                                                    </View>
                                                                </ TouchableOpacity>
                                                            </View>
                                                        )
                                                    })}
                                                </View>

                                                {/*<FlatList*/}
                                                {/*    style={{paddingTop: 20, gap: 20, paddingBottom: 20}}*/}
                                                {/*    data={data.reviews}*/}
                                                {/*    keyExtractor={(item) => item.reviewerName}*/}
                                                {/*    renderItem={({item}) =>
                                                                flex: 1,}/>*/}

                                            </View>
                                        </View>

                                    </ScrollView>

                                </>
                            ) : (
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text>There is no information available for this product</Text>
                                </View>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
}
