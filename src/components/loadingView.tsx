import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Colors } from '../Config/Colors';

const LoadingView = () => {
  return (
    <View style={style.manView} >
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const style = StyleSheet.create({
  manView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default LoadingView;
