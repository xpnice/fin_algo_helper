import { request } from "./axios";

// Linear Regression

export interface LRTRainPropsType {
  features: string[];
  label: string;
  epoch: number;
  md5: string;
}

export async function LRTrain(props: LRTRainPropsType) {
  return request.post("/linear-regression/train", props).then((res) => {
    if (res) {
      return res;
    }
  });
}
