import { useFetchGeneric } from "@/hooks/api/useFetch";
import { Product, ProductResponse, PurchasedProduct } from "@/models/product";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Image,
    TouchableHighlight,
    TextInput,
    TouchableOpacity, Button,
    TouchableOpacityBase,
    Dimensions
} from "react-native";
import baseStyles from "../../../styles/baseStyles";
import { Stack, useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "@/redux/cart/actions";
import { Colors } from "@/constants/Colors";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

export default function Index() {

    type PositionType = 'absolute' | 'relative' | 'static' | undefined;
    const router = useRouter();
    const colorScheme = useColorScheme();
    const { width, height } = Dimensions.get('screen');
    const styles = StyleSheet.create({

        gridContainer: {
            flex: 1,
            padding: 10,
            marginBottom: 0,
            backgroundColor: Colors[colorScheme ?? 'light'].listItemBackground,
            borderRadius: 8,
            width: "100%",
            overflow: "hidden"
        },

        listItem: {
            marginBottom: 10,
            padding: 10,
            backgroundColor: Colors[colorScheme ?? 'light'].listItemBackground,
            borderRadius: 8,
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "row",
            flexWrap: "nowrap"
        },
    });

    const dispatch = useDispatch();
    const { items }: { items: PurchasedProduct[] } = useSelector((state: any) => state.cart);
    // const currentOffset = useRef(0);
    const [searchTerm, setSearchTerm] = useState('');
    const position = useSharedValue<PositionType>("relative");
    const marginBottom = useSharedValue(10);

    const animatedStyle = useAnimatedStyle(() => ({
        position: position.value,
        marginBottom: marginBottom.value
    }))

    const { loading, error, data, fetchData } = useFetchGeneric<ProductResponse>(
        {
            url: 'https://dummyjson.com/products',
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        });

    useEffect(() => {
        fetchData();
    }, []);


    const renderAddToCartButton = (item: Product) => {
        let disabled = false;
        if (items.find(x => x.id == item.id)) {
            disabled = true;
        }
        return (
            <TouchableOpacity style={[baseStyles.primaryButton, {
                backgroundColor: disabled ? Colors[colorScheme ?? 'light'].primaryButtonColorDisabled : Colors[colorScheme ?? 'light'].primaryButtonColor,
                alignSelf: 'flex-end',
                width: 150,
                marginBottom: 0

            }]} disabled={disabled} onPress={() => {
                dispatch(addItemsToCart(item));
            }}>
                <Text style={{ color: 'white' }}>Add to Cart</Text>
            </TouchableOpacity>
        )
    };

    const renderRightAction = (item: Product) => {
        let disabled = false;
        if (items.find(x => x.id == item.id)) {
            disabled = true;
        }
        return (
            <TouchableOpacity style={{ backgroundColor: 'transparent', padding: 10 }}
                disabled={disabled}
                onPress={() => {
                    dispatch(addItemsToCart(item));
                }}>
                <Ionicons name="heart" size={20} color={disabled ? Colors[colorScheme ?? 'light'].googleIconBackground : Colors[colorScheme ?? 'light'].stackHeaderBackground}></Ionicons>
            </TouchableOpacity>
        )
    }


    const renderFlatList = useMemo(() => {
        if (data && data.products && data.products.length) {

            return (
                <>
                    <View style={styles.gridContainer}>
                        <Animated.View style={[animatedStyle, { top: 10, width: width, zIndex: 100000 }]}>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', width: width * 0.8, backgroundColor: 'transparent', borderRadius: 30 }}>
                                <TextInput
                                    style={{
                                        backgroundColor:'white',
                                        marginTop: 5,
                                        alignSelf: 'flex-start',
                                        flex: 1,
                                        paddingBottom: 20,
                                        paddingLeft: 30,
                                        borderRadius: 30,
                                        textAlign: 'justify',
                                        textAlignVertical: 'bottom',
                                        shadowColor: Colors[colorScheme ?? 'light'].shadowColor,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 15,
                                    }}
                                    placeholder={`Enter search term`}
                                    value={searchTerm}
                                    onChangeText={(text) => {
                                        setSearchTerm(text);
                                    }} />
                                <View style={{ position: 'absolute', right: 10, top: 0, justifyContent: 'center', flex: 1, height: 40 }}>
                                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => {
                                        fetchData();
                                    }}>
                                        <FontAwesome name="search" size={14} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animated.View>
                        <FlatList
                            data={data.products}
                            onRefresh={() => {
                                setSearchTerm('');
                                fetchData();
                            }}
                            refreshing={loading}
                            onScrollEndDrag={(e) => {
                                // const direction = e.nativeEvent.contentOffset.y > currentOffset.current ? 'down' : 'up';
                                // currentOffset.current = e.nativeEvent.contentOffset.y;
                                // console.log('direction: ' + direction+' current: ' + currentOffset.current);
                                // if (direction === 'up' && currentOffset.current<=0) {
                                //     fetchData();
                                //     setSearchTerm('');
                                // }
                            }}
                            onScroll={(e) => {
                                if (e.nativeEvent.contentOffset.y > 100) {
                                    position.value = withSpring('absolute', { duration: 50 });
                                    marginBottom.value = withSpring(0, { duration: 50 });
                                } else {
                                    position.value = withSpring('relative', { duration: 50 });
                                    marginBottom.value = withSpring(10, { duration: 50 });
                                }
                            }}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    router.push({
                                        pathname: '/products/[id]',
                                        params: { id: item.id },
                                    });
                                }}>
                                    <GestureHandlerRootView>
                                        <Swipeable overshootRight={false} renderRightActions={() => (
                                            <View style={{ width: 40, marginRight: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                {renderRightAction(item)}
                                            </View>
                                        )}>
                                            <View style={styles.listItem}>
                                                {item.images && item.images.length ? (
                                                    <>
                                                        <Image width={80} height={80}
                                                            source={{ uri: item.images[0] }} />
                                                        <View style={{ flex: 0.95, paddingLeft: 15, paddingTop: 10 }}>
                                                            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                                                            <Text>{item.description}</Text>
                                                            <Text style={{ marginTop: 10 }}>Price: {item.price}</Text>
                                                            <Text>Shipping: {item.shippingInformation}</Text>
                                                            <Text>Availability: {item.availabilityStatus}</Text>
                                                            {renderAddToCartButton(item)}
                                                        </View>

                                                    </>
                                                ) : null}
                                            </View>
                                        </Swipeable>
                                    </GestureHandlerRootView>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => item.description ?? ""}
                        />
                        <TouchableOpacity style={[baseStyles.primaryButton, {
                            backgroundColor: Colors[colorScheme ?? 'light'].secondary,
                            alignSelf: 'center',
                            marginBottom: 0,
                            width: '50%'

                        }]} onPress={() => false}>
                            <Text style={{ color: 'white' }}>LOAD MORE</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )

        }
        return (
            <View style={baseStyles.error}><Text>No data found</Text></View>
        )
    }, [data, items, searchTerm, loading]);

    return (
        <>
            {error ? (
                <View style={baseStyles.error}><Text style={{
                    color: 'red',
                    fontWeight: '400',
                    fontSize: 18,
                    letterSpacing: 1.2
                }}>Oops! Error occurred while fetching data</Text></View>
            ) : (
                <>
                    {renderFlatList}
                </>
            )}
        </>
    );
}
