//对axios二次封装
import axios from "axios";

//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css';

//1、 创建axios实例---requests
const requests = axios.create({
    //基础路径，requests发出的请求在端口号后面会跟改baseURl
    baseURL: '/api',
    //超时时间
    timeout: 5000,
})

//2、配置请求拦截器
requests.interceptors.request.use(config => {
    //config内主要是对请求头Header配置
    //比如添加token
    //开启进度条
    nprogress.start();
    return config;
}, err => {
    return Promise.reject(err);
})

//3、配置响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数
    //响应成功，关闭进度条
    nprogress.done()
    return res.data;
}, (error) => {
    //失败的回调函数
    console.log("响应失败" + error)
    return Promise.reject(error.response)
})

//4、对外暴露
export default requests;