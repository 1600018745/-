import {v4 as uuidv4} from 'uuid';
// 要生成一个随机的字符串，每次执行不发生变化
export const getUUID = ()=>{
    // 先从本地存储获取uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    if(!uuid_token){
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token;
}