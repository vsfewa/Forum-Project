import React from 'react';
import ReactDOM from 'react-dom';
import NavigateBar from './components/navigate'
import { Layout } from 'antd';

ReactDOM.render(
    <Layout className="layout">
        <NavigateBar />
    </Layout>
    , document.getElementById("root"));