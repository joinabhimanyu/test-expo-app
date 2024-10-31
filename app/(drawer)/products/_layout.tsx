import {Routes} from '@/constants/Routes';
import {Ionicons} from '@expo/vector-icons';
import {Slot, Stack, useGlobalSearchParams, useNavigation, usePathname, useRouter} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {TouchableHighlight, SafeAreaView, Text, StyleSheet, Alert, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";

export default function ProductsLayout() {

    const [title, setTitle] = useState('');
    const [backButtonEnabled, setBackButtonEnabled] = useState(false);
    const pathname = usePathname();
    const params = useGlobalSearchParams();
    const router = useRouter();
    const navigation = useNavigation()
    const colorScheme = useColorScheme()


    useEffect(() => {
        console.log('route change event fired')
        if (pathname) {
            for (const key of Object.keys(Routes?.routeMap)) {
                console.clear()
                if (Routes?.routeMap[key] && Routes?.routeMap[key].pattern && Routes?.routeMap[key].pattern.test(pathname)) {
                    console.log('pathname: ', pathname)
                    console.log('title: ', Routes?.routeMap[key].title)
                    setTitle(Routes?.routeMap[key].title);
                    setBackButtonEnabled((Routes?.routeMap[key].isNested || false))
                    break;
                }
            }
        }
    }, [pathname, params]);

    const onPressButton = () => {
        // Add your code here to handle the button press
        // show alert dialog
        Alert.alert("Button pressed!");
    };

    return (
        <>
            {/*<Stack.Screen*/}
            {/*    options={{*/}
            {/*        headerTitle: () => (*/}
            {/*            <Text style={{fontSize: 18}}>{title}</Text>*/}
            {/*        ),*/}
            {/*        headerTitleAlign: 'left',*/}
            {/*        headerTintColor: "black",*/}
            {/*        headerStyle: {backgroundColor: Colors[colorScheme ?? 'light'].stackHeaderBackground},*/}
            {/*        headerShown: true,*/}
            {/*        headerRight: () => (*/}
            {/*            <TouchableHighlight*/}
            {/*                underlayColor="transparent"*/}
            {/*                onPress={onPressButton}*/}
            {/*                style={{cursor: 'pointer', marginRight: 20}}>*/}
            {/*                <Ionicons name="cart" size={24}/>*/}
            {/*            </TouchableHighlight>*/}
            {/*        )*/}
            {/*    }}/>*/}
            {/*<SafeAreaProvider>*/}
            {/*    <SafeAreaView*/}
            {/*        style={styles.container}>*/}
            {/*        <Slot/>*/}
            {/*    </SafeAreaView>*/}
            {/*</SafeAreaProvider>*/}
            <Stack screenOptions={{
                headerShown: true
            }}>
                <Stack.Screen name="index"/>
                <Stack.Screen name="[id]"/>
            </Stack>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: "center",
    },
});