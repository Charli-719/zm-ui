import React, {useEffect, useState} from "react";
import { Form, Input, Button, Checkbox, message, Tooltip} from 'antd';
import {UserOutlined, UnlockOutlined, CloseCircleOutlined} from "@ant-design/icons";
import Service from "../../data/Services";
import Cookie from "cookie";
import "./index.less";

const Login = () => {
  const [verifyCode, setVerifyCode] = useState("");

  useEffect(()=>{
    randomCode();//获取随机验证码
  },[])

  const onFinish = (values) => {
    //前端模拟的登录
    if(values.username != "admin"){
      message.error("请输入正确的账号");
      return
    } else if(values.password != "admin"){
      message.error("请输入正确的密码");
      return
    }else if(verifyCode != values.verifyCode){
      message.error("请输入正确的验证码");
      return
    }
    sessionStorage.setItem("username",values.username);
    sessionStorage.setItem("password", values.password);
    document.cookie = Cookie.serialize("token", "913heighqerg45q90rnj3ht3q48th3b");
    message.success("登录成功");
    window.location.href = "/#/home";

    //使用登录接口
    // Service().login({username: values.username, password: values.password}).then((res)=>{
    //   if(res.code == 200){
    //     sessionStorage.setItem("username",values.username);
    //     sessionStorage.setItem("password", values.password);
    //     document.cookie = Cookie.seriali
    //     ze("token", res.data.token);
    //     message.success("登录成功");
    //     window.location.href = "/#/home";
    //   }else {
    //     message.error(res.message);
    //   }
    // })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // 生成验证码
  const randomCode = () => {
    const characters = "0123456789";
    let str = ""
    for (let i = 0; i < 4; i++) {
      str += characters[getRandom(0, characters.length - 1)]
    }
    setVerifyCode(str);
    return str
  }
  const getRandom = (l, r) => {
    return parseInt(l + Math.random() * (r - l + 1));
  }


    return <div className="login-page">
      {/*logo及网站名称*/}
      <div className="login-top">
        <img src="" alt="" className="logo"/>
        <p className="website-name">这是一个网站名称</p>
      </div>
      {/*登录的内容*/}
      <div className="login-content">
        <div className="website-url">
          <p>设计图</p>
        </div>
       <div className="login-container">
         <h3 className="login-title">用户登录</h3>
         <Form
           className="login-form"
           name="basic"
           initialValues={{ remember: true }}
           onFinish={onFinish}
           onFinishFailed={onFinishFailed}
           autoComplete="off"
         >
           <Form.Item
             name="username"
             required={false}
             rules={[{ required: true, message: '账号输入不能为空' }]}
           >
             <Input placeholder="请输入账号"/>
           </Form.Item>
           <Form.Item
             name="password"
             required={false}
             rules={[{ required: true, message: '密码不能为空' }]}
           >
             <Input.Password placeholder="请输入密码"/>
           </Form.Item>
           <Form.Item
             name="verifyCode"
             required={false}
             rules={[{ required: true, message: '验证码不能为空' }]}
           >
             <div className="verify-code-wrapper">
               <Input onChange={(e) => { console.log("e.target.value:", e.target.value)}} type="text" placeholder="请输入验证码" className="verify-code-input" />
               <Tooltip title="点击切换验证码">
                 <div className="verify-code" onClick={randomCode}>
                   {
                     verifyCode.split("").map((val, index) => (
                         <span key={index} style={{
                           display: "inline-block",
                           color: 'rgb(' + getRandom(0, 200) + ',' + getRandom(0, 200) + ',' + getRandom(0, 200) + ')', transform: 'skew(' + getRandom(-20, 20) + 'deg, ' + getRandom(-20, 20) + 'deg)',
                           fontSize: "20px"
                         }}>{val}</span>
                     ))
                   }
                 </div>
               </Tooltip>
             </div>
           </Form.Item>
           {/*<p className="tips">还没有账号? <a>立即注册</a></p>*/}
           <Form.Item>
             <Button type="primary" htmlType="submit">
               登录
             </Button>
           </Form.Item>
         </Form>
       </div>
      </div>
    </div>;
}
export default Login;
