import { View, Text, TextInput, Dimensions, useColorScheme, TouchableOpacity } from 'react-native'
import React from 'react'
import Animated, { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import baseStyles from '@/styles/baseStyles';
import createAnimatedComponent = Animated.createAnimatedComponent;

const AnimatedSearchAndLoadMore = ({searchTerm, setSearchTerm, fetchData, showLoadMore}: {
    searchTerm: string,
    setSearchTerm: (term: string) => void,
    fetchData: () => void,
    showLoadMore: SharedValue<boolean>
}) => {
    const {width, height} =Dimensions.get('screen');
    const colorScheme=useColorScheme();

    
    const AnimatedTouchableOpacity = createAnimatedComponent(TouchableOpacity);
    const animatedTouchableOpacityStyle = useAnimatedStyle(() => ({
        transform: [{ scale: showLoadMore.value ? 1 : 0 }]
    }));

    return (
        <Animated.View style={[{ position: 'absolute', marginBottom: 20, top: 12, width: width, zIndex: 100000, backgroundColor: 'rgba(0, 0, 0, 0)' }]}>
            <View style={{
                flexDirection: 'row', alignSelf: 'center', width: width * 0.8,
                backgroundColor: 'transparent', borderRadius: 30
            }}>
                <TextInput
                    style={{
                        backgroundColor: Colors[colorScheme ?? 'light'].searchBoxBackground,
                        alignSelf: 'flex-start',
                        flex: 1,
                        height: 50,
                        paddingLeft: 30,
                        borderRadius: 30,
                        textAlign: 'justify',
                        textAlignVertical: 'bottom',
                        shadowColor: Colors[colorScheme ?? 'light'].shadowColor,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                    placeholder={`Enter search term`}
                    value={searchTerm}
                    onChangeText={(text) => {
                        setSearchTerm(text);
                    }} />
                <View style={{ position: 'absolute', right: 10, top: 5, justifyContent: 'center', flex: 1, height: 40 }}>
                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => {
                        fetchData();
                    }}>
                        <FontAwesome name="search" size={14} />
                    </TouchableOpacity>
                </View>
            </View>
            <AnimatedTouchableOpacity style={[baseStyles.primaryButton, animatedTouchableOpacityStyle,
            {
                // display: showLoadMore ? 'flex' : 'none',
                backgroundColor: Colors[colorScheme ?? 'light'].secondary,
                alignSelf: 'center',
                marginBottom: 0,
                width: '40%'

            }]} onPress={() => fetchData()}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
                    <Ionicons name="refresh" size={17} color={Colors[colorScheme ?? 'light'].searchBoxBackground} />
                    <Text style={{ color: 'white' }}>LOAD MORE</Text>
                </View>
            </AnimatedTouchableOpacity>
        </Animated.View>
    )
}

export default AnimatedSearchAndLoadMore