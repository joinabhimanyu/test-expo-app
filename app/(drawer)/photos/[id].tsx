import { View, Text, useColorScheme, StyleSheet, Linking, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import WebView from 'react-native-webview';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const NewsDetails = () => {
    const { id: uri } = useLocalSearchParams<{ id: string }>();
    // const uri = 'https://stackoverflow.com/questions/35531679/react-native-open-links-in-browser';
    const webViewRef = useRef<WebView | null>();
    const colorScheme = useColorScheme();
    const router = useRouter();
    const [showSocial, setShowSocial] = useState(false);

    const animatedBottom1 = useSharedValue(50);
    const animatedBottom2 = useSharedValue(50);
    const animatedBottom3 = useSharedValue(50);

    useEffect(() => {
        if (showSocial) {
            animatedBottom1.value = withTiming(260, withSpring({ duration: 50 }));;
            animatedBottom2.value = withTiming(190, withSpring({ duration: 50 }));;
            animatedBottom3.value = withTiming(120, withSpring({ duration: 50 }));;
        } else {
            animatedBottom1.value = withTiming(50, withSpring({ duration: 50 }));;
            animatedBottom2.value = withTiming(50, withSpring({ duration: 50 }));;
            animatedBottom3.value = withTiming(50, withSpring({ duration: 50 }));;
        }
    }, [showSocial]);

    const animatedStyle1=useAnimatedStyle(()=>({
        bottom: animatedBottom1.value,
    }));
    const animatedStyle2=useAnimatedStyle(()=>({
        bottom: animatedBottom2.value,
    }));
    const animatedStyle3=useAnimatedStyle(()=>({
        bottom: animatedBottom3.value,
    }));

    const toggleShowSocial = () => {
        setShowSocial(!showSocial);
    }

    const renderWebView = () => (
        <>
            <WebView
                style={styles.webViewContainer}
                automaticallyAdjustContentInsets={false}
                startInLoadingState={true}
                ref={(ref) => (webViewRef.current = ref)}
                onLoadStart={() => {
                    console.log('Loading started');
                }}
                onLoadingComplete={() => {
                    console.log('Loading completed');
                }}
                onShouldStartLoadWithRequest={(event: any) => {
                    return true;
                }}
                onNavigationError={(event: any) => {
                    console.log('Error: ', event.nativeEvent.error);
                }}
                onMessage={(event: any) => {
                    console.log('Message: ', event.nativeEvent.data);
                }}
                onShouldClose={() => {
                    return true;
                }}
                onProgress={(event: any) => {
                    console.log('Progress: ', event.nativeEvent.progress);
                }}
                scalesPageToFit={true}
                source={{ uri }}
                onNavigationStateChange={(event: any) => {
                    if (event.url !== uri) {
                        webViewRef.current?.stopLoading();
                        Linking.openURL(event.url);
                    }
                }}
            />
            <Animated.View style={[styles.actionsContainer, animatedStyle1]}>
                <TouchableOpacity style={styles.logoContainer}>
                    <Ionicons name="logo-facebook" size={30} color={Colors[colorScheme ?? 'light'].primary} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.actionsContainer, animatedStyle2]}>
                <TouchableOpacity style={styles.logoContainer}>
                    <Ionicons name="logo-whatsapp" size={30} color={Colors[colorScheme ?? 'light'].primary} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.actionsContainer, animatedStyle3]}>
                <TouchableOpacity style={styles.logoContainer}>
                    <Ionicons name="share-social-sharp" size={30} color={Colors[colorScheme ?? 'light'].primary} />
                </TouchableOpacity>
            </Animated.View>
            <View style={[styles.actionsContainer, { bottom: 50, }]}>
                <TouchableOpacity style={styles.logoContainer} onPress={()=>toggleShowSocial()}>
                    <Ionicons name="expand-outline" size={30} color={Colors[colorScheme ?? 'light'].primaryButtonColor} />
                </TouchableOpacity>
            </View>
        </>
    )

    return (
        <View style={styles.container}>
            {uri ? (
                <>{renderWebView()}</>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>No news selected.</Text>
                    <TouchableOpacity style={{ marginVertical: 10 }} onPress={() => router.back()}>
                        <Text>Go back to articles</Text>
                    </TouchableOpacity>
                </View>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    webViewContainer: {
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    actionsContainer: {
        position: 'absolute',
        right: 0,
        width: 100,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingRight: 20,
        gap: 10,
    },
    logoContainer: {
        backgroundColor: '#faf7f7',
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
});

export default NewsDetails