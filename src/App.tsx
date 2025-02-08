import React, { FC } from "react";
import { Navigation } from "./navigation/mainNavigation";
import { Provider, } from 'react-redux'
import { store } from './redux/rootReducer'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient()
export const App: FC = () => {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Navigation />
            </QueryClientProvider>
        </Provider>
    );
}


// In App.js in a new project

// import * as React from 'react';
// import { View, Text } from 'react-native';
// import { createStaticNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// function HomeScreen() {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Home Screen</Text>
//         </View>
//     );
// }

// const RootStack = createNativeStackNavigator({
//     screens: {
//         Home: HomeScreen,
//     },
// });

// const Navigation = createStaticNavigation(RootStack);

// export const App = () => {
//     return <Navigation />;
// }