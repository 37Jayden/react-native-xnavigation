
import { createNavigationContainerRef } from '@react-navigation/native';
import { StackActions, CommonActions } from '@react-navigation/native';

import { FilterManager } from './filter-manager';
import routeResolve from './route-resolve';

export const navigationRef = createNavigationContainerRef();

/**
 * 路由跳转类
 */
export class Router {
  constructor() {
    this.filterManager = {};
    this.startLen = 0;
  }

  /**
   * 执行下一个拦截器
   */
  interceptNext() {
    this.clearStack();
    this.filterManager.execute();
  }

  /**
   * 清栈
   */
  clearStack() {
    navigationRef.dispatch(state => {
      const routes = state.routes.filter((r, index) => {
        return index < this.startLen;
      });

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  }

  /**
   * 跳转新页面
   * @param {*} name 
   * @param {*} params 
   */
  push(name, params) {
    if (navigationRef.isReady()) {
      function targetFun() {
        const pushAction = StackActions.push(name, params);
        navigationRef.dispatch(pushAction);
      }
      this.execute(name, targetFun);
    }
  }

  /**
   * 替换页面
   * @param {*} name 
   * @param {*} params 
   */
  replace(name, params) {
    function targetFun() {
      navigationRef.dispatch(
        StackActions.replace(name, params)
      );
    }
    this.execute(name, targetFun);
  }

  /**
   * 返回页面
   * @param {*} count 
   */
  pop(count){
    const popAction = StackActions.pop(count);
    navigationRef.dispatch(popAction);
  }

  /**
   * 
   * @param {*} name 
   * @param {*} targetFun 
   */
  execute(name, targetFun) {
    if (navigationRef.isReady()) {
      let route = routeResolve.getRoute(name);

      if (route) {
        const interceptorsConfigs = route.interceptors;

        if (interceptorsConfigs) {
          let interceptorClazzs = [];
          interceptorsConfigs.forEach(element => {
            interceptorClazzs.push(element["clazz"]);
          });

          const state = navigationRef.getState();
          this.startLen = state ? state.routes.length : 1;

          this.filterManager = new FilterManager(interceptorClazzs, targetFun);
          this.filterManager.execute();

        } else {
          targetFun();
        }

      }

    }
  }


}

export let router = new Router();