import PageLoader from '@/components/PageLoader';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import React, { useRef, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Linking, Dimensions, TouchableOpacity, useColorScheme } from 'react-native'
import WebView from 'react-native-webview';

export default function Photos() {
    const uri = 'https://stackoverflow.com/questions/35531679/react-native-open-links-in-browser';
    const webViewRef = useRef<WebView | null>();
    const colorScheme = useColorScheme();

    return (
        <View style={styles.container}>
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
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.logoContainer}>
                    <Ionicons name="logo-facebook" size={30} color={Colors[colorScheme ?? 'light'].primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoContainer}>
                    <Ionicons name="logo-whatsapp" size={30} color={Colors[colorScheme ?? 'light'].primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoContainer}>
                    <Ionicons name="share-social-sharp" size={30} color={Colors[colorScheme ?? 'light'].primary} />
                </TouchableOpacity>
            </View>

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
        top: Dimensions.get('screen').height * 0.6,
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
        shadowOffset: { width: 15, height: 15 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 15,
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
})