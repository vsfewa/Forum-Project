import {Layout} from 'antd';
import NavigateBar from '../components/navigate';
import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

const {Footer} = Layout;

export default class Forgetpwd extends React.Component{
        render() {
        return(
        <Layout className="layout">
            <NavigateBar />
            <div>~~~忘记密码表单~~~~</div>
            <Footer style={{textAlign: 'center'}}>Design ©2020 by Group I</Footer>
        </Layout>
        );
    }
}
 
