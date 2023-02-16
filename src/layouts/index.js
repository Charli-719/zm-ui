import React, {useEffect, useState} from "react";
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import "./index.less";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BellOutlined
} from '@ant-design/icons';
import {Link} from "umi";
import {IconFont} from "@/data/utils";

const { Header, Sider, Content } = Layout;

const BasicLayout = (props) => {

  const {location} = props;
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState("home"); //菜单默认激活首页

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  //判断当前激活的菜单
  useEffect(()=>{
    console.log("location.pathname:", location.pathname);
    const pathnameArr = location.pathname.split("/");
    console.log("pathnameArr:", pathnameArr);
    if(pathnameArr[1] !== activeKey  && pathnameArr[1]){
      setActiveKey(pathnameArr[1] ? pathnameArr[1] : "home");
    }
  }, [props]);


  const items = [
    { label: <Link to="/home">首页</Link>  , key: 'home', icon: <IconFont type="icon-list"/>}, // 菜单项务必填写 key
    {
      label: '学科管理',
      key: 'subject',
      icon: <IconFont type="icon-Table"/>,
      children: [
        { label: <Link to="/category">学科类别</Link>, key: 'category' },
        { label: <Link to="/course">科目信息</Link>, key: 'course' }
      ]
    },
    {
      label: '学员管理',
      key: 'member',
      icon: <IconFont type="icon-yibiaopan"/>,
      children: [
        { label: <Link to="/student">学员信息</Link>, key: 'student' },
        { label: <Link to="/contact">联系人信息</Link>, key: 'contact' },
        { label: <Link to="/progress">学习进度</Link>, key: 'progress' }
      ]
    },
    {
      label: '资源中心',
      key: 'resource',
      icon: <IconFont type="icon-correct-c-o"/>,
      children: [
        { label: <Link to="/examination">试卷库</Link>, key: 'examination' },
        { label: <Link to="/question">题库</Link>, key: 'question' },
        { label: <Link to="/courseware">课件管理</Link>, key: 'courseware' }
      ]
    },
    {
      label: '官网管理',
      key: 'website',
      icon: <IconFont type="icon-edit"/>,
      children: [
        { label: <Link to="/consult">咨询管理</Link>, key: 'consult' }
      ]
    },
    {
      label: '系统设置',
      key: 'system',
      icon: <IconFont type="icon-warning"/>,
      children: [
        { label: <Link to="/account">账号管理</Link>, key: 'account' },
        { label: <Link to="/permission">权限管理</Link>, key: 'permission' }
      ]
    },
  ];  return (
    <Layout className="layout-page">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">logo</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['home']}
          selectedKeys={[activeKey]}
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => toggle(),
          })}
          <div className="account-info">
            <BellOutlined />
            <Dropdown overlay={
              <Menu
                width="120"
                items={[
                  {
                    label: <Link to="/personal">个人信息</Link>,
                    key: '0',
                  },
                  {
                    type: 'divider',
                  },
                  {
                    label: <Link to="/login">退出登录</Link>,
                    key: '1',
                  },
                ]}
              />
            } trigger={['click']}>
              <p className="user">
                <Avatar>U</Avatar>
                <span>Admin</span>
              </p>
            </Dropdown>
          </div>
        {/*这里是用户登录的icon及用户名称*/}
        </Header>
        <Content
          className="site-layout-background"
        >
            {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default BasicLayout;
