import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, PixelRatio} from 'react-native';
const fontScale = PixelRatio.getFontScale();

const clearAsyncStorage = async () => {
  AsyncStorage.clear();
};
const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 2000);
  }, []);
  const checkLogin = async () => {
    clearAsyncStorage();
    const id = await AsyncStorage.getItem('USERID');
    if (id) {
      navigation.navigate('Main');
    } else {
      navigation.navigate('Login');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{'chat \n app'}</Text>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 140 / fontScale,
    color: 'white',
    textAlign: 'center',
  },
});
