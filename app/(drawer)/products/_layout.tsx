import { Routes } from '@/constants/Routes';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useGlobalSearchParams, useNavigation, usePathname, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { TouchableHighlight, Text, StyleSheet, Alert } from 'react-native';
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useSelector } from 'react-redux';
import { PurchasedProduct } from '@/models/product';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerActions } from '@react-navigation/native';

export default function ProductsLayout() {

    // const [title, setTitle] = useState('');
    const pathname = usePathname();
    const colorScheme = useColorScheme();
    const router = useRouter();
    const navigation = useNavigation();
    const { items }: { items: PurchasedProduct[] } = useSelector((state: any) => state.cart);

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

    // useEffect(() => {
    //     for (const key of Object.keys(Routes?.routeMap)) {
    //         if (Routes?.routeMap[key] && Routes?.routeMap[key].pattern && Routes?.routeMap[key].pattern.test(pathname ?? "")) {
    //             setTitle(Routes?.routeMap[key].title);
    //             break;
    //         }
    //     }
    // }, [pathname, params]);

    return (
        <>
            <Stack
                screenOptions={{
                    headerShown: true,
                    headerTitleAlign: 'left',
                    headerTintColor: Colors[colorScheme ?? 'light'].secondary,
                    headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].stackHeaderBackground },

                    headerRight: () => (
                        <TouchableHighlight
                            underlayColor="transparent"
                            onPress={() => {
                                if (pathname !== '/products/cart') {
                                    router.push({
                                        pathname: "/products/cart",
                                        params: {}
                                    })
                                }
                            }}>
                            <Ionicons name="cart" color={items && items.length ? Colors[colorScheme ?? 'light'].primary
                                : Colors[colorScheme ?? 'light'].secondary} size={24} />
                        </TouchableHighlight>
                    ),
                }}
            >
                <Stack.Screen name="index" options={{
                    headerTitle: 'Products',
                    headerLeft: () => (
                        <TouchableHighlight
                            underlayColor="transparent"
                            onPress={() => {
                                navigation.dispatch(DrawerActions.toggleDrawer());
                            }}
                            style={{ cursor: 'pointer', marginRight: 15 }}>
                            <Ionicons name="menu" size={24} color={Colors[colorScheme ?? 'light'].secondary} />
                        </TouchableHighlight>
                    ),
                }} />
                <Stack.Screen name="[id]" options={{ headerTitle: 'Product' }} />
                <Stack.Screen name="cart/index" options={{
                    headerTitle: 'Cart',
                    headerRight: () => (
                        <Text style={{ color: Colors[colorScheme ?? 'light'].primary, fontSize: 18 }}>Total: ${calculateTotalCost}</Text>
                    ),
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                }} />
                <Stack.Screen name="cart/checkout" options={{ headerTitle: 'Checkout', headerBackVisible: false, headerRight: () => false }} />
            </Stack>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: "center",
    },
});