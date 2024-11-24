import React from 'react'
import { Stack, useNavigation } from "expo-router";
import { Colors } from '@/constants/Colors';
import { TouchableHighlight, useColorScheme } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function WishlistLayout() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerTitleAlign: 'left',
                headerTintColor: Colors[colorScheme ?? 'light'].secondary,
                headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].stackHeaderBackground },
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
            }}>
            <Stack.Screen name="sub1" options={{ headerTitle: 'Sub Menu 1', }} />
            <Stack.Screen name="sub2" options={{ headerTitle: 'Sub Menu 2', }} />
            <Stack.Screen name="sub3" options={{ headerTitle: 'Sub Menu 3', }} />
        </Stack>
    )
}