import {Routes} from '@/constants/Routes';
import {Ionicons} from '@expo/vector-icons';
import {Stack, useGlobalSearchParams, useNavigation, usePathname, useRouter} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {TouchableHighlight, Text, StyleSheet, Alert} from 'react-native';
import {useColorScheme} from "@/hooks/useColorScheme";
import {Colors} from "@/constants/Colors";

export default function ProductsLayout() {

    const [title, setTitle] = useState('');
    const pathname = usePathname();
    const params = useGlobalSearchParams();
    const colorScheme = useColorScheme()


    useEffect(() => {
        console.log('route change event fired')
        console.log('pathname: ', pathname)
        for (const key of Object.keys(Routes?.routeMap)) {
            if (Routes?.routeMap[key] && Routes?.routeMap[key].pattern && Routes?.routeMap[key].pattern.test(pathname??"")) {
                setTitle(Routes?.routeMap[key].title);
                break;
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
            <Stack
            //     screenOptions={{
            //     headerTitle: () => (
            //         <Text style={{fontSize: 18}}>{title}</Text>
            //     ),
            //     headerTitleAlign: 'left',
            //     headerTintColor: "black",
            //     headerStyle: {backgroundColor: Colors[colorScheme ?? 'light'].stackHeaderBackground},
            //     headerShown: true,
            //     headerRight: () => (
            //         <TouchableHighlight
            //             underlayColor="transparent"
            //             onPress={() => false}
            //             style={{cursor: 'pointer', marginRight: 0}}>
            //             <Ionicons name="cart" size={24}/>
            //         </TouchableHighlight>
            //     )
            // }}
            >
                <Stack.Screen name="index" options={{headerShown: false}}/>
                <Stack.Screen name="[id]" options={{headerShown: false, }}/>
                <Stack.Screen name="cart/index" options={{
                    headerShown: false,
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                }}/>
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