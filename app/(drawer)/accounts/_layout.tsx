import React from 'react'
import {Stack} from "expo-router";

export default function AccountsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
        </Stack>
    )
}