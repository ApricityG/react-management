import {useRoutes,Navigate} from 'react-router-dom'
import Layout from '@/components/Layout'
import {
  HomeOutlined,
  BarsOutlined,
  ApartmentOutlined,
  GoldOutlined,
  UserOutlined,
  CommentOutlined,
  ContainerOutlined,
  ControlOutlined
} from '@ant-design/icons';
import {lazy,Suspense} from 'react'
import Loading from '@/components/Loading'

const lazyLoading = (path:string) => {
  const Com = lazy(()=>import('@/pages/'+path))
  return (
    <Suspense fallback={<Loading/>}>
      <Com></Com>
    </Suspense>
  )
} 
export const routes = [
  {
    path:'/',
    element:<Layout/>,
    meta:{
      isMenu:false
    },
    children:[
      {
        index:true,
        path:'/',
        element:<Navigate to={"home"}/>,
        meta:{
          isMenu:false,
        }
      },
      {
        path:'home',
        name:'首页',
        element:lazyLoading('Home'),
        icon:<HomeOutlined />,
        meta:{
            isMenu:true,
        }
      },
      {
        path:'user',
        name:'用户管理',
        element:lazyLoading('User'),
        icon:<UserOutlined />,
        meta:{
            isMenu:true,
        }
      },
      {
        path:'menu',
        name:'菜单管理',
        element:lazyLoading('Menu'),
        icon:<BarsOutlined />,
        meta:{
            isMenu:true,
        }
      },
      {
        path:'division',
        name:'部门管理',
        element:lazyLoading('Division'),
        icon:<ApartmentOutlined />,
        meta:{
            isMenu:true,
        }
      },
      {
        path:'position',
        name:'岗位管理',
        element:lazyLoading('Position'),
        icon:<GoldOutlined />,
        meta:{
            isMenu:true,
        }
      },
      {
        path:'notification',
        name:'通知公告',
        element:lazyLoading('Notification'),
        icon:<CommentOutlined />,
        meta:{
            isMenu:true,
        }
      },
      {
        path:'authority',
        name:'权限管理',
        element:lazyLoading('Authority'),
        icon:<ControlOutlined />,
        meta:{
            isMenu:true,
        },
        children:[
          {
            index:true,
            path:'/authority',
            element:<Navigate to={"buttonPermission"}/>,
            meta:{
              isMenu:false,
            }
          },
          {
            path:'/authority/buttonPermission',
            name:'按钮权限',
            element:lazyLoading('Authority/ButtonPermission'),
            meta:{
                isMenu:true,
            },
          },
          {
            path:'/authority/menuPermission',
            name:'菜单权限',
            element:lazyLoading('Authority/MenuPermission'),
            meta:{
                isMenu:true,
            },
          },
          {
            path:'/authority/rolePermission',
            name:'角色权限',
            element:lazyLoading('Authority/RolePermission'),
            meta:{
                isMenu:true,
            },
          },
        ]
      },
      {
        path:'dailyRecord',
        name:'日志管理',
        element:lazyLoading('DailyRecord'),
        icon:<ContainerOutlined />,
        meta:{
            isMenu:true,
        },
        children:[
          {
            index:true,
            path:'/dailyRecord',
            element:<Navigate to={"landingLog"}/>,
            meta:{
              isMenu:false,
            }
          },
          {
            path:'/dailyRecord/landingLog',
            name:'登陆日志',
            element:lazyLoading('DailyRecord/LandingLog'),
            meta:{
                isMenu:true,
            },
          },
          {
            path:'/dailyRecord/operationLog',
            name:'操作日志',
            element:lazyLoading('DailyRecord/OperationLog'),
            meta:{
                isMenu:true,
            },
          }
        ]
      },
    ]
  },
  {
    path:'/login',
    element:lazyLoading('Login'),
    meta:{
      isMenu:false
    }
  }
]

export default () =>{
  const renderRouters = useRoutes(routes)
  return renderRouters
}