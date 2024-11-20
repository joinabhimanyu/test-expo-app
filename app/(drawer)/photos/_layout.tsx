import React from 'react'
import { Stack, useNavigation } from "expo-router";
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

export default function PhotosLayout() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerTitleAlign: 'left',
                headerTintColor: Colors[colorScheme ?? 'light'].secondary,
                headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].stackHeaderBackground },
            }}
        >
            <Stack.Screen name="index" options={{
                headerTitle: 'News',
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
            <Stack.Screen name="[id]" options={{ headerTitle: 'Details' }} />
        </Stack>
    )
}