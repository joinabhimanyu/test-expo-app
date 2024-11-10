import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useColorScheme } from '@/hooks/useColorScheme'
import baseStyles from '@/styles/baseStyles'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'

const Register = () => {

    const router = useRouter();
    const { width } = Dimensions.get('screen');
    const colorScheme = useColorScheme();
    const [firstname, setfirstname] = React.useState('');
    const [lastname, setlastname] = React.useState('');
    // create state variables for new user registration
    const [username, setusername] = useState('');
    const [email, setemail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [phone, setphone] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [dob, setdob] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

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
            borderRadius: 10,
            backgroundColor: Colors[colorScheme ?? 'light'].imageBorderColor,
            fontSize: 16,
            height: 50,
            width: width * 0.8,
        },
    });

    return (

        <View style={styles.container}>
            <ScrollView>
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


            </ScrollView>

            <TouchableOpacity onPress={onPressRegisterHandler}
                style={[baseStyles.primaryButton, {
                    backgroundColor: Colors[colorScheme ?? 'light'].text,
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

    )
}


export default Register