import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {useColorScheme} from '@/hooks/useColorScheme';
import {Stack} from "expo-router";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {SafeAreaView} from "react-native";
import {Provider} from "react-redux";
import store from "@/redux/store";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <Stack>
                        <Stack.Screen name="(drawer)" options={{headerShown: false}}/>
                        <Stack.Screen name='+not-found'/>
                    </Stack>
                </ThemeProvider>
            </SafeAreaProvider>
        </Provider>
    );
}
