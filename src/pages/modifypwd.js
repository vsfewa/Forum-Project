import {Layout} from 'antd';
import NavigateBar from '../components/navigate';
import React from 'react';
import { Form, Input, Button, Checkbox, Breadcrumb} from 'antd';
import axios from 'axios';

const {Footer,Content} = Layout;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
wrapperCol: { offset: 8, span: 16 },
};
  

const onFinish = values => {
    console.log('Success:', values);
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
var dis = false;
async function applyEmail(emailAddress){
    let formData = new FormData();
    formData.append('email',emailAddress);
    let ret = (await axios.post('/api/applyEmail',formData)).data;
    let success = ret.state;
    if(success){
        dis=true;
    }
    else {

    }
}



export default class Modifypwd extends React.Component{
    formRef = React.createRef();
    checkEmail(rule,value,callback){
        const reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
        if(!reg.test(value)){
            callback('请输入正确的邮箱地址');
        }
        callback();
    }
    handleSubmit = () => {
    }

    render() {
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
                    onFinish={this.handleSubmit}
                    onFinishFailed={onFinishFailed}
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
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        label="Captcha"
                        name="captcha"
                        rules={[{ required: true, message: 'Please input captcha!' }]}
                    >
                        <Input allowClear={true}/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button disabled={dis} htmlType="submit">
                        Send Email{this.senditagain}
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
}