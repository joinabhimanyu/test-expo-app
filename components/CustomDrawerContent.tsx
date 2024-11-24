import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, useColorScheme, Dimensions } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import baseStyles from '@/styles/baseStyles'
import { Colors } from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'
import { loadingBlurHash } from '@/constants/Common';
import { CustomDrawerItemList } from './CustomDrawerItemList';
import { ScrollView } from 'react-native-gesture-handler';

const { height } = Dimensions.get('screen');
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
                <SafeAreaView style={{ height: height, backgroundColor: 'transparent' }}>
                    <ScrollView>
                        <CustomDrawerItemList {...props} />
                    </ScrollView>

                </SafeAreaView>
            </DrawerContentScrollView>
            <View style={[styles.footer, { backgroundColor: 'transparent' }]}>
                <Link style={{alignSelf:'center'}} href="/">
                    <Text style={{ color: Colors[colorScheme ?? 'light'].icon, fontWeight: 'bold', fontSize: 16 }}>Log Out</Text>
                </Link>
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
        flex:1,
        width: Dimensions.get('screen').width*0.7,
        alignItems:'center',
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        position: 'absolute',
        bottom: 20,
    },
});