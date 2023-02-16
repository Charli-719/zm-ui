/**
 * Created by fuzhen on 2022/3/8.
 * 全局loading页面
 */
import React from "react";
import {Spin} from "antd";
import "../global.less";


export default () => (
    <div className="loading-page">
      <Spin size="large"/>
    </div>
);
