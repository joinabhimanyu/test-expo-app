import React from 'react'
import {Drawer} from "expo-router/drawer";
import {FontAwesome} from "@expo/vector-icons";
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";

export default function DrawerLayout() {
    const colorScheme = useColorScheme();

    return (
        <Drawer
            initialRouteName="products"
            screenOptions={{
                drawerActiveBackgroundColor: Colors[colorScheme ?? 'light'].drawerActiveBackgroundColor,
                drawerActiveTintColor: Colors[colorScheme ?? 'light'].drawerActiveTintColor
            }}>
            <Drawer.Screen
                name="products" // This is the name of the page and must match the url from root
                options={{
                    headerShown: true,
                    drawerLabel: "Products",
                    title: "Products",
                    drawerIcon: ({color}) => (
                        <FontAwesome name="home" size={20} color={color}/>
                    ),
                }}
            />
        </Drawer>
    )
}