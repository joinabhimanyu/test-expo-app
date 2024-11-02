import React from 'react'
import {Alert, Button, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Link, useRouter} from "expo-router";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {Product} from "@/models/product";
import {deleteCart, removeItemsFromCart} from "@/redux/cart/actions";

export default function Cart() {
    const router = useRouter()
    const isPresentation = router.canGoBack()
    const colorScheme = useColorScheme()
    const dispatch = useDispatch()
    const {items}: { items: Product[] } = useSelector((state: any) => state.cart)

    const calculateTotalCost = () => {
        let allFinalPrice = 0.0;
        if (items && items.length) {
            for (const item of items) {
                const {price, discountPercentage} = item;
                let finalPrice = price;
                if (discountPercentage) {
                    const discount = (discountPercentage / 100) * price;
                    finalPrice = price - discount;
                }
                allFinalPrice += finalPrice;
            }
        }
        return allFinalPrice.toFixed(2);
    }

    return (
        <>
            {items && items.length ? (
                <>
                    <View style={{flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <FlatList
                            keyExtractor={(item, index) => item.id.toString() ?? ""}
                            data={items}
                            renderItem={({item}) => {
                                return (
                                    <View style={{flexDirection: 'column', height: 'auto', width: '100%'}}>
                                        <View style={{
                                            width: ' 100%',
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            paddingTop: 20,
                                            paddingLeft: 10
                                        }}>
                                            <Image source={{uri: item.images[0]}} width={50} height={50}/>
                                            <Text style={{paddingLeft: 20}}>{item.title}</Text>
                                        </View>
                                        <View style={{
                                            width: ' 100%',
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                        }}>
                                            <View style={{
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                                backgroundColor: '#0dcaf0',
                                                alignSelf: 'center',
                                                borderRadius: 10,
                                                width: 80,
                                                height: 25
                                            }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        Alert.alert('Confirm', 'Delete item from cart', [
                                                            {
                                                                text: 'Cancel',
                                                                onPress: () => console.log('Cancel Pressed'),
                                                                style: 'cancel',
                                                            },
                                                            {text: 'OK', onPress: () => dispatch(removeItemsFromCart(item))},
                                                        ]);
                                                    }}><Text>Delete</Text></TouchableOpacity>
                                            </View>
                                            <View style={{
                                                marginLeft: 10,
                                                marginRight: 20,
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                                backgroundColor: '#fd7e14',
                                                alignSelf: 'center',
                                                borderRadius: 10,
                                                width: 120,
                                                height: 25
                                            }}>
                                                <TouchableOpacity
                                                    onPress={() => false}><Text>Save for
                                                    later</Text></TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }}/>
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
                        shadowOffset: {width: 0, height: 1},
                        shadowOpacity: 1,
                        shadowRadius: 1,
                        elevation: 1.5,
                        borderStyle: 'solid',
                    }}>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', flex: 0.5}}>
                            {isPresentation ? <Link href="../" style={{
                                color: Colors[colorScheme ?? 'light'].stackHeaderBackground
                            }}><Text>Dismiss</Text></Link> : null}
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', flex: 0.5}}>
                            <Link href="../" onPress={(event)=>{
                                event.preventDefault();
                                event.stopPropagation();
                                Alert.alert('Confirm', 'Delete all items from cart', [
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    {text: 'OK', onPress: () => dispatch(deleteCart())},
                                ]);
                            }}><Text>Total Cost: {calculateTotalCost()}</Text></Link>
                        </View>
                    </View>
                </>
            ) : (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>There are no items in cart</Text>
                    {isPresentation ? <Link href="../" style={{
                        color: Colors[colorScheme ?? 'light'].stackHeaderBackground
                    }}><Text>Dismiss</Text></Link> : null}
                </View>
            )}
        </>

    )
}