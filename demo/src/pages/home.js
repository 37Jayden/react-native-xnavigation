// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { router } from 'react-native-xnavigation';

export function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
      <Button
        title="Go to Buy"
        onPress={() => router.push('/buy')}
      />

      <View style={{height: 10}}/>
      <Button
        title="Go to Detail"
        onPress={() => router.push('/detail')}
      />


      <View style={{height: 10}}/>
      <Button
        title="Go to Record"
        onPress={() => router.push('/my/record')}
      />
    </View>
  );
}

