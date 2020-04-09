import React from 'react';
import './App.css';
import {Layout, Menu, Breadcrumb, Avatar, Dropdown, Input} from 'antd';
import {HomeFilled} from '@ant-design/icons';
import Text from "antd/es/typography/Text";
import axios from 'axios';
import cookie from 'react-cookies'


const {Search} = Input;
const {Header, Footer, Content} = Layout;
const loginGithubUrl = "https://github.com/login/oauth/authorize?client_id=d25125e25fe36054a4de&redirect_uri=106.12.27.104:80&scope=user&state=1";


const userCenter = (
    <Menu theme="dark">
        <Menu.Item className="userCenterItemStyle">
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                个人中心
            </a>
        </Menu.Item>
        <Menu.Item className="userCenterItemStyle">
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                我的帖子
            </a>
        </Menu.Item>
        <Menu.Item className="userCenterItemStyle">
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                回复我的
            </a>
        </Menu.Item>
    </Menu>
);


async function ToLogin(urlParam) {
    let person_info = (await axios.get('/api/toLogin', {params: {urlParam: urlParam}})).data;
    console.log(person_info);
    cookie.save('login', person_info.login);
    cookie.save('token', person_info.token);
    cookie.save('avatarUrl', person_info.avatar_url);
    return person_info;
}


class NavigateBar extends React.Component {
    async componentWillMount() {
        let url = document.URL;
        if (url.search("callback") !== -1) {
            let urlParam = url.split("?")[1];
            await ToLogin(urlParam);
            this.forceUpdate();
        }
    }

    render() {
        if (cookie.load('login') === undefined)
            this.loginButton = <a href={loginGithubUrl}>登录</a>;
        else
            this.loginButton = <Dropdown overlay={userCenter}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    {cookie.load('login')}&nbsp;&nbsp;<Avatar shape="square" size={28} src={cookie.load('avatarUrl')}/>
                </a>
            </Dropdown>;

        return (
            <Layout className="layout">
                <Header>
                    <div className="logo">
                        <a href="/index.html">
                            <HomeFilled twoToneColor/>
                            <Text style={{color: '#1890ff'}}>&nbsp;&nbsp;校园论坛</Text>
                        </a>
                    </div>
                    <div className="search">
                        <Search placeholder="搜索问题或找人" onSearch={value => console.log(value)} enterButton/>
                    </div>
                    <Menu size="small" theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item className="menuItemStyle" key="1">版面列表</Menu.Item>
                        <Menu.Item className="menuItemStyle" key="2">新帖</Menu.Item>
                        <Menu.Item className="menuItemStyle" key="3">通知</Menu.Item>
                        <Menu.Item className="menuItemStyle" key="4">{this.loginButton}</Menu.Item>
                    </Menu>
                </Header>

                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">Content</div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Design ©2020 by Group I</Footer>
            </Layout>
        );
    }
}

export default NavigateBar;