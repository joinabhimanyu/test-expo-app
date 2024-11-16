import { View, Text, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const PageLoader = () => {
    const colorScheme = useColorScheme();
    const { width, height } = Dimensions.get('screen');

    return (
        <View style={{
            position: 'absolute',
            // center of screen
            top: height * 0.1,
            left: width * 0.5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 30,
            backgroundColor: '#FFFFFF',
            width: 40,
            height: 40,
            padding: 10,

            shadowColor: Colors[colorScheme ?? 'light'].shadowColor2,
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            // elevation: 30,
        }}>
            <ActivityIndicator size="small" color={Colors[colorScheme ?? 'light'].secondary} />
        </View>
    )
}

export default PageLoader