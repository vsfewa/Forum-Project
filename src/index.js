import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import register from './pages/register';
import login from './pages/login';
import homepage from './pages/homepage'

export default class Routing extends React.Component {
  render() {
      return (
        <Router >
          <div>
            {/*index.js不做任何界面渲染，只引入跳转路径，初始界面为/（homepage），使用‘exact’防止NavigateBar界面的重复渲染*/}
            <Route exact path="/" component={homepage} />
            <Route path="/login" component={login} />
            <Route path="/register" component={register} />
       	  </div>
        </Router>
      );
  }
}

ReactDOM.render(<Routing />, document.getElementById("root"));
