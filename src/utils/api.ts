import { request } from './axios';
// Linear Regression

export interface LRTRainPropsType {
  features: string[];
  label: string;
  epoch: number;
  fileId: string;
}

export async function LinearRegressionTrain(
  props: LRTRainPropsType
) {
  return request
    .post('/linear-regression/train', props)
    .then(res => {
      if (res) {
        return res;
      }
    });
}

export async function LogisticRegressionTrain(
  props: LRTRainPropsType
) {
  return request
    .post('/logistic-regression/train', props)
    .then(res => {
      if (res) {
        return res;
      }
    });
}
export interface LoginPropsType {
  username: string;
  password: string;
}
export async function LoginFn(props: LoginPropsType) {
  return request.post('user/login', props).then(res => {
    if (res) {
      return res;
    }
  });
}
export interface RegisterPropsType {
  username: string;
  password: string;
}
export async function RegisterFn(props: RegisterPropsType) {
  return request.post('user/register', {
    ...props,
    id: new Date().getTime(),
  });
}
