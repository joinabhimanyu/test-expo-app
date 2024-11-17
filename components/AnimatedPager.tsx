import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'


const AnimatedPagerItem = ({ item, index, scrollX }:
    { item: string, index: number, scrollX: SharedValue<number> }) => {

    const { width } = Dimensions.get('screen');
    const pagerAnimatedStyle = useAnimatedStyle(() => ({
        // width interpolate on scrollx 
        width: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [10, 25, 10],
            Extrapolation.CLAMP
        ),
    }));
    return (
        <Animated.View key={index} style={
            [pagerAnimatedStyle, {
                height: 10,
                borderRadius: 30,
                marginLeft: 10,
                backgroundColor: 'black'
            }]
        }></Animated.View>
    )
}

const AnimatedPager = ({ items, scrollX }:
    { items: string[], scrollX: SharedValue<number> }) => {

    return (
        <View style={{
            flex: 1, flexDirection: 'row', marginBottom: 10,
            justifyContent: 'space-between', alignItems: 'center'
        }}>
            {items.map((item, index) => (
                <AnimatedPagerItem item={item} index={index} scrollX={scrollX} key={index} />
            ))}
        </View>
    )
}

export default AnimatedPager