import { Href } from "expo-router";

interface RouteObject {
    pattern: RegExp;
    title: string;
    name?: string;
    route?: string;
    isNested?: boolean;  // optional route for nested screens, e.g., /products/123/edit
}

type RouteMap = {
    [key: string]: RouteObject;
}

type RouteConfig = {
    routeMap: RouteMap;
    initialRouteName: Href;
}

export const Routes: RouteConfig={
    routeMap: {
        'products':{
            pattern: /^\/products$/g,
            title: "Products",
        },
        'productDetails': {
            pattern: /^\/products\/[0-9]+$/g,
            title: "Product Details",
            isNested: true
        }
    },
    initialRouteName: '/products'
}