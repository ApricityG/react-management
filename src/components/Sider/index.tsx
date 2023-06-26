import React, { FC,useEffect,useState } from 'react';
import { Layout, Menu } from 'antd';
import {useNavigate } from 'react-router-dom'
import {routes} from '@/routes';
import * as _ from 'lodash'
import './index.css'
interface Prop {
  collapsed:boolean,
  defaultSelectedKey:string,
  setSelectedKey:Function,
  setSelectedKeyPath:Function
}
type Item = {
  label: string ;
  icon?: JSX.Element ;
  key: string;
  children?:Item[] | null
}


const Sider: FC<Prop> = (props) => {
    const { Sider } = Layout;
    const [menu,setMenu] = useState<Item[]>([])
    const navigate = useNavigate()
    const clickMenu = ({ key,keyPath }:any) => {
      props.setSelectedKey(key)
      props.setSelectedKeyPath(keyPath)
      navigate(key)
    }
     useEffect(()=>{
      const menus = _.cloneDeep(routes).filter(route=>{
        return route.children && route.children.filter(item=>item?.meta?.isMenu )})[0].children?.splice(1)
      const items = menus?.map<Item>(item=>{
        const menu:Item = {
          label:item.name as string,
          key:item.path,
          icon:item.icon,
          children:null
        }
        if(item.children){
          menu.children = []
          item.children.forEach(itemChild=>{
            menu.children &&  (menu.children = [...menu.children,{
              label:itemChild.name as string,
              key:itemChild.path,
            }])
          })
          menu.children.splice(0,1)
        }
        return menu
      })
      setMenu(items as Item[])
     },[routes]) 
    return (
      <Sider width='200'  className='sider-sty' trigger={null} collapsible collapsed={props.collapsed}>
       <div className="title_logo">
          <img className="logo" src={require('../../assets/img/logo.png')} alt=""/>
          {!props.collapsed &&(<h3 className='student_icon_title'>管理系统</h3>)}
        </div>
      <Menu
        className='menu'
        theme="dark"
        mode="inline"
        selectedKeys={[props.defaultSelectedKey]}
        items={menu}
        onClick={({key,keyPath })=>clickMenu({ key,keyPath })}
      />
    </Sider>
  );
}
export default Sider;