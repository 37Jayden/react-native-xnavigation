// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { navigationRef, router } from 'react-native-xnavigation';

export function Login({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login</Text>
      <Button title='登录' onPress={() => { 
        // router.interceptNext(); 
        router.push("/login2");
      }}/>
    </View>
  );
}

