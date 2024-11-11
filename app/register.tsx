import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useColorScheme } from '@/hooks/useColorScheme'
import baseStyles from '@/styles/baseStyles'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import createAnimatedComponent = Animated.createAnimatedComponent;
import { FlingGestureHandler, GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'

const Register = () => {

    const router = useRouter();
    const AnimatedIcon = createAnimatedComponent(Ionicons);
    const { width } = Dimensions.get('screen');
    const colorScheme = useColorScheme();

    // create state variables for new user registration
    const [firstname, setfirstname] = React.useState('');
    const [lastname, setlastname] = React.useState('');
    const [username, setusername] = useState('');
    const [email, setemail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [phone, setphone] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [dob, setdob] = React.useState('');
    const [address, setAddress] = React.useState('');

    // error and success states
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    // validation states
    const [isValid, setIsValid] = React.useState(false);

    // paging states
    const [page, setPage] = useState(1);

    // animated values
    const width1 = useSharedValue(10);
    const width2 = useSharedValue(10);
    const width3 = useSharedValue(10);

    const color1 = useSharedValue('white');
    const color2 = useSharedValue('white');
    const color3 = useSharedValue('white');

    useEffect(() => {
        if (firstname && lastname && username && email
            && password && confirmPassword
            && phone
            && gender
            && dob
            && address
            && password === confirmPassword
        ) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [
        firstname, lastname, username, email, password, confirmPassword, phone, gender, dob, address
    ])

    useEffect(() => {
        if (page == 1) {

            width1.value = withTiming(20, withSpring({ duration: 50 }));
            width2.value = withTiming(10, withSpring({ duration: 50 }));
            width3.value = withTiming(10, withSpring({ duration: 50 }));

            color1.value = withTiming(Colors[colorScheme ?? 'light'].secondary, withSpring({ duration: 50 }));
            color2.value = withTiming(Colors[colorScheme ?? 'light'].icon, withSpring({ duration: 50 }));
            color3.value = withTiming(Colors[colorScheme ?? 'light'].icon, withSpring({ duration: 50 }));

        } else if (page == 2) {

            width1.value = withTiming(10, withSpring({ duration: 50 }));
            width2.value = withTiming(20, withSpring({ duration: 50 }));
            width3.value = withTiming(10, withSpring({ duration: 50 }));

            color1.value = withTiming(Colors[colorScheme ?? 'light'].icon, withSpring({ duration: 50 }));
            color2.value = withTiming(Colors[colorScheme ?? 'light'].secondary, withSpring({ duration: 50 }));
            color3.value = withTiming(Colors[colorScheme ?? 'light'].icon, withSpring({ duration: 50 }));

        } else if (page == 3) {

            width1.value = withTiming(10, withSpring({ duration: 50 }));
            width2.value = withTiming(10, withSpring({ duration: 50 }));
            width3.value = withTiming(20, withSpring({ duration: 50 }));

            color1.value = withTiming(Colors[colorScheme ?? 'light'].icon, withSpring({ duration: 50 }));
            color2.value = withTiming(Colors[colorScheme ?? 'light'].icon, withSpring({ duration: 50 }));
            color3.value = withTiming(Colors[colorScheme ?? 'light'].secondary, withSpring({ duration: 50 }));
        }
    }, [page]);

    const animatedStyle1 = useAnimatedStyle(() => ({
        width: width1.value,
        backgroundColor: color1.value,
    }));

    const animatedStyle2 = useAnimatedStyle(() => ({
        width: width2.value,
        backgroundColor: color2.value,
    }));

    const animatedStyle3 = useAnimatedStyle(() => ({
        width: width3.value,
        backgroundColor: color3.value,
    }));

    const onPressRegisterHandler = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setError('');
            router.back();
        }, 1000);
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: 20,
            backgroundColor: 'white'
        },
        fieldContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
            marginBottom: 10
        },
        field: {
            borderWidth: 1,
            borderColor: Colors[colorScheme ?? 'light'].fieldBorderColor,
            padding: 10,
            borderRadius: 30,
            backgroundColor: Colors[colorScheme ?? 'light'].imageBorderColor,
            fontSize: 14,
            height: 50,
            width: width * 0.8,
        },
        paginationContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 0,
            marginBottom: 20,
            width: '90%'
        },
        paginationControl: {
            borderWidth: 1,
            borderColor: Colors[colorScheme ?? 'light'].paginationControlBorderColor,
            padding: 5,
            borderRadius: 30,
            backgroundColor: Colors[colorScheme ?? 'light'].paginationControlBackgroundColor,
            fontSize: 14,
            marginLeft: 10,
            width: 35
        },
        iconStyle: { height: 10, borderRadius: 30, marginLeft: 10 }
    });

    const onSwipeableOpen = (direction: any) => {
        console.log('onSwipeableOpen: ', direction);
        if (direction == 'left') {
            switch (page) {
                case 1:
                    setPage(3)
                    break;
                case 2:
                    setPage(1)
                    break;
                case 3:
                    setPage(2)
                    break;
                default:
                    break;
            }

        } else if (direction == 'right') {
            switch (page) {
                case 1:
                    setPage(2)
                    break;
                case 2:
                    setPage(3)
                    break;
                case 3:
                    setPage(1)
                    break;
                default:
                    break;
            }
        }
    }

    const renderSwipeable = () => (
        <Swipeable
            // onBegan={() => onSwipeableOpen("right")}
            onSwipeableOpenStartDrag={(direction)=>onSwipeableOpen(direction)}>
            {renderSections()}
        </Swipeable>
    )
    const renderSections = () => {
        if (page == 1) {
            return (
                <>
                    <View style={styles.fieldContainer}>
                        <TextInput
                            placeholder='Enter first name'
                            value={firstname}
                            onChangeText={(text: string) => setfirstname(text)}
                            style={[styles.field]} />

                        <View style={{ position: 'absolute', right: 20, top: 22 }}>
                            <TouchableOpacity onPress={() => setfirstname('')}>
                                <Ionicons name='close-circle' size={20} color={Colors[colorScheme ?? 'light'].icon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <TextInput
                            placeholder='Enter last name'
                            value={lastname}
                            onChangeText={(text: string) => setlastname(text)}
                            style={[styles.field]} />

                        <View style={{ position: 'absolute', right: 20, top: 22 }}>
                            <TouchableOpacity onPress={() => setlastname('')}>
                                <Ionicons name='close-circle' size={20} color={Colors[colorScheme ?? 'light'].icon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <TextInput
                            placeholder='Enter user name'
                            value={username}
                            onChangeText={(text: string) => setusername(text)}
                            style={[styles.field]} />

                        <View style={{ position: 'absolute', right: 20, top: 22 }}>
                            <TouchableOpacity onPress={() => setusername('')}>
                                <Ionicons name='close-circle' size={20} color={Colors[colorScheme ?? 'light'].icon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <TextInput
                            placeholder='Enter email'
                            value={email}
                            onChangeText={(text: string) => setemail(text)}
                            style={[styles.field]} />

                        <View style={{ position: 'absolute', right: 20, top: 22 }}>
                            <TouchableOpacity onPress={() => setemail('')}>
                                <Ionicons name='close-circle' size={20} color={Colors[colorScheme ?? 'light'].icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )
        }
        if (page == 2) {
            return (
                <>
                    <View style={styles.fieldContainer}>
                        <TextInput
                            placeholder='Enter password'
                            value={password}
                            onChangeText={(text: string) => setPassword(text)}
                            style={[styles.field]} />

                        <View style={{ position: 'absolute', right: 20, top: 22 }}>
                            <TouchableOpacity onPress={() => setPassword('')}>
                                <Ionicons name='close-circle' size={20} color={Colors[colorScheme ?? 'light'].icon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <TextInput
                            placeholder='Enter confirm password'
                            value={confirmPassword}
                            onChangeText={(text: string) => setConfirmPassword(text)}
                            style={[styles.field]} />

                        <View style={{ position: 'absolute', right: 20, top: 22 }}>
                            <TouchableOpacity onPress={() => setConfirmPassword('')}>
                                <Ionicons name='close-circle' size={20} color={Colors[colorScheme ?? 'light'].icon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <TextInput
                            placeholder='Enter dob'
                            value={dob}
                            onChangeText={(text: string) => setdob(text)}
                            style={[styles.field]} />

                        <View style={{ position: 'absolute', right: 20, top: 22 }}>
                            <TouchableOpacity onPress={() => setdob('')}>
                                <Ionicons name='close-circle' size={20} color={Colors[colorScheme ?? 'light'].icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )
        }
        if (page == 3) {
            return (
                <>
                    <View style={styles.fieldContainer}>
                        <TextInput
                            placeholder='Enter phone'
                            value={phone}
                            onChangeText={(text: string) => setphone(text)}
                            style={[styles.field]} />

                        <View style={{ position: 'absolute', right: 20, top: 22 }}>
                            <TouchableOpacity onPress={() => setphone('')}>
                                <Ionicons name='close-circle' size={20} color={Colors[colorScheme ?? 'light'].icon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <TextInput
                            placeholder='Enter gender'
                            value={gender}
                            onChangeText={(text: string) => setGender(text)}
                            style={[styles.field]} />

                        <View style={{ position: 'absolute', right: 20, top: 22 }}>
                            <TouchableOpacity onPress={() => setGender('')}>
                                <Ionicons name='close-circle' size={20} color={Colors[colorScheme ?? 'light'].icon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <TextInput
                            placeholder='Enter address'
                            value={address}
                            onChangeText={(text: string) => setAddress(text)}
                            style={[styles.field]} />

                        <View style={{ position: 'absolute', right: 20, top: 22 }}>
                            <TouchableOpacity onPress={() => setAddress('')}>
                                <Ionicons name='close-circle' size={20} color={Colors[colorScheme ?? 'light'].icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )
        }
    }

    const renderControls = () => {
        return (
            <View style={[styles.paginationContainer,]}>
                {/* <TouchableOpacity style={styles.paginationControl} onPress={() => {
                        if (page > 1) {
                            setPage(page - 1)
                        }
                    }}>
                        <Ionicons name="caret-back" size={24} color={page == 1 ? Colors[colorScheme ?? 'light'].icon : Colors[colorScheme ?? 'light'].secondary} />
                    </TouchableOpacity> */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    {/* <AnimatedIcon style={{marginLeft:10}} name="remove-circle" animatedProps={animatedProp1}
                            size={page==1?18:12} />
                        <AnimatedIcon style={{marginLeft:10}} name="remove-circle" animatedProps={animatedProp2}
                            size={page==2?18:12} />
                        <AnimatedIcon style={{marginLeft:10}} name="remove-circle" animatedProps={animatedProp3}
                            size={page==3?18:12} /> */}


                    <TouchableOpacity onPress={() => setPage(1)}>
                        <Animated.View style={[animatedStyle1, styles.iconStyle]}>
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPage(2)}>
                        <Animated.View style={[animatedStyle2, styles.iconStyle]}>
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPage(3)}>
                        <Animated.View style={[animatedStyle3, styles.iconStyle]}>
                        </Animated.View>
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity style={styles.paginationControl} onPress={() => {
                        if (page < 3) {
                            setPage(page + 1)
                        }
                    }}>
                        <Ionicons name="caret-forward" size={24} color={page == 3 ? Colors[colorScheme ?? 'light'].icon : Colors[colorScheme ?? 'light'].secondary} />
                    </TouchableOpacity> */}
            </View>
        )
    }

    return (

        <View style={styles.container}>
            <>
                {renderControls()}
                <GestureHandlerRootView>
                    {renderSwipeable()}
                </GestureHandlerRootView>
            </>

            <View style={{ position: 'absolute', left: 20, bottom: 20, width: '100%' }}>
                <Text style={{color: Colors[colorScheme??'light'].icon, marginLeft: 10, fontWeight: '400', letterSpacing: 1.0}}>Swipe left or right to continue</Text>
                <TouchableOpacity onPress={onPressRegisterHandler}
                    disabled={!isValid}
                    style={[baseStyles.primaryButton, {
                        backgroundColor: isValid ? Colors[colorScheme ?? 'light'].text : Colors[colorScheme ?? 'light'].icon,
                        marginTop: 10,
                        marginBottom: 0,
                        width: '100%',
                        alignSelf: 'center',
                    }]}>
                    {loading ? (
                        <ActivityIndicator color={Colors[colorScheme ?? 'light'].background} size="small" />
                    ) : (
                        <Text style={{ color: Colors[colorScheme ?? 'light'].imageBackgroundColor }}>Register</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View >

    )
}


export default Register