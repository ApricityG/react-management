import request from "../utils/request";


export type userType = {
    username:string,
    password:string,
    code:string
}
export type userInfoType = {
    name:string,
    phone:number,
    email:string,
    address:string,
    avatar:string,
    role:Array<string>,
    permission:Array<string>
}
export interface Module<T>  {
    status:number,
    data:T,
    msg?:string
}

// 获取验证码
export const getLoginCode = () => request.get('/login/code')

// 登陆
export const getLoginToken = (user:userType) => request.post<null,Module<string>>('/login',{username:user.username,password:user.password,code:user.code})

// 获取用户信息
export const getUserInfo =() => request.get<null,Module<userInfoType>>('/userInfo')

// 退出登录
export const reqLoginOut = () => request.get<null,Module<null>>('/loginOut')