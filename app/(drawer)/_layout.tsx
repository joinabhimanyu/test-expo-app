import React from 'react'
import {Drawer} from "expo-router/drawer";
import {FontAwesome} from "@expo/vector-icons";

export default function DrawerLayout() {
    return (
        <Drawer initialRouteName="products"
                screenOptions={{drawerActiveBackgroundColor:"#C6F3CA", drawerActiveTintColor:"#12B886"}}>
            <Drawer.Screen
                name="products" // This is the name of the page and must match the url from root
                options={{
                    drawerLabel: "Products",
                    title: "overview",
                    drawerIcon: ({ color }) => (
                        <FontAwesome name="home" size={20} color={color} />
                    ),
                }}
            />
            {/*<Drawer.Screen*/}
            {/*    name="products/[id]" // This is the name of the page and must match the url from root*/}
            {/*    options={{*/}
            {/*        drawerLabel: "Product Details",*/}
            {/*        title: "overview",*/}
            {/*    }}*/}
            {/*/>*/}
        </Drawer>
    )
}