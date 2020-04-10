import React from 'react';
import ReactDOM from 'react-dom';
import NavigateBar from './components/navigate';
import {Layout,  Breadcrumb} from 'antd';

const {Footer, Content} = Layout;
export default class Index extends React.Component {
  render() {
      return (
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


