import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import CarouselListItemContainer from './CarouselListItemContainer'
import CarouselListItem from './CarouselListItem'
import AnimatedPager from './AnimatedPager'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

const CarouselAnimatedFlatList = ({ items, renderItemContent }: {
    items: string[], renderItemContent: ({ item, index }: { item: string, index: number }) => ReactNode
}) => {

    const scrollX = useSharedValue(0);
    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        }
    });

    return (
        <>
            <Animated.FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                data={items}
                keyExtractor={(item) => item}
                onScroll={onScrollHandler}
                renderItem={({ item, index }) => {
                    return (
                        <CarouselListItemContainer index={index} scrollX={scrollX}>
                            {renderItemContent({ item, index })}
                        </CarouselListItemContainer>
                    )
                }} />
            <AnimatedPager items={items} scrollX={scrollX} />
        </>
    )
}

export default CarouselAnimatedFlatList