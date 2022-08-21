import { Outlet } from "react-router-dom";
import  Menu from './Menu.js';

import React from 'react';

const WebLayout = () => {
  return (
    <div>
      <Menu/>
      <Outlet/>
      
    </div>
  );
};

export default WebLayout;