import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setmobile] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const registerUser = () => {
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        userId: userId,
      })
      .then(res => {
        console.log('user created');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const validate = () => {
    let isValid = true;
    if (
      name == '' ||
      mobile == '' ||
      email == '' ||
      password == '' ||
      confirmPassword == ''
    )
      isValid = false;
    if (password !== confirmPassword) isValid = false;
    return isValid;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        placeholder="Enter Your Name"
        style={[styles.input, {marginTop: 50}]}
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="Enter mobile number"
        style={[styles.input, {marginTop: 25}]}
        keyboardType={'number-pad'}
        value={mobile}
        onChangeText={text => setmobile(text)}
      />
      <TextInput
        placeholder="Enter Email"
        style={[styles.input, {marginTop: 25}]}
        value={name}
        onChangeText={text => setName(text)}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Enter passwored"
        style={[styles.input, {marginTop: 25}]}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        placeholder="confirm password"
        style={[styles.input, {marginTop: 25}]}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (validate()) {
            registerUser();
          } else {
            Alert.alert('Please Enter Correct Data');
          }
        }}>
        <Text style={styles.btnText}> Sign Up</Text>
      </TouchableOpacity>
      <Text
        style={styles.orLogin}
        onPress={() => {
          navigation.navigate.goBack();
        }}>
        Or Login
      </Text>
    </View>
  );
};

export default Signup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    marginTop: '100',
    fontWeight: '600',
  },
  input: {
    width: '90%',
    height: '50',
    borderWidth: 0.5,
    borderRadius: 10,

    alignSelf: 'center',
    paddingLeft: 20,
  },
  btn: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'purple',
  },
  btnText: {
    color: 'white',
    fontSize: 20,
  },
  orLogin: {
    alignSelf: 'center',
    marginTop: 50,
    fontSize: 20,
    textDecorationLine: 'underline',
    fontWeight: '600',
    color: 'black',
  },
});
