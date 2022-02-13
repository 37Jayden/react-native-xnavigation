// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { router } from 'react-native-xnavigation';

export function BankCard({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bank Card</Text>
      <Button title='绑卡' onPress={() => { 
        router.interceptNext(); 
        // const popAction = StackActions.pop(1);
        // navigationRef.navigate("/login2");
      }}/>
      {/* <Image style={{width: 100, height: 100}} source={require("./images/ic_wdtxm.png")}/> */}
    </View>
  );
}

