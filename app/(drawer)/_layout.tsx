import React, { useState } from 'react'
import { Drawer } from "expo-router/drawer";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Dimensions, TouchableOpacity, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { usePathname, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { Product, PurchasedProduct } from "@/models/product";
import CustomDrawerContent from '@/components/CustomDrawerContent';

// const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const pathname = usePathname();
    const { width } = Dimensions.get('screen');
    const { items }: { items: PurchasedProduct[] } = useSelector((state: any) => state.cart);
    const ICON_SIZE = 16;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    drawerStyle: {
                        width: width * 0.7,
                        backgroundColor: Colors[colorScheme ?? 'light'].background,
                        shadowColor: Colors[colorScheme ?? 'light'].text,
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5
                    },
                    headerShown: false,
                    headerTitleAlign: 'left',
                    headerTintColor: "black",
                    headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].text },

                    drawerActiveBackgroundColor: Colors[colorScheme ?? 'light'].text,
                    drawerActiveTintColor: Colors[colorScheme ?? 'light'].searchBoxBackground
                }}>
                <Drawer.Screen
                    name="products" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: "Products",
                        title: "Products",
                        drawerIcon: ({ color }) => (
                            <FontAwesome name="home" size={ICON_SIZE} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="photos" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: "News",
                        title: "News",
                        drawerIcon: ({ color }) => (
                            <FontAwesome name="photo" size={ICON_SIZE} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="category" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: "Category",
                        title: "Category",
                        drawerIcon: ({ color }) => (
                            <FontAwesome name="group" size={ICON_SIZE} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="accounts" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: "Accounts",
                        title: "Accounts",
                        drawerIcon: ({ color }) => (
                            <FontAwesome name="address-book" size={ICON_SIZE} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="settings" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: "Settings",
                        title: "Settings",
                        drawerIcon: ({ color }) => (
                            <FontAwesome name="cog" size={ICON_SIZE} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="orders" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: "Orders",
                        title: "Orders",
                        drawerIcon: ({ color }) => (
                            <FontAwesome name="cart-plus" size={ICON_SIZE} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="wishlist" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: "Wishlist",
                        title: "Wishlist",
                    }}
                />

            </Drawer>
        </GestureHandlerRootView>
    )
}