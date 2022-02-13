// In App.js in a new project

import * as React from 'react';
import routerConfig from './router-config';
import { XNavigationContainer } from 'react-native-xnavigation';
import { XNavigator } from 'react-native-xnavigation';

const headerTitleStyle = {
  fontSize: 20,
  color: "#111"
}

function App() {
  return (
    <XNavigationContainer>
      <XNavigator initialRouteName="/" routerConfig={routerConfig} screenOptions={{ 
        headerTitleStyle,
        headerTitleAlign: 'center'
        }}>
      </XNavigator>
    </XNavigationContainer>
  );
}

export default App;