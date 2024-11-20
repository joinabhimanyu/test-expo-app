import AnimatedSearchAndLoadMore from '@/components/AnimatedSearchAndLoadMore';
import PageLoader from '@/components/PageLoader';
import { Colors } from '@/constants/Colors';
import { useFetchGeneric } from '@/hooks/api/useFetch';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Linking, Dimensions, TouchableOpacity, useColorScheme, FlatList, Image } from 'react-native'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import WebView from 'react-native-webview';

export default function Photos() {
    const uri = 'https://stackoverflow.com/questions/35531679/react-native-open-links-in-browser';
    const webViewRef = useRef<WebView | null>();
    const colorScheme = useColorScheme();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const showLoadMore = useSharedValue<boolean>(false);
    const marginTop = useSharedValue(70);

    const animatedStyle = useAnimatedStyle(() => ({
        marginTop: marginTop.value
    }));

    const {EXPO_PUBLIC_NEWS_API_KEY}=process.env;
    console.log(`EXPO_PUBLIC_NEWS_API_KEY: ${EXPO_PUBLIC_NEWS_API_KEY}`);
    const { loading, error, data, fetchData } = useFetchGeneric<any>(
        {
            //url: `https://newsapi.org/v2/everything?q=apple&from=2024-11-01&to=2024-11-20&sortBy=popularity&apiKey=${EXPO_PUBLIC_NEWS_API_KEY}`,
            // url: `https://newsapi.org/v2/everything?qInTitle=This%20Apple%20Black%20Friday%20deal%20gets%20you%20$50%20off%20the%20Apple%20Watch%20Series%2010%20on%20Amazon&from=2024-11-01&to=2024-11-20&sortBy=popularity&apiKey=${EXPO_PUBLIC_NEWS_API_KEY}`,
            // url: `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${EXPO_PUBLIC_NEWS_API_KEY}`,
            // url: `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${EXPO_PUBLIC_NEWS_API_KEY}`,
            // url: `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${EXPO_PUBLIC_NEWS_API_KEY}`,
            url: `https://newsapi.org/v2/everything?q=tesla&from=2024-10-20&sortBy=publishedAt&apiKey=${EXPO_PUBLIC_NEWS_API_KEY}`,
            
            headers: { 'Content-Type': 'application/json' },
            method: 'GET'
        });

    useEffect(() => {
        fetchData();
    }, []);

    const renderFlatList = useMemo(() => {
        if (data) {
            return (
                <>
                    <AnimatedSearchAndLoadMore
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        fetchData={fetchData}
                        showLoadMore={showLoadMore} />

                    <Animated.FlatList
                        style={[animatedStyle, { width: '100%' }]}
                        data={data.articles}
                        keyExtractor={(item, index) => index}
                        onRefresh={() => {
                            setSearchTerm('');
                            fetchData();
                        }}
                        refreshing={loading}
                        onScroll={(e) => {
                            if (e.nativeEvent.contentOffset.y > 50) {
                                marginTop.value = withTiming(0, withSpring({ duration: 50 }));
                            } else {
                                marginTop.value = withTiming(70, withSpring({ duration: 50 }));
                            }
                            if (e.nativeEvent.contentOffset.y > 2000) {
                                showLoadMore.value = true;
                            } else {
                                showLoadMore.value = false;
                            }
                        }}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                router.push({
                                    pathname: '/photos/[id]',
                                    params: { id: item.url },
                                });
                            }}>
                                <GestureHandlerRootView>
                                    <Swipeable overshootRight={false} renderRightActions={() => (
                                        <View style={{ width: 40, marginRight: 5, justifyContent: 'center', alignItems: 'center' }}>
                                            {/* {renderRightAction(item)} */}
                                        </View>
                                    )}>
                                        <View style={styles.itemContainer}>
                                            <Image width={350} height={300} style={{ marginTop: 10, marginBottom: 20, borderRadius: 20 }}
                                                source={{ uri: item.urlToImage }} />
                                            <View style={{ marginLeft: 10, flex: 0.95 }}>
                                                <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                                                <Text>{item.description}</Text>
                                                <Text>{item.content}</Text>
                                                <Text>{item.author}</Text>
                                                <Text>{item.publishedAt}</Text>

                                                <View style={styles.shareContainer}>

                                                    <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                                                        <Ionicons name="document" size={15} color={Colors[colorScheme ?? 'light'].primary} />
                                                    </TouchableOpacity>

                                                    <TouchableOpacity onPress={() => {
                                                        Linking.openURL(`mailto:${item.author}?subject=News%20Article&body=${item.title}`);
                                                    }}>
                                                        <Ionicons name="mail" size={15} color={Colors[colorScheme ?? 'light'].primary} />
                                                    </TouchableOpacity>

                                                    <TouchableOpacity onPress={() => {
                                                        Linking.openURL(`whatsapp://send?text=${item.title} - ${item.url}`);
                                                    }}>
                                                        <Ionicons name="logo-whatsapp" size={15} color={Colors[colorScheme ?? 'light'].primary} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </Swipeable>
                                </GestureHandlerRootView>
                            </TouchableOpacity>
                        )}
                    />
                </>
            )
        }
    }, [data])

    return (
        <View style={styles.container}>
            {renderFlatList}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#f2f2f2',
    },
    itemContainer: {
        width: Dimensions.get('screen').width * 0.95,
        alignSelf: 'center',
        marginBottom: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
    },
    shareContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'flex-end',
        backgroundColor: '#faf7f7',
        // shadowColor: 'gray',
        // shadowOffset: { width: 15, height: 15 },
        // shadowOpacity: 0.5,
        // shadowRadius: 4,
        gap: 10
    }
})