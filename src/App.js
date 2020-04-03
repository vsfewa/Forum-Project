import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Footer,  Content } = Layout;



function NavigateBar() {
    return (
      <Layout className="layout">
      <Header>
        <div className="logo" >
          <a href = "/index.html">
            <img src="./favicon.ico" style={{width: '80px',height: '30px'}} />
          </a>   
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">Content</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
    );
}

export default NavigateBar;

