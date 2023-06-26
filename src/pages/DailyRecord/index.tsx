import React, { FC } from 'react';
import {Outlet} from 'react-router-dom'
interface Props {
  // Put your props here
}

const DailyRecord: FC<Props> = (props) =>{ 

return (
    <div>
      <Outlet/>
    </div>
  );
}

export default DailyRecord;