import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, TouchableOpacity } from "react-native";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { Colors } from '@/constants/Colors';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
        RobotoMono: require('@/assets/fonts/RobotoMono-Regular.ttf'),

        HelveticaNeueUltraLightv130: require('@/assets/fonts/HelveticaNeueUltraLightv130.ttf'),
        HelveticaLight: require('@/assets/fonts/HelveticaLight.ttf'),
        HelveticaNeueHv: require('@/assets/fonts/HelveticaNeueHv.ttf'),
        HelveticaNeueIt: require('@/assets/fonts/HelveticaNeueIt.ttf'),

        NunitoSansCyrillic900Normal: require('@/assets/fonts/nunito-sans-cyrillic-900-normal.ttf'),
        NunitoSansCyrillic600Normal: require('@/assets/fonts/nunito-sans-cyrillic-600-normal.ttf'),
        NunitoSansCyrillic700Normal: require('@/assets/fonts/nunito-sans-cyrillic-700-normal.ttf'),
        NunitoSansCyrillic800Normal: require('@/assets/fonts/nunito-sans-cyrillic-800-normal.ttf'),
        InterCyrillic900Normal: require('@/assets/fonts/inter-cyrillic-900-normal.ttf'),
        InterCyrillic600Normal: require('@/assets/fonts/inter-cyrillic-600-normal.ttf'),
        InterCyrillic700Normal: require('@/assets/fonts/inter-cyrillic-700-normal.ttf'),
        InterCyrillic800Normal: require('@/assets/fonts/inter-cyrillic-800-normal.ttf'),
        JetbrainsMonoCyrillic800Normal: require('@/assets/fonts/jetbrains-mono-cyrillic-800-normal.ttf'),
        JetbrainsMonoCyrillic600Normal: require('@/assets/fonts/jetbrains-mono-cyrillic-600-normal.ttf'),
        JetbrainsMonoCyrillic700Normal: require('@/assets/fonts/jetbrains-mono-cyrillic-700-normal.ttf'),
        MaterialIconsRoundLatin400Normal: require('@/assets/fonts/material-icons-round-latin-400-normal.ttf'),
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
                    <Stack initialRouteName='index'>
                        <Stack.Screen name="index" options={{ headerShown: false }} />
                        <Stack.Screen name="register" options={{
                            headerShown: true,
                            headerTitle: 'Register',
                            headerTitleAlign: 'left',
                            headerTintColor: Colors[colorScheme ?? 'light'].secondary,
                            headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].stackHeaderBackground },
                        }} />
                        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
                        <Stack.Screen name='+not-found' />
                    </Stack>
                </ThemeProvider>
            </SafeAreaProvider>
        </Provider>
    );
}
