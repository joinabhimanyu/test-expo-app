import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, ActivityIndicator, Alert }
    from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import baseStyles from '@/styles/baseStyles'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'

import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming
} from 'react-native-reanimated'

import createAnimatedComponent = Animated.createAnimatedComponent;

const Home = () => {
    const colorScheme = useColorScheme();
    const { width } = Dimensions.get('screen');
    const fontsize = useSharedValue(0);
    const marginTop = useSharedValue(0);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const AnimatedIonicons = createAnimatedComponent(Ionicons);
    const rotationAnimation = useSharedValue(0);

    useEffect(() => {

        marginTop.value = withRepeat(
            withSequence(
                withTiming(
                    20,
                    { duration: 300, easing: Easing.linear }
                ),
                withTiming(
                    40,
                    { duration: 200, easing: Easing.linear }
                ),
                withTiming(
                    60,
                    { duration: 150, easing: Easing.linear }
                ),
                withTiming(
                    80,
                    { duration: 100, easing: Easing.linear }
                ),
            ),
            1
        );

        fontsize.value = withRepeat(
            withSequence(
                withTiming(
                    16,
                    { duration: 150, easing: Easing.out(Easing.exp) }
                ),
                withTiming(
                    26,
                    { duration: 150, easing: Easing.out(Easing.exp) }
                ),
                withTiming(
                    45,
                    { duration: 100, easing: Easing.out(Easing.exp) }
                ),
            ),
            1
        );

    }, []);

    const animatedIconStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotationAnimation.value}deg` }],
    }))

    const animatedStyle = useAnimatedStyle(() => ({
        fontSize: fontsize.value
    }))

    const containerAnimatedStyle = useAnimatedStyle(() => ({
        marginTop: marginTop.value
    }))

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors[colorScheme ?? 'light'].background
        },
        userNameContainer: {
            marginBottom: 20
        },
        passwordContainer: {
            marginBottom: 10
        },
        field: {
            borderWidth: 1,
            borderColor: Colors[colorScheme ?? 'light'].fieldBorderColor,
            padding: 10,
            borderRadius: 10,
            backgroundColor: Colors[colorScheme ?? 'light'].imageBorderColor,
            fontSize: 16,
            height: 50,
            width: width * 0.8,
        },
        logoContainer: {
            marginBottom: 40,
            // marginTop: 80
        },
        fontText: {
            // fontSize: 40,
            letterSpacing: 1.5,
            fontFamily: 'HelveticaLight',
            fontWeight: 400,
            color: Colors[colorScheme ?? 'light'].secondary,
            textShadowColor: Colors[colorScheme ?? 'light'].icon,
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 5
        },
        socialMediaContainer: {
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: 20,
            marginBottom: 20,
            paddingHorizontal: 20,
        }
    });

    const [showCloseIconUsername, setShowCloseIconUsername] = useState(false);
    const [showCloseIconPassword, setShowCloseIconPassword] = useState(false);
    const [showSecurePassword, setShowSecurePassword] = useState(false);

    const onFocusUserNameHandler = () => {
        setShowCloseIconUsername(true)
    }

    const onBlurUserNameHandler = () => {
        setShowCloseIconUsername(false)
    }

    const onFocusPasswordHandler = () => {
        setShowCloseIconPassword(true)
    }

    const onBlurPasswordHandler = () => {
        setShowCloseIconPassword(false)
    }

    const clearUserNameHandler = () => setUsername('')

    const clearPasswordHandler = () => setPassword('')

    const showPasswordHandler = () => {
        if (showSecurePassword) {
            rotationAnimation.value = withTiming(0, withSpring({ duration: 50 }));

        } else {
            rotationAnimation.value = withTiming(90, withSpring({ duration: 50 }));
        }
        setShowSecurePassword(!showSecurePassword);
    }

    const onSignUpPressHandler=()=>false;

    const onLoginPressHandler = () => {
        // Handle login logic here
        if (username && password) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                router.replace({
                    pathname: '/products',
                })
            }, 1000);
        } else {
            Alert.alert('Alert', 'Please enter both username and password')
        }
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[containerAnimatedStyle, styles.logoContainer]}>
                <Animated.Text style={[animatedStyle, styles.fontText]}>Instagramicons</Animated.Text>
                {/* <Text style={styles.fontText}>Instagramicons</Text> */}
            </Animated.View>
            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                <View style={styles.userNameContainer}>
                    <TextInput
                        placeholder='Enter user name'
                        value={username}
                        onChangeText={(text: string) => setUsername(text)}
                        onFocus={onFocusUserNameHandler}
                        onBlur={onBlurUserNameHandler}
                        style={[styles.field]} />

                    <View style={{ position: 'absolute', right: 10, top: 15 }}>

                        {showCloseIconUsername ? (
                            <TouchableOpacity onPress={clearUserNameHandler}>
                                <Ionicons name='close-circle' size={20} color={Colors[colorScheme ?? 'light'].icon} />
                            </TouchableOpacity>
                        ) : null}

                    </View>
                </View>

                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder='Enter password'
                        value={password}
                        onChangeText={(text: string) => setPassword(text)}
                        onFocus={onFocusPasswordHandler}
                        onBlur={onBlurPasswordHandler}
                        secureTextEntry={!showSecurePassword}
                        style={[styles.field]} />

                    <View style={{ position: 'absolute', right: 10, top: 15 }}>

                        {showCloseIconPassword ? (
                            <TouchableOpacity onPress={clearPasswordHandler}>
                                <Ionicons name='close-circle' size={20} color={Colors[colorScheme ?? 'light'].icon} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={showPasswordHandler}>
                                <AnimatedIonicons
                                    name="eye"
                                    style={animatedIconStyle}
                                    size={20} color={Colors[colorScheme ?? 'light'].icon} />
                            </TouchableOpacity>
                        )}

                    </View>
                </View>

                <Link href=".." style={{ alignSelf: 'flex-end', marginBottom: 30 }} onPress={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}>
                    <Text style={{ color: Colors[colorScheme ?? 'light'].icon, fontWeight: 'bold', marginTop: 10 }}>Forgot Password?</Text>
                </Link>

            </View>

            <View style={{ position: 'absolute', bottom: 20, left: 20 }}>
                <TouchableOpacity onPress={onSignUpPressHandler}>
                    <Text style={{ color: Colors[colorScheme ?? 'light'].icon }}>Don't have an account? Sign up.</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.socialMediaContainer}>
                <TouchableOpacity style={[baseStyles.socialButton, { backgroundColor: Colors[colorScheme ?? 'light'].facebookIconBackground }]}>
                    <Ionicons name='logo-facebook' size={20} color='white' />
                </TouchableOpacity>
                <TouchableOpacity style={[baseStyles.socialButton, { backgroundColor: Colors[colorScheme ?? 'light'].googleIconBackground }]}>
                    <Ionicons name='logo-google' size={20} color='white' />
                </TouchableOpacity>
                <TouchableOpacity style={[baseStyles.socialButton, { backgroundColor: Colors[colorScheme ?? 'light'].twitterIconBackground }]}>
                    <Ionicons name='logo-twitter' size={20} color='white' />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={onLoginPressHandler} style={[baseStyles.primaryButton, {
                backgroundColor: Colors[colorScheme ?? 'light'].text,
            }]}>
                {isLoading ? (
                    <ActivityIndicator color={Colors[colorScheme ?? 'light'].background} size="small" />
                ) : (
                    <Text style={{ color: Colors[colorScheme ?? 'light'].imageBackgroundColor }}>Login</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default Home
