import React from 'react'
import {Stack} from "expo-router";

export default function PhotosLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
        </Stack>
    )
}