//利用uuid生成未登录用户临时标识符
import { v4 as uuidv4 } from 'uuid';
//封装函数:只能生成一次用户临时身份 
let userId;
export const getUUID = () => {
    //1、判断本地存储是否由uuid
    userId = localStorage.getItem('USERTEMPID');
     //2、本地存储没有uuid
    if (!userId) {
        //2.1生成uuid
        userId = uuidv4();
        //2.2存储本地
        localStorage.setItem('USERTEMPID', userId);
    }
     //当用户有uuid时就不会再生成
    return userId;
}
