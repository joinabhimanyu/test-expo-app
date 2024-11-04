import {StyleSheet} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence,
    withSpring, Easing, useAnimatedProps
} from 'react-native-reanimated';

import {ThemedText} from '@/components/ThemedText';
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import createAnimatedComponent = Animated.createAnimatedComponent;

export function HelloWave() {
    const rotationAnimation = useSharedValue(0);
    const backgroundColor = useSharedValue<string>("#fff");
    const AnimatedFontAwesome = createAnimatedComponent(FontAwesome);

    rotationAnimation.value = withSequence(
        withTiming(360, withSpring({duration: 50})),
        withTiming(0, withSpring({duration: 150}))
    );

    backgroundColor.value = withSequence(
        withTiming(
            "black",
            {duration: 300, easing: Easing.linear}
        ),
        withTiming(
            "#9bdff2",
            {duration: 100, easing: Easing.linear}
        ),
    )

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{rotate: `${rotationAnimation.value}deg`}],
    }));

    const animatedProps = useAnimatedProps(() => ({
        color: backgroundColor.value
    }))

    return (
        <Animated.View style={{...animatedStyle}}>
            {/*<ThemedText style={styles.text}>👋</ThemedText>*/}
            <AnimatedFontAwesome name="check-circle" size={300} animatedProps={animatedProps} />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
    },
});
