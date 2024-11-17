import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import baseStyles from '@/styles/baseStyles'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

const CarouselListItem = ({ item, title, description }:
    { item: string, title: string | undefined, description: string | undefined }) => {
    const colorScheme = useColorScheme()
    return (
        <>
            <Image
                source={{ uri: item }}
                style={[baseStyles.shadowBase, {
                    borderRadius: 20,
                    width: 280,
                    height: 500,
                    marginTop: 20,
                    marginBottom: 10,
                    borderWidth: 2,
                    borderColor: Colors[colorScheme ?? 'light'].text,
                    backgroundColor: Colors[colorScheme ?? 'light'].text,
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
        </>
    )
}

export default CarouselListItem