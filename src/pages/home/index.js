/**
 * Created by lifuzhen on 2022/5/22.
 *
 */
import React from "react";
import Nav from "@/components/nav";
import "./index.less";

export default function (props){

  return <div className="home-page">
    <Nav list={[
      {title: "首页", key: 0,  to: ""}
    ]}/>
    <div className="home-content">
      <p className="user">您好，某某某</p>
      <p>欢迎来到XXX管理系统！</p>
    </div>
  </div>
}
