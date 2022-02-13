import { router } from "react-native-xnavigation";

export class BindCardInterceptor {
  intercept() {
    // router.interceptNext();
    router.push('/my/bind-card')
  }
}