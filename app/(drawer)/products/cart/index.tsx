import React from 'react'
import {Text, View} from "react-native";
import {Link, useRouter} from "expo-router";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";
import {useSelector} from "react-redux";
import {Product} from "@/models/product";

export default function Cart() {
    const router = useRouter()
    const isPresentation = router.canGoBack()
    const colorScheme = useColorScheme()
    const {items}:{items:Product[]} = useSelector((state: any) => state.cart)

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {items && items.length?(
                <Text>Total items in cart {items.length}</Text>
            ):(
                <Text>There are no items in cart</Text>
            )}

            {isPresentation ? <Link href="../" style={{
                color: Colors[colorScheme ?? 'light'].stackHeaderBackground
            }}><Text>Dismiss</Text></Link> : null}
        </View>
    )
}