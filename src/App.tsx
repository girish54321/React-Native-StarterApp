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

