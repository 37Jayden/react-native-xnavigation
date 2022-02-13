/**
 * 拦截过滤管理器
 */
export class FilterManager {
  constructor(interceptorClazzs, targetFun) {
    this.index = 0;
    this.targetFun = targetFun;
    this.interceptorClazzs = interceptorClazzs;
  }

  /**
   * 执行拦截器
   */
  execute(){
    if(this.index == this.interceptorClazzs.length){
      this.targetFun();
    }else{
      let interceptor = new this.interceptorClazzs[this.index]();
      this.index++;
      interceptor.intercept();
    }
  }
}