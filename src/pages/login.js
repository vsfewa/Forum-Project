import React from 'react';
import logo from '../picture/ZJU.jpg';
import {List} from 'antd';
import cookie from 'react-cookies';
import axios from 'axios';

class Login extends React.Component{
      constructor(props){
          super(props);
      this.state = {
               password:'',
               email:'',
      }
      this.handleChange=this.handleChange.bind(this);
      this.submit=this.submit.bind(this);
  }
  
  async submit(){
     let formData = new FormData();
     formData.append('password',this.state.password);
     formData.append('email',this.state.email);
     let ret=(await axios.post('/api/login',formData)).data;
     let state=ret.state;
     if(state==true){
      cookie.save('token',ret.authorizeToken);
      cookie.save("name",this.state.name);
      window.location.href="http://106.12.27.104/";//实际使用
     }
     else {
        let message=ret.message;
        alert(message);
     }
  }
  handleChange(event) {
     this.setState({[event.target.name]: event.target.value});
  }
  render(){
    return(
      <div>
            <div className="logo-container"> 
                  <img className="logo-img"  src={logo} />
            </div>
            <div className="information">
               <List>
                    <input type="text" value={this.state.email} onChange={this.handleChange} placeholder="邮箱" name="email" />
                </List>
                <List>
                     <input type="text" value={this.state.password} onChange={this.handleChange} placeholder="密码" name="password"/>
                 </List>
                   <button onClick={this.submit}>登陆</button>
               
            </div>
      </div>
           )
      }
}
 
export default Login;