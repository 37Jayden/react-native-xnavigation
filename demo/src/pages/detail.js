// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';

export function Detail({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detail</Text>
      {/* <Image style={{width: 100, height: 100}} source={require("./images/ic_wdtxm.png")}/> */}
    </View>
  );
}

