import React from "react";
import {Redirect} from "umi";
import Cookie from "cookie";
import './index.less';
import "../global.less";

export default (props) => {

  //判断是否登录
  let isLogin = false;
  const {token} = Cookie.parse(document.cookie);
  if(token){
    isLogin = true;
  }

  // let isLogin = true;

  if (isLogin) {
    return <div className="starty-project">{ props.children }</div>;
  } else {
    return <Redirect to="/login" />;
  }
}
