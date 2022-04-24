import React, { Component } from 'react';
import { Text, View, Image, Platform } from 'react-native';

export class NavigationBar extends Component {
    render(){
        return <View style={{backgroundColor: "#f00"}}>
            <Image source={require('./images/ic_dhfh.png')}/>
            <Text>你好啊</Text>
        </View>
    }
}