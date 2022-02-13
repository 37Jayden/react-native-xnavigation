import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './router';

export function XNavigationContainer(props) {
  return <NavigationContainer ref={navigationRef} {...props} >
    {props.children}
  </NavigationContainer>
}