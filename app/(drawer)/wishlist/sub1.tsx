import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';
import React from 'react'
import {View, Text, useColorScheme} from 'react-native'

export default function Sub1() {
    const colorScheme = useColorScheme();
    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Accounts</Text>
                <Link href="../" style={{
                    color: Colors[colorScheme ?? 'light'].primary
                }}><Text>Go Back</Text></Link>
            </View>
        </>
    )
}