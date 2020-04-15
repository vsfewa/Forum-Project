import React from 'react';
import NavigateBar from '../components/navigate'
import { Layout } from 'antd';
import axios from 'axios';
import cookie from 'react-cookies';

const {Footer}=Layout;

export default class register extends React.Component{
    render() {
        return(
        <Layout className="layout">
            <NavigateBar />
            <div>~~~注册表单~~~~</div>
            <Footer style={{textAlign: 'center'}}>Design ©2020 by Group I</Footer>
        </Layout>
        );
    }
}