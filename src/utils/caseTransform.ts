import reduce from "lodash/reduce";

type TransformKeyFunction = (key: string) => string;

function createTransform(transformKey: TransformKeyFunction) {
  function transformObject(value: any, depth: number = -1): any {
    if (depth === 0 || value == null || typeof value !== "object") {
      return value;
    }

    if (Array.isArray(value)) {
      return value.map((item) => transformObject(item, depth - 1));
    }

    return reduce(
      value,
      (prev: any, val: any, key: string) => {
        // 将 key 进行转换
        prev[transformKey(key)] = transformObject(val, depth - 1);
        return prev;
      },
      {}
    );
  }
  return transformObject;
}

export default createTransform;
