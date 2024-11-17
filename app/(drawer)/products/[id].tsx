import { useFetchGeneric } from "@/hooks/api/useFetch";
import { Product, PurchasedProduct } from "@/models/product";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    //FlatList,
    Dimensions
} from "react-native";
import baseStyles from "../../../styles/baseStyles";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Drawer from "expo-router/drawer";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "@/redux/cart/actions";
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import CarouselListItem from "@/components/CarouselListItem";
import PageLoader from "@/components/PageLoader";
import AnimatedPager from "@/components/AnimatedPager";
import CarouselListItemContainer from "@/components/CarouselListItemContainer";
import CarouselAnimatedFlatList from "@/components/CarouselAnimatedFlatList";
import AnimatedScrollView from "@/components/AnimatedScrollView";

export default function ProductDetails() {

    const { id } = useLocalSearchParams<{ id: string }>();
    const dispatch = useDispatch();
    const colorScheme = useColorScheme();
    const [addToCartDisabled, setAddToCartDisabled] = useState(false);
    const { items }: { items: PurchasedProduct[] } = useSelector((state: any) => state.cart);

    const { loading, error, data, fetchData } = useFetchGeneric<Product>(
        {
            url: `https://dummyjson.com/products/${id}`,
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        });

    useEffect(() => {
        if (items && items.length) {
            if (items?.find(x => x?.id == data?.id))
                setAddToCartDisabled(true)
            else
                setAddToCartDisabled(false)
        }
    }, [items, data]);

    useEffect(() => {
        fetchData();
    }, []);

    const addToCart = () => {
        dispatch(addItemsToCart(data!!))
    }

    const { width } = Dimensions.get('screen')
    return (
        <>
            {loading ? (
                <PageLoader />
            ) : (
                <>
                    {error ? (
                        <View style={baseStyles.error}><Text>{error}</Text></View>
                    ) : (
                        <>
                            {data ? (
                                <>

                                    <AnimatedScrollView
                                        renderHeader={({ headerHeight }) => (
                                            <>
                                                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                    {/* <Image
                                                source={require('@/assets/images/wallpaper2.jpeg')}
                                                style={[{

                                                    width: width,
                                                    height: HEADER_HEIGHT,
                                                    marginBottom: 10,
                                                    borderWidth: 1,
                                                    borderColor: Colors[colorScheme ?? 'light'].imageBorderColor,
                                                    backgroundColor: Colors[colorScheme ?? 'light'].imageBackgroundColor,
                                                }]} /> */}
                                                    <LinearGradient colors={['transparent', 'rgb(212, 213, 214)']}
                                                        style={{
                                                            width: width,
                                                            height: headerHeight,
                                                        }}
                                                    ></LinearGradient>
                                                </View>
                                                <View style={{ position: 'absolute' }}>
                                                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>

                                                        <CarouselAnimatedFlatList items={data.images} renderItemContent={({ item, index }) => (
                                                            <CarouselListItem item={item} title={data.title} description={data.description} />
                                                        )} />
                                                    </View>
                                                </View>
                                            </>
                                        )}
                                        renderContent={() => (
                                            <View style={{
                                                flex: 1,
                                                width: width,
                                                paddingTop: 20,
                                                paddingLeft: 30,
                                                justifyContent: 'flex-start',
                                                alignItems: 'flex-start'
                                            }}>
                                                <Text style={{ fontWeight: 'bold' }}>Description</Text>
                                                <Text style={{ paddingTop: 10, paddingBottom: 10 }}>{data.description}</Text>

                                                <TouchableOpacity
                                                    style={[baseStyles.primaryButton, {
                                                        backgroundColor: addToCartDisabled ? Colors[colorScheme ?? 'light'].primaryButtonColorDisabled : Colors[colorScheme ?? 'light'].primaryButtonColor,
                                                        alignSelf: 'center',
                                                    }]}
                                                    disabled={addToCartDisabled}
                                                    onPress={addToCart}>
                                                    <Text style={{
                                                        color: 'white'
                                                    }}>Add to Cart</Text></TouchableOpacity>

                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{ fontWeight: 'bold' }}>Category</Text>
                                                    <Text style={{ paddingLeft: 10 }}>{data.category}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{ fontWeight: 'bold' }}>Price</Text>
                                                    <Text style={{ paddingLeft: 10 }}>{data.price}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{ fontWeight: 'bold' }}>Discount</Text>
                                                    <Text style={{ paddingLeft: 10 }}>{data.discountPercentage} %</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{ fontWeight: 'bold' }}>Stock</Text>
                                                    <Text style={{ paddingLeft: 10 }}>{data.stock}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{ fontWeight: 'bold' }}>Brand</Text>
                                                    <Text style={{ paddingLeft: 10 }}>{data.brand}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{ fontWeight: 'bold' }}>SKU</Text>
                                                    <Text style={{ paddingLeft: 10 }}>{data.sku}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{ fontWeight: 'bold' }}>Warranty</Text>
                                                    <Text style={{ paddingLeft: 10 }}>{data.warrantyInformation}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{ fontWeight: 'bold' }}>Shipping</Text>
                                                    <Text style={{ paddingLeft: 10 }}>{data.shippingInformation}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{ fontWeight: 'bold' }}>Availability</Text>
                                                    <Text style={{ paddingLeft: 10 }}>{data.availabilityStatus}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{ fontWeight: 'bold' }}>Return Policy</Text>
                                                    <Text style={{ paddingLeft: 10 }}>{data.returnPolicy}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    paddingTop: 20,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{ fontWeight: 'bold' }}>Rating</Text>
                                                    <Text
                                                        style={{ paddingLeft: 10, paddingRight: 20 }}>{data.rating}</Text>
                                                    {[...Array(Math.ceil(data.rating)).keys()].map(i => (
                                                        <Ionicons key={i} name="star" color="orange" size={15} />
                                                    ))}
                                                </View>

                                                <View
                                                    style={{ paddingTop: 20, gap: 20, paddingBottom: 20 }}>
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
                                                                            style={{ fontWeight: 'bold' }}>Reviewer: </Text>
                                                                        <Text
                                                                            style={{ paddingLeft: 10 }}>{item.reviewerName}</Text>
                                                                    </View>
                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        paddingTop: 20,
                                                                        justifyContent: 'flex-start',
                                                                        alignItems: 'center'
                                                                    }}>
                                                                        <Text
                                                                            style={{ fontWeight: 'bold' }}>Email: </Text>
                                                                        <Text
                                                                            style={{ paddingLeft: 10 }}>{item.reviewerEmail}</Text>
                                                                    </View>
                                                                    <View style={{
                                                                        flexDirection: 'column',
                                                                        paddingTop: 20,
                                                                        justifyContent: 'flex-start',
                                                                        alignItems: 'flex-start'
                                                                    }}>
                                                                        <Text
                                                                            style={{ fontWeight: 'bold' }}>Comment: </Text>
                                                                        <Text>{item.comment}</Text>
                                                                    </View>
                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        paddingTop: 20,
                                                                        justifyContent: 'flex-start',
                                                                        alignItems: 'center'
                                                                    }}>
                                                                        <Text style={{ fontWeight: 'bold' }}>Date: </Text>
                                                                        <Text
                                                                            style={{ paddingLeft: 10 }}>{item.date}</Text>
                                                                    </View>
                                                                </ TouchableOpacity>
                                                            </View>
                                                        )
                                                    })}
                                                </View>
                                            </View>
                                        )} />
                                </>
                            ) : (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
