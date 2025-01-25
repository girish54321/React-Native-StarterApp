import { Avatar, Text } from 'react-native-paper';
import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AppView } from '../../components/Flex/Flex';
import { scale } from '../../Config/ScalingUtils';
import { UserList } from '../../models/responseType/UserListResponse';

export const SelectedUserScreen = (props: any) => {
    const data: UserList = props?.route?.params?.data;

    useEffect(() => {
        props.navigation.setOptions({ title: `${data.first_name} ${data.last_name}` });
    }, []);

    return (
        <AppView paddingRequired>
            <ScrollView style={style.scrollView}>
                <View style={style.centerView}>
                    <Avatar.Image size={scale(90)} source={{ uri: data?.avatar }} />
                    <Text variant="headlineLarge">{data.first_name} {data.last_name}</Text>
                    <Text variant="titleLarge">{data.email}</Text>
                </View>
            </ScrollView>
        </AppView>
    );
};

const style = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    centerView: {
        justifyContent: 'space-around',
        alignItems: 'center', height: scale(160),
        marginTop: scale(14),
    },
});
