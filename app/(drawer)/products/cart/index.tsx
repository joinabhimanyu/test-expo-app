import React, {useEffect, useMemo, useState} from 'react'
import {Alert, Button, FlatList, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Link, useRouter} from "expo-router";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {Product, PurchasedProduct} from "@/models/product";
import {deleteCart, removeItemsFromCart} from "@/redux/cart/actions";
import {FontAwesome} from "@expo/vector-icons";

export default function Cart() {
    const router = useRouter()
    const isPresentation = router.canGoBack()
    const colorScheme = useColorScheme()
    const dispatch = useDispatch()
    const [purchasedItems, setPurchasedItems]=useState<PurchasedProduct[]>([])
    const {items}: { items: Product[] } = useSelector((state: any) => state.cart)

    useEffect(()=>{
        if (items && items.length) {
            const pitems: PurchasedProduct[]=items.map((item)=>({
                ...item,
                purchasedQuantity: 0
            }));
            setPurchasedItems(JSON.parse(JSON.stringify(pitems)))
        }
    },[items])

    const setQuantity=(value:number, item:PurchasedProduct)=>{
        if (value<item.stock) {
            item.purchasedQuantity=value;
            setPurchasedItems(purchasedItems)
        }
    }

    const incrementQuantity=(item:PurchasedProduct)=>{
        if (item.purchasedQuantity<item.stock) {
            item.purchasedQuantity++;
            console.log(item.purchasedQuantity)
            setPurchasedItems(purchasedItems)
        }
    }

    const decrementQuantity=(item:PurchasedProduct)=>{
        if (item.purchasedQuantity>0) {
            item.purchasedQuantity--;
            setPurchasedItems(purchasedItems)
        }
    }

    const calculateTotalCost = useMemo(() => {
        let allFinalPrice = 0.0;
        if (purchasedItems && purchasedItems.length) {
            for (const item of purchasedItems) {
                const {price, discountPercentage, purchasedQuantity} = item;
                let finalPrice = price;
                if (discountPercentage) {
                    const discount = (discountPercentage / 100) * price;
                    finalPrice = (price - discount)*purchasedQuantity;
                }
                allFinalPrice += finalPrice;
            }
        }
        return allFinalPrice.toFixed(2);
    },[purchasedItems])

    return (
        <>
            {purchasedItems && purchasedItems.length ? (
                <>
                    <View style={{flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <FlatList
                            keyExtractor={(item, index) => item.id.toString() ?? ""}
                            data={purchasedItems}
                            renderItem={({item}) => {
                                return (
                                    <View style={{flexDirection: 'column', height: 'auto', width: '100%'}}>
                                        <View style={{
                                            width: ' 100%',
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-start',
                                            paddingTop: 20,
                                            paddingLeft: 10
                                        }}>
                                            <Image source={{uri: item.images[0]}} width={50} height={50}/>
                                            <View style={{paddingLeft: 20}}>
                                                <Text>{item.title}</Text>
                                                <Text>Stock: {item.stock}</Text>
                                                <Text>Minimum Order Quantity: {item.minimumOrderQuantity}</Text>
                                                <Text>Price: {item.price}</Text>
                                                <View style={{flexDirection:'row', flex:1}}>
                                                    <Text>Quantity: </Text>
                                                    <TextInput
                                                        style={{paddingLeft:20, textAlignVertical:'top'}}
                                                        keyboardType='numeric'
                                                        placeholder="enter quantity"
                                                        onChangeText={(text)=> setQuantity(Number(text), item)}
                                                        value={item.purchasedQuantity.toFixed(2)}
                                                        maxLength={10}  //setting limit of input
                                                    />
                                                    <TouchableOpacity onPress={()=>incrementQuantity(item)}>
                                                        <FontAwesome name="plus" style={{paddingLeft:10, paddingTop:5}}/>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={()=>decrementQuantity(item)}>
                                                        <FontAwesome name="minus" style={{paddingLeft:10, paddingTop:5}}/>
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
                                            <View style={{
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                                backgroundColor: '#0d6efd',
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
                                                    }}><Text style={{color:'white'}}>Delete</Text></TouchableOpacity>
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
                                                    onPress={() => false}><Text style={{color:'black'}}>Save for
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
                            }}><Text>Total Cost: {calculateTotalCost}</Text></Link>
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