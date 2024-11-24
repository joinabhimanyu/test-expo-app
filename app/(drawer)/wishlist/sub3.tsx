import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';

const Sub3 = () => {
  const colorScheme = useColorScheme();
    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Sub3</Text>
                <Link href="/products" style={{
                    color: Colors[colorScheme ?? 'light'].primary
                }}><Text>Go Back</Text></Link>
            </View>
        </>
    )
}

export default Sub3