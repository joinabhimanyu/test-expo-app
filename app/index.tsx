import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import baseStyles from '@/styles/baseStyles'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated'

const Home = () => {
    const colorScheme = useColorScheme();
    const { width } = Dimensions.get('screen');
    const fontsize = useSharedValue(0);
    const marginTop = useSharedValue(0);
    const [isLoading, setIsLoading] = useState(false);
    const router=useRouter();

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
            backgroundColor: '#F5F5F5'
        },
        userNameContainer: {
            marginBottom: 20
        },
        passwordContainer: {
            marginBottom: 10
        },
        field: {
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#fff',
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
            fontFamily: 'HelveticaLight',
            fontWeight: 600,
            color: 'black',
            textShadowColor: 'gray',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 5
        }
    });

    const [showCloseIconUsername, setShowCloseIconUsername] = useState(false);
    const [showCloseIconPassword, setShowCloseIconPassword] = useState(false);

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

    const clearUserNameHandler = () => false

    const clearPasswordHandler = () => false

    const showPasswordHandler = () => false

    const onLoginPressHandler = () => {
        // Handle login logic here
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            router.navigate({
                pathname: '/(drawer)/products'
            })
        }, 1000);
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
                        onFocus={onFocusUserNameHandler}
                        onBlur={onBlurUserNameHandler}
                        style={[styles.field]} />

                    <View style={{ position: 'absolute', right: 10, top: 15 }}>

                        {showCloseIconUsername ? (
                            <TouchableOpacity onPress={clearUserNameHandler}>
                                <Ionicons name='close-circle' size={20} color="gray" />
                            </TouchableOpacity>
                        ) : null}

                    </View>
                </View>

                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder='Enter password'
                        onFocus={onFocusPasswordHandler}
                        onBlur={onBlurPasswordHandler}
                        secureTextEntry={true} style={[styles.field]} />

                    <View style={{ position: 'absolute', right: 10, top: 15 }}>

                        {showCloseIconPassword ? (
                            <TouchableOpacity onPress={clearPasswordHandler}>
                                <Ionicons name='close-circle' size={20} color="gray" />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={showPasswordHandler}>
                                <Ionicons name='eye' size={20} color="gray" />
                            </TouchableOpacity>
                        )}

                    </View>
                </View>

                <Link href=".." style={{ alignSelf: 'flex-end', marginBottom: 30 }} onPress={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}>
                    <Text style={{ color: 'gray', fontWeight: 'bold', marginTop: 10 }}>Forgot Password?</Text>
                </Link>

            </View>

            <TouchableOpacity onPress={onLoginPressHandler} style={[baseStyles.primaryButton, {
                backgroundColor: Colors[colorScheme ?? 'light'].text,
            }]}>
                {isLoading ? (
                    <ActivityIndicator color={Colors[colorScheme ?? 'light'].background} size="small" />
                ) : (
                    <Text style={{ color: 'white' }}>Login</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default Home
