import * as React from 'react';
import { FlatList, GestureResponderEvent, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, useAnimatedScrollHandler, Extrapolate } from "react-native-reanimated";
import '../../localization';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import useFetch from '../../Network/useFetch';
import { ListItem } from '../../components/ListItem/ListItem';
import { AppView } from '../../components/Flex/Flex';
const Tab = createMaterialTopTabNavigator();


export const HomeTabs = () => {

    const { t } = useTranslation();

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    })

    const [data] = useFetch("https://jsonplaceholder.typicode.com/users");

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [10, 300],
                [300, 0],
                {
                    extrapolateLeft: Extrapolate.CLAMP
                }
            ),
            transform: [
                {
                    translateY: interpolate(
                        scrollY.value,
                        [20, 290],
                        [1, -100]),
                },
                {
                    scaleY: interpolate(
                        scrollY.value,
                        [-300, 0, 1],
                        [2, 1, 1])
                },
                {
                    scaleX: interpolate(
                        scrollY.value,
                        [-300, 0, 1],
                        [2, 1, 1])
                }
            ]
        }
    })


    function HomeScreen() {
        return (
            <View style={{ flex: 1, }}>
                <Animated.FlatList data={data?.length ? [...data, ...data] : []}
                    onScroll={scrollHandler}
                    scrollEventThrottle={18}
                    renderItem={(item: any, index: number) => {
                        return <ListItem
                            name={item.item.name}
                            email={item.item.email}
                            image={`https://randomuser.me/api/portraits/men/${item.index}.jpg`} onPress={function (e: GestureResponderEvent): void {
                                throw new Error('Function not implemented.');
                            }} />
                    }} />
            </View>
        );
    }

    return (
        <AppView style={{ flex: 1 }}>
            <Animated.View style={animatedStyle} >
                <View style={{ flex: 1, }}>
                    <View style={{ padding: 8 }}>
                        <Card>
                            <Card.Content>
                                <Title>{t('homePage:welcome')}</Title>
                                <Paragraph>Card content</Paragraph>
                            </Card.Content>
                            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                        </Card>
                    </View>
                </View>
            </Animated.View>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Settings" component={HomeScreen} />
            </Tab.Navigator>
        </AppView>
    );
}