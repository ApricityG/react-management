import {createSlice} from '@reduxjs/toolkit'
import {useSelector} from 'react-redux'
import {getLoginToken,getUserInfo,reqLoginOut}  from '@/api/user'
import type {userType} from '@/api/user'
const userSlice = createSlice({
  name:'user',
  initialState:{
    token:localStorage.getItem('token') || '',
    userInfo:JSON.parse(localStorage.getItem('userInfo') as string) || {}
  },
  reducers:{
    login(state,{payload}){
      localStorage.setItem('token',payload)
      state.token = payload
      
    },
    userInfo(state,{payload}){
      state.userInfo = payload
      localStorage.setItem('userInfo',JSON.stringify(payload))
      
    },
    loginOut(state){
      state.userInfo = {}
      state.token = ''
      localStorage.clear()
      console.log(123);
      
    }
  }
})

export default userSlice.reducer
// 将user暴露
export const useSelectorUser = ()=>useSelector((state:any)=>state.user)
export const {login,userInfo,loginOut} = userSlice.actions

// 登录
export const reqLoginAsync = (user:userType) => {
    return async (dispatch:any) => {
      const result = await getLoginToken(user)
      if(result.status === 20000){
        dispatch(login(result.data))
        return ''
      }else{    
        return result.msg
      }
    }
}

// 获取用户信息
export const reqUserInfoAsync = ()=>{
  return async (dispatch:any) => {
    const result = await getUserInfo()
    if(result.status === 20000){
      dispatch(userInfo(result.data))
      return ''
    }else{
      return false
    }
  }
}

// 退出登录
export const loginOutAsync = () =>{
  return  async (dispatch:any) =>{
    const result = await reqLoginOut()
    if(result.status === 20000){
       dispatch(loginOut())
        return true
    }else{
        return false
    }
  }
}
