import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet } from 'react-native'
import React from 'react'
import baseStyles from '@/styles/baseStyles'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from "@/constants/Colors";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { useColorScheme } from "@/hooks/useColorScheme";

const CarouselListItem = ({ item, index, scrollX, title, description }:
    { item: string, index: number, scrollX: SharedValue<number>, title: string | undefined, description: string | undefined }) => {

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
            <Image
                source={{ uri: item }}
                style={[baseStyles.shadowBase, {
                    borderRadius: 20,
                    width: 280,
                    height: 500,
                    marginTop: 20,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: Colors[colorScheme ?? 'light'].imageBorderColor,
                    backgroundColor: Colors[colorScheme ?? 'light'].imageBackgroundColor,
                }]} />
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={{
                    position: 'absolute',
                    width: 280,
                    height: 500,
                    borderRadius: 20,
                    padding: 20,
                    justifyContent: 'space-between'
                }}
            >
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ backgroundColor: Colors[colorScheme ?? 'light'].icon, borderRadius: 30, padding: 5 }}>
                        <Ionicons name="heart-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 18,
                        letterSpacing: 1.5
                    }}>{title}</Text>

                    <Text style={{ paddingTop: 10, color: 'white', fontSize: 12, letterSpacing: 1.2 }}>{description}</Text>
                </View>
            </LinearGradient>
        </Animated.View>
    )
}

export default CarouselListItem
