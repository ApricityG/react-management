import React, { FC,useState  } from 'react';
import {Outlet,useLocation} from 'react-router-dom'
import { Layout, theme } from 'antd';
import Sider from '../Sider'
import Header from '../Header'
const LayoutComponent: FC = () =>{
  const { Content } = Layout;
  const [defaultSelectedKey,setSelectedKey] = useState(useLocation().pathname.split('/').filter(i=>i)[0])
  const [collapsed, setCollapsed] = useState(false);
  const [keyPath,setSelectedKeyPath] = useState<string[]>([])
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
     <Sider setSelectedKeyPath={setSelectedKeyPath}  collapsed={collapsed}  defaultSelectedKey={defaultSelectedKey} setSelectedKey={setSelectedKey}></Sider>
      <Layout>
        <Header keyPath={keyPath} collapsed={collapsed} setCollapsed={setCollapsed} setSelectedKey={setSelectedKey} ></Header>
        <Content
          style={{
            padding: 15,
            minHeight: 280,
            background: colorBgContainer,
            overflow:'hidden'
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )};

export default LayoutComponent;