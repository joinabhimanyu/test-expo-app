import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const AnimatedScrollView = ({ renderHeader, renderContent, ...restProps }: {
    renderHeader: ({ headerHeight }: { headerHeight: number }) => ReactNode,
    renderContent: () => ReactNode,
    restProps?: any[]
}) => {

    const scrollY = useSharedValue(0);
    const HEADER_HEIGHT = 550;


    const onScrollHandlerScrollView = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollY.value = e.contentOffset.y;
        }
    });

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [-850, 0, 850],
                [HEADER_HEIGHT, HEADER_HEIGHT, -100],
                Extrapolation.CLAMP
            ),
            marginBottom: interpolate(
                scrollY.value,
                [-850, 0, 850],
                [0, 0, 20],
                Extrapolation.CLAMP
            ),
        };
    });

    return (
        <Animated.ScrollView onScroll={onScrollHandlerScrollView}>
            <Animated.View
                style={[
                    {
                        height: HEADER_HEIGHT,
                        overflow: 'hidden',
                    },
                    { backgroundColor: 'white' },
                    headerAnimatedStyle,
                ]}>
                <AnimatedScrollView.Header {...restProps}>
                    {renderHeader({ headerHeight: HEADER_HEIGHT })}
                </AnimatedScrollView.Header>
            </Animated.View>

            <AnimatedScrollView.Content {...restProps}>
                {renderContent()}
            </AnimatedScrollView.Content>
        </Animated.ScrollView>
    )
}

AnimatedScrollView.Header = function AnimatedScrollViewHeader({ children, ...restProps }: {
    children: ReactNode,
    restProps?: any[]
}) {
    return (
        <View {...restProps}>
            {children}
        </View>
    )
}

AnimatedScrollView.Content = function AnimatedScrollViewContent({ children, ...restProps }: {
    children: ReactNode,
    restProps?: any[]
}) {
    return (
        <View {...restProps}>
            {children}
        </View>
    )
}

export default AnimatedScrollView;
