import React from "react";

class LoginForm extends React.Component {
    state = {
        account:{username:"",password:""}
    };
    handleSubmit = e => {
        e.preventDefault();
        //Call server
        //save changes
        console.log("Submitted");
    };
    handleChange = ({currentTarget:input}) => {
        const account = {...this.state.account};
        account[input.name]=input.value;
        this.setState({account});
    };
    render() {
        const {account}=this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input name="username" value={account.username} onChange={this.handleChange} autoFocus id="username" type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input name="password" value={account.password} onChange={this.handleChange} id="password" type="text" className="form-control" />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
