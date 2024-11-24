import { Ionicons } from '@expo/vector-icons';
import { DrawerItem } from '@react-navigation/drawer';
import { DrawerNavigationHelpers, DrawerDescriptorMap } from '@react-navigation/drawer/lib/typescript/commonjs/src/types';
import {
    CommonActions,
    DrawerActions,
    type DrawerNavigationState,
    type ParamListBase,
    useLinkBuilder,
} from '@react-navigation/native';
import { Href, useNavigation, useRouter } from 'expo-router';
import * as React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, OpaqueColorValue } from 'react-native';

type Props = {
    state: DrawerNavigationState<ParamListBase>;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
};

interface SubMenuProps {
    label: string;
    path: Href;
    icon: (focused: boolean, color: string) => React.ReactNode;
}
/**
 * Component that renders the navigation list in the drawer.
 */
export function CustomDrawerItemList({ state, navigation, descriptors }: Props) {
    const { buildHref } = useLinkBuilder();
    const router = useRouter();
    const navigationObject = useNavigation();

    const focusedRoute = state.routes[state.index];
    const focusedDescriptor = descriptors[focusedRoute.key];
    const focusedOptions = focusedDescriptor.options;
    const [wishlistShown, setWishlistShown] = useState(false);
    const [wishlistMenuIndex, setWishlistMenuIndex] = useState<Number | null>(null);

    const ICON_SIZE = 16;
    const SUB_ICON_SIZE =16;
    const wishListSubmenu: SubMenuProps[] = [{
        label: 'My Wishlist',
        path: '/wishlist/sub1',
        icon: (focused: boolean, color: string) => <Ionicons name="basket" size={SUB_ICON_SIZE} color={color||(focused ? drawerActiveTintColor : drawerInactiveTintColor)} />
    }, {
        label: 'My Shared Items',
        path: '/wishlist/sub2',
        icon: (focused: boolean, color: string) => <Ionicons name="share" size={SUB_ICON_SIZE} color={color||(focused ? drawerActiveTintColor : drawerInactiveTintColor)} />
    }, {
        label: 'My Starred Items',
        path: '/wishlist/sub3',
        icon: (focused: boolean, color: string) => <Ionicons name="albums" size={SUB_ICON_SIZE} color={color||(focused ? drawerActiveTintColor : drawerInactiveTintColor)} />
    },
    ];
    const handleWishlistToggle = () => {
        setWishlistShown(!wishlistShown);
    };

    let drawerActiveTintColor: string | undefined;
    let drawerInactiveTintColor: string | undefined;
    let drawerActiveBackgroundColor: string | undefined;
    let drawerInactiveBackgroundColor: string | undefined;

    if (!drawerActiveTintColor && !drawerInactiveTintColor
        && !drawerActiveBackgroundColor && !drawerInactiveBackgroundColor
    ) {
        ({
            drawerActiveTintColor,
            drawerInactiveTintColor,
            drawerActiveBackgroundColor,
            drawerInactiveBackgroundColor,
        } = focusedOptions)
    }

    React.useEffect(() => {
        // add event listeners to navigation state change
        if (navigationObject) {
            // try {
            //     navigationObject.addListener('state', (event: any) => {

            //         const { state } = event.data;
            //         if (state && state.routes && state.routes.constructor.name === 'Array' && state.routes.length > 0) {
            //             const index = state.routes[0].state.index;
            //             if (index !== 6) {
            //                 setWishlistMenuIndex(null);
            //                 setWishlistShown(false);
            //             }
            //         }
            //     });
            // } catch (error) {
            //     console.log(error);
            // }
    
            // // add event listeners for navigation drawer item press
            // navigationObject.addListener('beforeRemove', (event) => {
            //     if (event.target === 'submenu1' || event.target === 'submenu2' || event.target === 'submenu3') {
            //         setWishlistMenuIndex(parseInt(event.target));
            //     } else {
            //         setWishlistMenuIndex(null);
            //     }
            // });
        }
        
        return () => {
            // remove navigation listener
            navigationObject.removeListener('state', () => false);
            navigationObject.removeListener('beforeRemove', () => false);
        }
    }, [])

    return (
        <>
            {state.routes.map((route, i) => {
                const focused = i === state.index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'drawerItemPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!event.defaultPrevented) {
                        navigation.dispatch({
                            ...(focused
                                ? DrawerActions.closeDrawer()
                                : CommonActions.navigate(route)),
                            target: state.key,
                        });
                    }
                };
                const onPressSubmenu = (submenu: SubMenuProps) => {
                    const event = navigation.emit({
                        type: 'drawerItemPress',
                        target: undefined,
                        canPreventDefault: true,
                    });

                    if (!event.defaultPrevented) {
                        router.navigate(submenu.path);
                        // reset react navigation state index
                        // navigation.dispatch(
                        //     CommonActions.reset({
                        //         index: i,
                        //         routes: [
                        //             {
                        //                 name: route.name,
                        //                 params: route.params,
                        //             },
                        //         ],
                        //     })
                        // );
                    }
                }

                const {
                    title,
                    drawerLabel,
                    drawerIcon,
                    drawerLabelStyle,
                    drawerItemStyle,
                    drawerAllowFontScaling,
                } = descriptors[route.key].options;

                if (route.name === "wishlist") {
                    return (
                        <View style={{ gap: 5, }}>
                            <DrawerItem
                                key={route.key}
                                route={route}
                                label="Wishlist"
                                icon={({ color }) => (
                                    <TouchableOpacity onPress={handleWishlistToggle}>
                                        <Ionicons name={wishlistShown ? 'chevron-down' : 'chevron-forward-outline'} size={ICON_SIZE} color={color} />
                                    </TouchableOpacity>
                                )}
                                allowFontScaling={drawerAllowFontScaling}
                                labelStyle={drawerLabelStyle}
                                style={drawerItemStyle}
                                onPress={handleWishlistToggle}
                            />
                            {wishlistShown ? (
                                <View style={{ marginLeft: 20 }}>

                                    {wishListSubmenu.map((submenu: SubMenuProps, index: number) => {

                                        const focusedWishList = wishlistMenuIndex === index;
                                        return (

                                            <DrawerItem
                                                key={index}
                                                label={submenu.label}
                                                focused={focusedWishList}
                                                activeTintColor={drawerActiveTintColor}
                                                inactiveTintColor={drawerInactiveTintColor}
                                                activeBackgroundColor={drawerActiveBackgroundColor}
                                                inactiveBackgroundColor={drawerInactiveBackgroundColor}
                                                allowFontScaling={drawerAllowFontScaling}
                                                labelStyle={drawerLabelStyle}
                                                style={[drawerItemStyle, {marginVertical: -7}]}
                                                icon={({ color }) => (
                                                    submenu.icon(focusedWishList, color)
                                                )}
                                                onPress={() => {
                                                    setWishlistMenuIndex(index);
                                                    onPressSubmenu(submenu)
                                                }} />
                                        )
                                    })}

                                </View>
                            ) : null}

                        </View>
                    )
                }
                return (
                    <DrawerItem
                        key={route.key}
                        route={route}
                        href={buildHref(route.name, route.params)}
                        label={
                            drawerLabel !== undefined
                                ? drawerLabel
                                : title !== undefined
                                    ? title
                                    : route.name
                        }
                        icon={drawerIcon}
                        focused={focused}
                        activeTintColor={drawerActiveTintColor}
                        inactiveTintColor={drawerInactiveTintColor}
                        activeBackgroundColor={drawerActiveBackgroundColor}
                        inactiveBackgroundColor={drawerInactiveBackgroundColor}
                        allowFontScaling={drawerAllowFontScaling}
                        labelStyle={drawerLabelStyle}
                        style={drawerItemStyle}
                        onPress={onPress}
                    />
                );
            }) as React.ReactNode as React.ReactElement}
        </>
    );
}
