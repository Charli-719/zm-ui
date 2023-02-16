import React, {useEffect, useState} from "react";
import {UserOutlined, LineChartOutlined, ClockCircleOutlined, QuestionCircleOutlined, LogoutOutlined} from "@ant-design/icons";
import {Button, Layout, Menu, Result, Modal} from "antd";
import {history, Route, Link} from "umi";
import Service from "../../data/Services";
import Cookie from "cookie";

import "./index.less";

const { confirm } = Modal;
const { SubMenu } = Menu;
const {Sider, Content} =  Layout;

export default function(props) {
  const {match} = props;
  const [activeKey, setActiveKey] = useState("/user/settings");

  useEffect(()=>{
    console.log("user-props:", props);
    setActiveKey(props.location.pathname);
  }, [])


  function showConfirm(){
    confirm({
      title: '退出确认',
      icon: <QuestionCircleOutlined />,
      content: '是否确定退出登录?',
      onOk() {
        // //退出
        // Service().logout().then((res)=>{
        //   if(res.code == 200){
        //     sessionStorage.clear();
        //     document.cookie = Cookie.serialize("token", "");
            window.location.href = "#/login";
        //   }else{
        //     message.error(res.message);
        //   }
        // }).catch(err=>console.log(err));
      },
      onCancel() {
        console.log('Cancel');
        setActiveKey(props.location.pathname);
      },
    })
  }

  return (
    <div className="user-center">

    </div>
  );
}
