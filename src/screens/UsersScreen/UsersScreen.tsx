import React from 'react';
import { FlatList, GestureResponderEvent, StyleSheet, } from 'react-native';
import { AppView } from '../../components/Flex/Flex';
import { ListItem } from '../../components/ListItem/ListItem';
import { navigate } from '../../navigation/NavigationService';
import { Route } from '../../constants/Route';
import { useUserList } from '../../Network/Querys/useUserListQuery';
import LoadingView from '../../components/loadingView';
import { ActivityIndicator, Text } from 'react-native-paper';

export const UsersScreen = (_props: any) => {
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useUserList();

    if (isError) {
        return (
            <AppView>
                <Text>Error: {error.name}</Text>
            </AppView>
        );
    }

    if (isLoading) {
        return (
            <AppView>
                <LoadingView />
            </AppView>
        );
    }

    const footerView = () => {
        if (isFetchingNextPage) {
            return <ActivityIndicator />;
        }
        if (!hasNextPage) {
            return <Text style={styles.noDataText} variant="titleMedium">No more users to load</Text>
        }
        return null;
    };

    return (
        <AppView>
            <FlatList
                refreshing={isLoading}
                ListFooterComponent={footerView}
                data={data?.pages.map(page => page.data.data).flat()}
                onEndReached={() => {
                    if (hasNextPage) {
                        fetchNextPage();
                    }
                }}
                keyExtractor={(item, index) => `${index}${item.first_name}`}
                renderItem={({ item }) => {
                    return (
                        <ListItem name={`${item.first_name} ${item.last_name}`} email={item.email}
                            key={String(1)}
                            image={item.avatar}
                            onPress={function (_e: GestureResponderEvent): void {
                                navigate(Route.SELECTEDUSERSCREEN, { data: item });
                            }} />
                    );
                }}
            />
        </AppView>
    );
};

const styles = StyleSheet.create({
    noDataText: {
        alignSelf: 'center', padding: 22
    }
})