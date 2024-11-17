import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import baseStyles from '@/styles/baseStyles'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from "@/constants/Colors";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { useColorScheme } from "@/hooks/useColorScheme";

const CarouselListItemContainer = ({ index, scrollX, children }:
    { index: number, scrollX: SharedValue<number>, children: ReactNode }) => {

    const { width } = Dimensions.get('screen');
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20
        }
    });

    const listItemAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [-width * 0.25, 0, width * 0.25],
                        Extrapolation.CLAMP
                    ),
                },
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [0.9, 1, 0.9],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

    return (
        <Animated.View style={[styles.container, listItemAnimatedStyle]}>
            {children}
        </Animated.View>
    )
}

export default CarouselListItemContainer
