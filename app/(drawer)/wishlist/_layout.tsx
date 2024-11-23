import React from 'react'
import {Stack} from "expo-router";

export default function WishlistLayout() {
    return (
        <Stack>
            <Stack.Screen name="sub1" options={{headerShown: false}}/>
            <Stack.Screen name="sub2" options={{headerShown: false}}/>
            <Stack.Screen name="sub3" options={{headerShown: false}}/>
        </Stack>
    )
}