import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
// import createTransform from "./caseTransform";
// import camelCase from "lodash/camelCase";
// import snakeCase from "lodash/snakeCase";

// 初始化axios实例
const request = axios.create({
  baseURL: "http://119.8.26.109:8080",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  // withCredentials: true, //是否携带 cookie 发送跨域请求。默认为 false
});

// 响应拦截器
// const deepCamel = createTransform(camelCase);

request.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("========= API Response =========");
    console.log(response.config.url)
    console.log(JSON.parse(JSON.stringify(response.data)));
    console.log("=============================");
    return JSON.parse(JSON.stringify(response.data));
  },
  (error: AxiosError) => {
    console.log("========= API ERROR =========");
    console.log(error.config?.url, error);
    console.log("=============================");
    return Promise.reject(error);
  }
);

// 请求拦截器
// const deepSnake = createTransform(snakeCase);

function transformKeysToSnakeCase(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  // POST
  if (config.data) {
    // config.data = deepSnake(config.data);
  }

  // GET
  if (config.params) {
    // config.params = deepSnake(config.params);
  }

  return config;
}

request.interceptors.request.use(transformKeysToSnakeCase);

export { request };
