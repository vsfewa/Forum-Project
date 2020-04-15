import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router,Route} from 'react-router-dom';
import {Layout,  Breadcrumb} from 'antd';

import NavigateBar from './components/navigate';
import App from './App';
import register from './components/register';
import Login from './components/login';



const {Footer, Content} = Layout;
export default class Index extends React.Component {
  render() {
      return (

        <Router >
                <div>
                 {/*index.js不做任何界面渲染，只引入跳转路径，初始界面为/（NavigateBar），使用‘exact’防止NavigateBar界面的重复渲染*/}
	<Route exact path="/" component={NavigateBar} />
	<Route path="/Login" component={Login} />
	<Route path="/register" component={register} />
       	</div>
        </Router>
        <Layout className="layout">
          <NavigateBar />
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

ReactDOM.render(<Index />, document.getElementById("root"));


