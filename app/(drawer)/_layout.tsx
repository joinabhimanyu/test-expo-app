import React from 'react'
import { Drawer } from "expo-router/drawer";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { TouchableHighlight } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { usePathname, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { Product, PurchasedProduct } from "@/models/product";
import CustomDrawerContent from '@/components/CustomDrawerContent';

export default function DrawerLayout() {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const pathname = usePathname();
    const { items }: { items: PurchasedProduct[] } = useSelector((state: any) => state.cart);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    headerShown: false,
                    headerTitleAlign: 'left',
                    headerTintColor: "black",
                    headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].secondary },

                    drawerActiveBackgroundColor: Colors[colorScheme ?? 'light'].secondary,
                    drawerActiveTintColor: Colors[colorScheme ?? 'light'].primary
                }}>
                <Drawer.Screen
                    name="products" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: "Products",
                        title: "Products",
                        drawerIcon: ({ color }) => (
                            <FontAwesome name="home" size={20} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="photos" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: "Photos",
                        title: "Photos",
                        drawerIcon: ({ color }) => (
                            <FontAwesome name="photo" size={20} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="category" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: "Category",
                        title: "Category",
                        drawerIcon: ({ color }) => (
                            <FontAwesome name="group" size={20} color={color} />
                        ),
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    )
}