import React from 'react';
import ReactDOM from 'react-dom/client';
// 引入全局配置模块，利用 React 的 context 特性，使配置全局生效。
import { ConfigProvider } from 'antd';
// 中文模块
import zhCN from 'antd/es/locale/zh_CN';
import {BrowserRouter as Router} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './store';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ConfigProvider>
);
reportWebVitals();
