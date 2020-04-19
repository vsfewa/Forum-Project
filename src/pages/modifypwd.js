import {Layout} from 'antd';
import NavigateBar from '../components/navigate';
import React from 'react';
import { Form, Input, Button, Breadcrumb} from 'antd';
import axios from 'axios';
import cookie from 'react-cookies';

const {Footer,Content} = Layout;

//样式
const layout = {labelCol: { span: 8 },wrapperCol: { span: 16 },};
const tailLayout = {wrapperCol: { offset: 8, span: 16 },};

async function onFinish(values){
    let formData = new FormData();
    let email = values.email,password=values.password,token=values.token, autoken=cookie.load('token');
    formData.append('email',email);
    formData.append('password',password);
    formData.append('token',token);
    formData.append('authorizeToken',autoken);
    console.log("token:"+token+" \n authorizeToken:"+autoken);
    let modify_info = (await axios.post('/api/modify',formData)).data;
    console.log(modify_info);
    let success = modify_info.state;
    if(success){
        console.log(modify_info);
        window.location.href("http://106.12.27.104/");
    }
    else {
        alert(modify_info.message);
    }
};
async function sendEmail(emailAddress){
    if(emailAddress!=""){
        let formData = new FormData();
        formData.append('email',emailAddress);
        let ret = (await axios.post('/api/applyEmail',formData)).data;
        let success = ret.state;
        if(success){
            alert("You have reived the email contains token!");
            return true;
        }
        else {
            alert("Some wrongs happened, please retry!");
        }
    }
    return false;
}

export default class Modifypwd extends React.Component{
    constructor (props) {
        super (props);
        this.state = {
            email: '',
            loading: false,
            yztime: 59
        }
    }
    //倒计60s
    count = () => {
    　　let { yztime } = this.state;
        this.setState({ loading: true });
    　　let siv = setInterval(() => {
    　　　　this.setState({ yztime: (yztime--) }, () => {
    　　　　　　if (yztime <= -1) {
    　　　　　　　　clearInterval(siv);　　//倒计时( setInterval() 函数会每秒执行一次函数)，用 clearInterval() 来停止执行:
    　　　　　　　　this.setState({ loading: false, yztime: 59 })
    　　　　　　}
    　　　　});
    　　}, 1000);
    }
    checkEmail(rule,value,callback){
        const reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
        if(!reg.test(value)){
            callback('请输入正确的邮箱地址');
        }
        callback();
    }
    //邮箱地址
    modifyEmail (event) {
        let val = event.currentTarget.value;
        this.setState({
            email: val
        })
    }
    applyEmail(){
        let email = this.state.email;
        if(sendEmail(email)){
            this.count();
        }
    }

    render() {
        if(cookie.load("token")){
            return(
                <Layout className="layout">
                    <NavigateBar />
                    <Content style={{padding: '0 50px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-content">
                            修改密码
                            <br/><br/><br/>
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ 
                                        required: true, message: 'Please input your email address!' 
                                    },{
                                        validator:this.checkEmail.bind(this)
                                    }
                                ]}
                            >
                                <Input type="text" placeholder="please input email address" onBlur={ this.modifyEmail.bind(this) }/>
                            </Form.Item>
        
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password placeholder="please input password"/>
                            </Form.Item>
        
                            <Form.Item
                                label="Token"
                                name="token"
                                rules={[{ required: true, message: 'Please input token!' }]}
                            >
                                <Input allowClear={true} placeholder="please input token"/>
                            </Form.Item>
        
                            <Form.Item {...tailLayout}>
                                <Button onClick={this.applyEmail.bind(this)} loading={this.state.loading}>
                                {this.state.loading ? this.state.yztime + '秒' : '发送邮件验证'}
                                </Button>
                            </Form.Item>
        
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                Submit
                                </Button>
                            </Form.Item>
                        </Form>
                        </div>
                        
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Design ©2020 by Group I</Footer>
                </Layout>
                );
        }
        else{
            return(
                <Layout className="layout">
                    <NavigateBar />
                    <br/><br/><br/>
                    <h1 align="center">
                        请先登录！
                    </h1>
                </Layout>
            );
        }
    }
}