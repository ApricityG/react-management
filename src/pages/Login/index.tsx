import React, { FC,useState,useEffect  } from 'react';
import './index.css'
import { UserOutlined ,EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {  Button, Input, Space,message } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {getLoginCode}  from '../../api/user'
import {reqLoginAsync,reqUserInfoAsync} from '@/store/slices/user'
interface Props {
  // Put your props here
}

const Login: FC<Props> = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  const [codeUrl,setCodeUrl] = useState<string>('');
  const [messageApi, contextHolder] = message.useMessage();
  const [loginInfo,setLoginInfo] = useState({
    username: '',
    password:'',
    code:''
  })
  // 处理后端传递过来的流文件
  const fetch = async () => {
    const {data} = await getLoginCode()
    return data
  }

  // 获取新的验证码
  const getNewCode = ()=>{
    return fetch().then((data)=>{
      setCodeUrl(URL.createObjectURL(new Blob([data],{
        type:'image/svg+xml'  // MIME 类型为 image/svg+xml，否则浏览器可能会无法正确解析。
      })))
    })
    
  }

  // 收集用户信息
  const setInfo = (key:string,e:any)=>{
    setLoginInfo({
      ...loginInfo,
      [key]:e.target.value
    })
  }
  
  // 登陆
  const loginButton = async() => {
    const result = await dispatch(reqLoginAsync(loginInfo) as any)
    const user = await dispatch(reqUserInfoAsync() as any)
       if(result !== '') { 
        messageApi.open({
          type: 'warning',
          content: result,
        });
        getNewCode()
       } else {
        if(user !== ''){
          // messageApi.open({
          //   type: 'warning',
          //   content: '系统异常,请联系管理员',
          // });
        }else{
          navigate('/')
        }
       }
  }
  useEffect(()=>{
      getNewCode()
  },[])

  return (
    <div className="login-main">
      <div className="login">
          <div className="title">管理系统</div>
          <Input onChange={(event)=>setInfo('username',event)}  className="input_sty" size="large" value={loginInfo.username} placeholder="请输入用户名" prefix={<UserOutlined />} />
          <Input.Password
            className="input_sty"
            value={loginInfo.password}
            placeholder="请输入密码"
            size="large"
            onChange={(event)=>setInfo('password',event)}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          <Space className="login_code" direction="horizontal">
            <Input
              size="large"
              onChange={(event)=>setInfo('code',event)}
              className="input_code"
              value={loginInfo.code}
              placeholder="请输入验证码"
            />
            <img onClick={getNewCode} src={codeUrl} alt="" style={{height:30}}/>
          </Space>
          <div className="login_button">
            <Button onClick={loginButton} type="primary">登陆</Button>
          </div>
      </div>
    </div>
  )
};

export default Login;