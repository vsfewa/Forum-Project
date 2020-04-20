import React from 'react';
import '../asset/register.css';
import logo from '../picture/ZJU.jpg';
import {List} from 'antd';
import axios from 'axios';
import cookie from 'react-cookies';

class register extends React.Component{
constructor(props){
   super(props);
	this.state = {
      name:'',
      password:'',
      email:'',
      token:'',
   }
   this.handleChange=this.handleChange.bind(this);
   this.submit=this.submit.bind(this);
   this.check=this.check.bind(this);
}
async submit(){
   let formData = new FormData();
   formData.append('password',this.state.password);
   formData.append('email',this.state.email);
   formData.append('name',this.state.name);
   formData.append('token',this.state.token);
   let register_return=(await axios.post('/api/register',formData)).data;//实际使用
   
   let state =false;
   state=register_return.state;
   if(state===true){
      console.log(register_return);
      alert(register_return.message);
      cookie.save("token",register_return.authorizeToken);
      cookie.save("name",this.state.name);
      window.location.href="http://106.12.27.104/";//实际使用用
   }
   else {
      let message=register_return.message;
      alert(message);
   }
}
//发送验证码
async check(){
   console.log(this.state.email);
   let formdata = new FormData();
   formdata.append('email',this.state.email);
   let ret = (await axios.post('/api/applyEmail',formdata)).data;//调用验证码接口?
   let success = ret.state;
   if(success){
      alert(ret.message);
   }
   else {
      alert("Some wrongs happened, please retry!");
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
                  <input type="text" value={this.state.name} onChange={this.handleChange} placeholder="用户名" name="name" />
              </List>
              <List>
                   <input type="text" value={this.state.password} onChange={this.handleChange} placeholder="密码" name="password"/>
               </List>
               <List>
                   <input type="text" value={this.state.email} onChange={this.handleChange} placeholder="邮箱" name="email"/>
                </List>
                <List>
                    <input type="text"value={this.state.token} onChange={this.handleChange} placeholder="验证码" name="token"/>
                    <button onClick={this.check}>获取</button>
                 </List>
            	<button onClick={this.submit}>注册</button>
             
          </div>
    </div>
         )
    }
}
 
export default register;