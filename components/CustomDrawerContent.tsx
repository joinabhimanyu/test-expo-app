import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, useColorScheme, Dimensions } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import baseStyles from '@/styles/baseStyles'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { loadingBlurHash } from '@/constants/Common';

const CustomDrawerContent = (props: any) => {
    const colorScheme = useColorScheme();
    const router = useRouter();

    return (
        <>
            <DrawerContentScrollView contentContainerStyle={styles.drawer} {...props}>
                <View style={styles.logoContainer}>
                    {/* <Image
                    source={require("@/assets/images/avatar.png")}
                    style={styles.img} /> */}

                    <Image
                        style={[styles.img]}
                        source={require("@/assets/images/avatar.png")}
                        placeholder={{ loadingBlurHash }}
                        contentFit="contain"
                        transition={1000}
                    />
                </View>
                <SafeAreaView style={{ flex: 1 }}>
                    <View>
                        <DrawerItemList {...props} />
                    </View>

                </SafeAreaView>
            </DrawerContentScrollView>
            <View style={[styles.footer, { backgroundColor: 'transparent' }]}>
                <View style={{
                    justifyContent: 'flex-end',
                    marginLeft: 20,
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            router.navigate({
                                pathname: '/'
                            });
                        }}
                        style={[baseStyles.primaryButton, {
                            backgroundColor: Colors[colorScheme ?? 'light'].text,
                            height: 50,
                        }]}>
                        <Text style={{ color: Colors[colorScheme ?? 'light'].searchBoxBackground }}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
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
        position: 'absolute',
        bottom: 5,
    },
});