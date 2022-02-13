import * as React from 'react';
import { Image, View, Text } from 'react-native';
import { BankCard } from "./pages/bind-card"
import { Detail } from "./pages/detail"
import { Home } from "./pages/home"
import { BindCardInterceptor } from "./interceptors/bind-card-interceptor"
import { LoginInterceptor } from "./interceptors/login-interceptor"
import { Login } from "./pages/login"
import { Login2 } from "./pages/login2"
import { My } from "./pages/my"
import { Record } from "./pages/record"
import { Buy } from './pages/buy';

export default {
  "/": {
    screenOptions: {
      tabBarShowLabel: true,
      headerTitleAlign: 'center'
    },
    tabs: {
      "/home": {
        component: Home,
        options: {
          title: "首页",
          tabBarActiveTintColor: "#f00",
          tabBarIcon: ({ focused }) => {
            return <Image style={{height: 21, width: 21}} source={focused ? require('./images/ic_sytj_down.png') : require('./images/ic_wdct.png')}/>
          }
        },
      },
      "/my": {
        component: My,
        options: {          
          title: "我的",
          tabBarIcon: ({ focused }) => {
            return <Image style={{height: 21, width: 21}} source={require('./images/ic_wdct.png')}/>
          }
        },
      },
    }
  },
  "/login": {
    options: {
      title: "登录1"
    },
    component: Login
  },
  "/login2":{
    component: Login2,
    options: {
      title: "登录2"
    },
  },
  "/buy": {
    component: Buy,
    options: {
      title: "购买"
    },
    interceptors:[
			{
				clazz: LoginInterceptor
			},
      {
        clazz: BindCardInterceptor
      }
		]
  },
  "/detail": {
    component: Detail,
    options: {
      title: "详情"
    }
  },
  "/my": {
    subRoutes: {
      "/bind-card": {
        component: BankCard
      },
      "/record": {
        interceptors:[
          {
            clazz: LoginInterceptor
          },
          {
            clazz: BindCardInterceptor
          }
        ],
        component: Record
      }
    }
  }
}