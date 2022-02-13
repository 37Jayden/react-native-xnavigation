import * as React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import routeResolve from './route-resolve';
import _ from 'lodash';

let tabRoute = {};
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Inject(WrappedComponent) {
  return class extends React.Component {

    componentDidMount() {
     
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
}

function MyTabs() {
  let tabs = tabRoute.tabs;
  const newProps = _.omit(tabRoute, ['tabs']);
  return (
    <Tab.Navigator
      {...newProps}
    >
      {
        Object.keys(tabs).map(key => {
          const item = tabs[key];
          return <Tab.Screen name={key} component={Inject(item.component)}
            options={item.options}
            key={key}
          />
        })
      }
    </Tab.Navigator>
  );
}

export function XNavigator(props) {
  let { routerConfig } = props;
  const routes = routeResolve.init(routerConfig);
  const newProps = _.omit(props, ['routerConfig']);

  return <Stack.Navigator
    {...newProps}>
    {
      Object.keys(routes).map(key => {
        const item = routes[key];
        if (item.tabs) {
          tabRoute = item;
          return <Stack.Screen name={key} component={MyTabs} options={{ headerShown: false }} key={key} />
        } else {
          return <Stack.Screen name={key} component={item.component} key={key} />
        }
      })
    }
  </Stack.Navigator>
}