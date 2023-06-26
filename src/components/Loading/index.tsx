import React, { FC } from 'react';
import {  Spin } from 'antd';
import './index.less'
interface Props { 
  // Put your props here
}

const Loading: FC<Props> = (props) => (
    <div>
       <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </div>
  );

export default Loading;