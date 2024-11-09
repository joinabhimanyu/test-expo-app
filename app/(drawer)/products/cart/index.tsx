import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { Product, PurchasedProduct } from "@/models/product";
import { deleteCart, removeItemsFromCart, setCart } from "@/redux/cart/actions";
import { FontAwesome } from "@expo/vector-icons";
import { Collapsible } from "@/components/Collapsible";
import baseStyles from '@/styles/baseStyles';

export default function Cart() {
    const router = useRouter()
    const isPresentation = router.canGoBack()
    const colorScheme = useColorScheme()
    const dispatch = useDispatch()

    const { items }: { items: PurchasedProduct[] } = useSelector((state: any) => state.cart)


    const setQuantity = (value: number, item: PurchasedProduct) => {
        if (value < item.stock) {
            dispatch(setCart({
                ...item,
                purchasedQuantity: value
            }))
        }
    }

    const incrementQuantity = (item: PurchasedProduct) => {
        if (item.purchasedQuantity < item.stock) {
            dispatch(setCart({
                ...item,
                purchasedQuantity: item.purchasedQuantity + 1
            }))
        }
    }

    const decrementQuantity = (item: PurchasedProduct) => {
        if (item.purchasedQuantity > 0) {
            dispatch(setCart({
                ...item,
                purchasedQuantity: item.purchasedQuantity - 1
            }))
        }
    }

    const calculateTotalCost = useMemo(() => {
        let allFinalPrice = 0.0;
        if (items && items.length) {
            for (const item of items) {
                const { price, discountPercentage, purchasedQuantity } = item;
                let finalPrice = price;
                if (discountPercentage) {
                    const discount = (discountPercentage / 100) * price;
                    finalPrice = (price - discount) * purchasedQuantity;
                }
                allFinalPrice += finalPrice;
            }
        }
        return allFinalPrice.toFixed(2);
    }, [items])

    return (
        <>
            {items && items.length ? (
                <>
                    <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <FlatList
                            keyExtractor={(item, index) => item.id.toString() ?? ""}
                            data={items}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ flexDirection: 'column', height: 'auto', width: '100%' }}>
                                        <View style={{
                                            width: ' 100%',
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-start',
                                            paddingTop: 20,
                                            paddingLeft: 10
                                        }}>
                                            <Image source={{ uri: item.images[0] }} width={50} height={50} />
                                            <View style={{ paddingLeft: 20 }}>
                                                <Text style={styles.title}>{item.title}</Text>
                                                <Text style={styles.texts}>Stock: {item.stock}</Text>
                                                <Text style={styles.texts}>Price: {item.price}</Text>
                                                <Text style={styles.texts}>Minimum Order
                                                    Quantity: {item.minimumOrderQuantity}</Text>
                                                <Text style={styles.texts}>{item.warrantyInformation}</Text>
                                                <Text style={styles.texts}>{item.shippingInformation}</Text>
                                                <Text style={styles.texts}>{item.availabilityStatus}</Text>
                                                <Text style={styles.texts}>{item.returnPolicy}</Text>
                                                <View style={{ flexDirection: 'row', flex: 1, paddingTop: 10 }}>
                                                    <Text>Quantity: </Text>
                                                    <TextInput
                                                        style={{ paddingLeft: 20, textAlignVertical: 'top' }}
                                                        keyboardType='numeric'
                                                        placeholder="enter quantity"
                                                        onChangeText={(text) => setQuantity(Number(text), item)}
                                                        value={item.purchasedQuantity.toFixed(2)}
                                                        maxLength={10}  //setting limit of input
                                                    />
                                                    <TouchableOpacity onPress={() => incrementQuantity(item)}>
                                                        <FontAwesome name="plus"
                                                            style={{ paddingLeft: 10, paddingTop: 5 }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => decrementQuantity(item)}>
                                                        <FontAwesome name="minus"
                                                            style={{ paddingLeft: 10, paddingTop: 5 }} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{
                                            paddingTop: 10,
                                            width: ' 100%',
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                        }}>
                                            <TouchableOpacity
                                                style={[baseStyles.primaryButton, {
                                                    backgroundColor: Colors[colorScheme ?? 'light'].primary,
                                                    alignSelf: 'center',
                                                    width: 100,

                                                }]}
                                                onPress={() => {
                                                    Alert.alert('Confirm Delete', 'Delete item from cart', [
                                                        {
                                                            text: 'Cancel',
                                                            onPress: () => console.log('Cancel Pressed'),
                                                            style: 'cancel',
                                                        },
                                                        {
                                                            text: 'OK',
                                                            onPress: () => dispatch(removeItemsFromCart(item))
                                                        },
                                                    ]);
                                                }}><Text style={{ color: 'white' }}>Delete</Text></TouchableOpacity>
                                            <TouchableOpacity
                                                style={[baseStyles.primaryButton, {
                                                    backgroundColor: Colors[colorScheme ?? 'light'].primaryButtonColor,
                                                    alignSelf: 'center',
                                                    width: 130,
                                                    marginLeft: 10,
                                                    marginRight: 10
                                                }]}
                                                onPress={() => {
                                                    Alert.alert('Confirm Save', 'Do you want to save item for later', [
                                                        {
                                                            text: 'Cancel',
                                                            onPress: () => console.log('Cancel Pressed'),
                                                            style: 'cancel',
                                                        },
                                                        { text: 'OK', onPress: () => false },
                                                    ]);
                                                }}><Text style={{ color: 'black' }}>Save for
                                                    later</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }} />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        paddingTop: 20,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 20,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        shadowColor: 'gray',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 1,
                        shadowRadius: 1,
                        elevation: 1.5,
                        borderStyle: 'solid',
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 0.5 }}>
                            {/* {isPresentation ? <Link href="../" style={{
                                color: Colors[colorScheme ?? 'light'].primary
                            }}><Text>Dismiss</Text></Link> : null} */}
                            <TouchableOpacity
                                style={[baseStyles.primaryButton, {
                                    backgroundColor: Colors[colorScheme ?? 'light'].primaryButtonColorDisabled,
                                    width: 100,
                                    marginTop: 0,
                                    marginBottom: 0,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                }]}
                                onPress={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    Alert.alert('Confirm Delete', 'Delete all items from cart', [
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel',
                                        },
                                        { text: 'OK', onPress: () => dispatch(deleteCart()) },
                                    ]);
                                }}>
                                <Text style={{ color: 'white' }}>Clear</Text>
                            </TouchableOpacity>
                            
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 0.5 }}>
                            <TouchableOpacity
                                style={[baseStyles.primaryButton, {
                                    backgroundColor: Colors[colorScheme ?? 'light'].primary,
                                    width: 100,
                                    marginTop: 0,
                                    marginBottom: 0,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                }]}
                                onPress={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    let valid = true;
                                    for (const item of items) {
                                        if (item.purchasedQuantity == 0.00) {
                                            valid = false;
                                            break;
                                        }
                                    }
                                    if (valid) {

                                        Alert.alert('Checkout', 'Do you want to check out these items', [
                                            {
                                                text: 'Cancel',
                                                onPress: () => console.log('Cancel Pressed'),
                                                style: 'cancel',
                                            },
                                            {
                                                text: 'OK', onPress: () => {
                                                    router.replace({
                                                        pathname: '/products/cart/checkout'
                                                    })
                                                }
                                            },
                                        ]);
                                    } else {
                                        Alert.alert("Alert", "Please select quantity of all items")
                                    }
                                }}>
                                <Text style={{ color: 'white' }}>Checkout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>There are no items in cart</Text>
                    {/* {isPresentation ? <Link href="../" style={{
                        color: Colors[colorScheme ?? 'light'].stackHeaderBackground
                    }}><Text>Dismiss</Text></Link> : null} */}
                </View>
            )}
        </>

    )
}

const styles = StyleSheet.create({
    texts: {
        paddingTop: 5,
        fontWeight: "bold"
    },
    title: {
        paddingTop: 5
    }
})