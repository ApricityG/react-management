import axios from 'axios'

const request = axios.create({
    baseURL:'/api',
    timeout:5000,
    withCredentials:true // 允许在请求中携带session
})
export type resInter =  {
    status:number,
    data:any,
    msg?:string
}

request.interceptors.request.use(req=>{
    const token = localStorage.getItem('token')
    if(token) req.headers.token = token
    return req
})

request.interceptors.response.use((res:resInter)=>{
    if(res.status !== 200) new Error(res.data.msg)
    else return res.data
},err=>{
    console.log(err);
    
})

export default request