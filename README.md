## 介绍
本库基于React Navigation进一步封装的拦截器功能，让你轻松的在起始页跟目标页插入登录等多个拦截器。

## 环境
环境要求
```
React Native >= 0.63.0
React Navigaion 6.x
```

## 安装

安装本库
```
npm install react-native-xnavigation
```

本库依赖了如下库
```
  "dependencies": {
    "@react-navigation/bottom-tabs": "6.0.9",
    "@react-navigation/native": "^6.0.6",
    "@react-navigation/native-stack": "^6.2.5",
    "react-native-safe-area-context": "^3.3.2",
    "react-native-screens": "^3.10.1",
    "react-native-gesture-handler": "^2.2.0",
  },
```

iOS、Android需要link react-native-screens、react-native-safe-area-context、 react-native-gesture-handler 这三个库

## Hello React XNavigation

### 第一步：配置路由表
```
import * as React from 'react';
import { View, Text } from 'react-native';

function Home(){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const routeConfig = {
  "/": {
    component: Home
  }
}

```

### 第二步：使用路由表
新建或修改app.js，路由表用来配置你的页面
```
import * as React from 'react';
import { View, Text } from 'react-native';
import { XNavigationContainer, XNavigator } from 'react-native-xnavigation';


const routeConfig = {
  "/": {
    component: Home
  }
}

function App() {
  return (
    <XNavigationContainer>
      <XNavigator initialRouteName="/" routerConfig={routerConfig}>
      </XNavigator>
    </XNavigationContainer>
  );
}

export default App;

```

initialRouteName为第一个显示的路由

使用app.js
```
import React from 'react';
import {
  AppRegistry
} from 'react-native';
import App from './app';

AppRegistry.registerComponent(
  'MyReactNativeApp', //注册模块，写成你自己的
  () => App
);
```

## 页面跳转
修改路由表，增加Detail详情页面
```

function Home(){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function Detail(){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detail Screen</Text>
    </View>
  );
}

const routeConfig = {
  "/": {
    component: Home
  },
  "/detail": {
    component: Detail
  }
}
```
修改Home页面，导入router
```
import { router } from 'react-native-xnavigation';
function Home(){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="跳转详情" onPress={() => {
        router.push('/detail')
      }}/>
    </View>
  );
}
```

## 页面传值
push的第二位参数传入参数
```
router.push('/detail', {code: 1000})
```

Detail页面接收参数
```
function Detail({ route }){
  const { code } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detail Screen</Text>
      <Text>{code}</Text>
    </View>
  );
}
```

## 添加拦截器
修改路由表
```
import { router } from 'react-native-xnavigation';

class LoginInterceptor {
  intercept() {
    if(已登录){
      router.interceptNext();
    }else {
      router.push('/login');
    }
  }
}

function Login(){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="登录" onPress={() => {
        router.interceptNext();
      }}/>
    </View>
  );
}

const routeConfig = {
  "/": {
    component: Home
  },
  "/detail": {
    interceptors:[
      {
        clazz: LoginInterceptor
      }
    ]
    component: Detail
  }
}
```
router.interceptNext()是告诉路由进行下一个拦截，如果没有拦截器的话，会直接进入目标页面，路由表interceptors支持多个拦截器，如下所示
```
class BindCardInterceptor {
  intercept() {
    if(已绑卡){
      router.interceptNext();
    }else {
      router.push('');
    }
  }
}

function BindCard(){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="绑卡成功" onPress={() => {
        router.interceptNext();
      }}/>
    </View>
  );
}

const routeConfig = {
  "/detail": {
    interceptors:[
      {
        clazz: LoginInterceptor
      },
      {
        clazz: BindCardInterceptor
      }]
    component: Detail
  },
  "/bind-card":{ 
    component: BindCard
  }
}
```

## 路由表层级结构
路由表支持层级结构如下所示
```
const routeConfig = {
  "/my": {
    //申明嵌套路由
    subRoutes: { 
      "/bind-card": {
        component: BankCard //绑卡页面
      },
      "/record": {
        component: Record // 订单记录页面
      }
    }
  }
}
```
所以绑卡页面路由为/my/bind-card，订单记录路由为/my/record

## 底部Tabs

路由表配置
```
  "/": {
    tabs: {
      "/": {
        component: Home,
        options: {
          title: "首页",
          tabBarIcon: ({ focused }) => {
            return <Image style={{height: 21, width: 21}} source={focused ? require('./images/a_focus.png') : require('./images/a.png')}/>
          }
        },
      },
      "/my": {
        component: My,
        options: {
          title: "我的",
          tabBarIcon: ({ focused }) => {
          return <Image style={{height: 21, width: 21}} source={focused ? require('./images/b_focus.png') : require('./images/b.png')}/>
          }
        },
      },
    }
  },
```


## API

### router
|  方法   | 介绍  | 参数说明
|  push(name, params)  | 跳转页面 | name: 路由页面，params: 参数  |
|  replace(name)  | 替换页面  |  name: 路由页面，params: 参数  |
|  reset(name)  | 替换页面  |  name: 路由页面  |


### XNavigationContainer
|  属性   | 介绍  |
|  ----  | ----  |
| routerConfig  | 路由表配置 |
| onReady | [详细](https://reactnavigation.org/docs/navigation-container) |
| initialState | [详细](https://reactnavigation.org/docs/navigation-container) |
| onStateChange | [详细](https://reactnavigation.org/docs/navigation-container) |

### XNavigator
|  属性   | 介绍  |
|  ----  | ----  |
| initialRouteName  | [详细](https://reactnavigation.org/docs/stack-navigator) |
| screenOptions | 取值看下文的路由表配置options[详细](https://reactnavigation.org/docs/stack-navigator) |

> 示例
```
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
```

### 路由表配置
|  属性   | 介绍  |
|  ----  | ----  |
| options  | [详细](https://reactnavigation.org/docs/stack-navigator#options) |
| component | 组件 |
| interceptors | 拦截器 |

options的取值，XNavigator的screenOptions也可以用，

> 示例
```
import * as React from 'react';
import { View, Text } from 'react-native';
import { XNavigationContainer, XNavigator } from 'react-native-xnavigation';


const routeConfig = {
  "/": {
    component: Home,
    options: {
      title: "首页"
    }
  }
}

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
```

### 底部tabs配置

根属性
|  属性   | 介绍  |
|  ----  | ----  |
| initialRouteName  | [详细](https://reactnavigation.org/docs/bottom-tab-navigator) |
| screenOptions | 取值看下文页面配置options[详细](https://reactnavigation.org/docs/bottom-tab-navigator) |



页面的配置属性
|  属性   | 介绍  |
|  ----  | ----  |
| options | [详细](https://reactnavigation.org/docs/bottom-tab-navigator#options) |
| component | 组件 |

页面options配置，screenOptions也可以用


> 示例
```
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
```

