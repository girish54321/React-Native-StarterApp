import React from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { List, Avatar, Divider } from 'react-native-paper';

interface listItemProps {
    name: string,
    email: string
    style?: any,
    image: string
    onPress: (e: GestureResponderEvent) => void;
}


const AvatarImage = ({ image, ...params }: { image: string } & any) => (
    <Avatar.Image {...params} source={{ uri: image }} />
);

export const ListItem = (props: listItemProps) => {
    const { style, name, email, image, onPress } = props;

    const renderLeft = React.useCallback(
        (params: any) => <AvatarImage {...params} image={image} />,
        [image]
    );

    return (
        <View style={{ ...style }}>
            <List.Item
                onPress={onPress}
                title={name}
                description={email}
                left={renderLeft}
            />
            <Divider />
        </View>
    );
};
