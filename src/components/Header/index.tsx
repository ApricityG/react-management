import React, { FC,useEffect,useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Layout, Button,theme,Dropdown,Breadcrumb } from 'antd';
import type { MenuProps   } from 'antd';
import {useNavigate, useLocation,Navigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useSelectorUser,loginOutAsync} from '@/store/slices/user'
import moduleClass from './index.module.css'
import {routes} from '@/routes';
interface Prop {
  collapsed:boolean,
  setCollapsed:Function,
  setSelectedKey:Function,
  keyPath:string[]
}

type RouteNameType = {
  name:string,
  path:string,
}[]

const Header: FC<Prop> = (props) =>{ 
  const { Header } = Layout;
  const navigate  = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const userInfo = useSelectorUser().userInfo
  const items:MenuProps['items'] = [
    {
      key: '1',
      label: (
        <>
          <UserSwitchOutlined />
          <span>个人中心</span>
        </>
      ),
      onClick:()=>{
        navigate('/')
        props.setSelectedKey('home')
      }
    },
    {
      key: '2',
      label: (
        <>
          <LoginOutlined />
          <span>退出登陆</span>
        </>
      ),
      onClick:async ()=>{
        await dispatch(loginOutAsync() as any)
        navigate('/login')
      }
    }
  ];

  // 配置面包屑
  let routeName:RouteNameType = []
  routes[0].children?.forEach((item)=>{
    routeName= [...routeName,{
      name:item.name as string,
      path:item.path,
    }]
    if(item.children){
      item.children.forEach(itemChildren=>{
        routeName= [...routeName,{
          name:itemChildren.name as string,
          path:itemChildren.path,
        }]
      })
    }
  })
  const renderRoute = () => {
    let breadcrumb:any = []
    props.keyPath.forEach((routesMi:string)=>{
      const breadcrumbName = routeName?.find(item=>item.path === routesMi)?.name
      if(breadcrumbName){ breadcrumb = [{title:breadcrumbName },...breadcrumb]}
    })
    return breadcrumb
  }

  return (
    <Header className={moduleClass['header-style']} style={{ padding: 0, background: colorBgContainer }}>
      <div style={{display:'flex',alignItems:'center'}}>
        <Button
          type="text"
          icon={props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => props.setCollapsed(!props.collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
         <Breadcrumb
            items={renderRoute()}
         />
      </div>
      <Dropdown menu={{ items }} placement="bottom" arrow={true} overlayStyle={{marginBottom:5}}>
        <div className={moduleClass['user-info']}>
          <img className={moduleClass['user-avatar']} src={userInfo.avatar} alt="" />
          <span>{'admin'}</span>
        </div>
      </Dropdown>
      
    </Header>
  );
}

export default Header;