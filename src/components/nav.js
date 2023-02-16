/**
 * Created by lifuzhen on 2022/5/22.
 * 面包屑导航
 */

import React, {useState} from "react";
import { Breadcrumb } from 'antd';
import {Link} from "umi";
import "./components.less";

const Nav = (props) => {
  const [navList, setNavList] = useState(props.list);

  return <div className="nav-page">
    <Breadcrumb>
      {navList.map((x)=>{
        return <Breadcrumb.Item key={x.key}>
          {x.to ? <Link to={x.to}>{x.title}</Link> : x.title}
        </Breadcrumb.Item>
      })}
    </Breadcrumb>
  </div>
}

export default Nav;
