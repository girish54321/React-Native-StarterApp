import * as React from 'react';
import { GestureResponderEvent, View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, useAnimatedScrollHandler, Extrapolate } from 'react-native-reanimated';
import '../../localization';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import useFetch from '../../Network/useFetch';
import { ListItem } from '../../components/ListItem/ListItem';
import { AppView } from '../../components/Flex/Flex';
const Tab = createMaterialTopTabNavigator();

type User = {
    id: number;
    name: string;
    email: string;
};

const styles = StyleSheet.create({
    flex1: { flex: 1 },
    padding8: { padding: 8 },
});

type HomeScreenProps = {
    data: User[];
    scrollHandler: ReturnType<typeof useAnimatedScrollHandler>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ data, scrollHandler }) => {
    return (
        <View style={styles.flex1}>
            <Animated.FlatList
                data={data?.length ? [...data, ...data] : []}
                onScroll={scrollHandler}
                scrollEventThrottle={18}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <ListItem
                        name={item.name}
                        email={item.email}
                        image={`https://randomuser.me/api/portraits/men/${index}.jpg`}
                        onPress={function (_e: GestureResponderEvent): void {
                            throw new Error('Function not implemented.');
                        }}
                    />
                )}
            />
        </View>
    );
};

export const HomeTabs = () => {

    const { t } = useTranslation();

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const [data] = useFetch('https://jsonplaceholder.typicode.com/users');

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [10, 300],
                [300, 0],
                {
                    extrapolateLeft: Extrapolate.CLAMP,
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
                        [2, 1, 1]),
                },
                {
                    scaleX: interpolate(
                        scrollY.value,
                        [-300, 0, 1],
                        [2, 1, 1]),
                },
            ],
        };
    });

    return (
        <AppView style={styles.flex1}>
            <Animated.View style={animatedStyle} >
                <View style={styles.flex1}>
                    <View style={styles.padding8}>
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
                <Tab.Screen name="Home">
                    {() => <HomeScreen data={data ?? []} scrollHandler={scrollHandler} />}
                </Tab.Screen>
                <Tab.Screen name="Settings">
                    {() => <HomeScreen data={data ?? []} scrollHandler={scrollHandler} />}
                </Tab.Screen>
            </Tab.Navigator>
        </AppView>
    );
};
