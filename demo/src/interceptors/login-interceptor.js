import { router } from "react-native-xnavigation";

export class LoginInterceptor {
  intercept() {
    // router.interceptNext();
    router.push('/login');
  }
}