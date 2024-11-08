import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, useColorScheme } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import baseStyles from '@/styles/baseStyles'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

const CustomDrawerContent = (props: any) => {
    const colorScheme = useColorScheme();
    const router = useRouter();

    return (
        <DrawerContentScrollView contentContainerStyle={styles.drawer} {...props}>
            <View style={styles.logoContainer}>
                <Image
                    source={require("@/assets/images/icon.png")}
                    style={styles.img} />
            </View>
            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    <DrawerItemList {...props} />
                </View>
                <View style={styles.footer}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 25 }}>
                        <TouchableOpacity
                            onPress={() => {
                                router.navigate({
                                    pathname: '/'
                                });
                            }}
                            style={[baseStyles.primaryButton, {
                                backgroundColor: Colors[colorScheme ?? 'light'].text
                            }]}>
                            <Text style={{ color: 'white' }}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent


const styles = StyleSheet.create({
    drawer: {
        flex: 1,
        // justifyContent: 'space-between'
    },
    logoContainer: {
        height: 140,
        width: "80%",
        marginTop: 20,
        marginBottom: 20,
        alignSelf: "center",
    },
    img: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        marginTop: 6,
        justifyContent: 'center',
        textAlignVertical: 'center',
    },
    footer: {
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
        position: 'absolute',
        bottom: 0,
    },
});