import React, { Component } from 'react';
import { signIn, signUp, signOut } from './Api';
import { TextField, Button } from '@material-ui/core';
import './LoginPanel.scss';

const SIGN_UP = "Sign up", SIGN_IN = "Sign in";

class LoginPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.initialState = this.state;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const target = e.target;
    target.reset();

    await signIn(this.state.user);
    this.setState({ user: {} });
  }

  render() {
    return (
      <form className="login-panel" style={this.props.style} onSubmit={this.handleSubmit}>
        <TextField name="username" label="Username" onChange={this.handleChange} />
        <TextField name="password" type="password" label="Password" onChange={this.handleChange} />
        <Button type="submit" variant="contained" color="primary">Sign in</Button>
        <Button variant="contained" color="primary" onClick={signOut}>Sign out</Button>
      </form >
    );
  }
}

export default LoginPanel;