import { forEach } from 'lodash'

export default {
  init(routeConfig) {
    this.__routes = {}; // 根据路由配置解析的路由数据
    this.resolve(routeConfig, "");
    return this.__routes;
  },

  // 解析路由，递归执行该方法
  resolve(routeConfig, parentPath){
    forEach(routeConfig, (value, key) => {
      const newKey = parentPath + key;
      if(value.component){
        this.__routes[newKey] = value;
      }
      if(value.tabs){
        this.__routes[newKey] = value;
      }
      if(value.subRoutes){
        this.resolve(value.subRoutes, newKey);
      }
    });
  },

  getRoute(route){
    return this.__routes[route];
  }
}