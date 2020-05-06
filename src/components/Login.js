import React, {Component} from 'react';
import {Button, Col, InputGroup, Row} from 'react-bootstrap';
import axios from 'axios';
import {toast} from 'react-toastify';
import {API_URL} from "../static/constants";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (e) => {
    switch (e.target.name) {
      case 'username':
        this.setState({username: e.target.value});
        break;
      case 'password':
        this.setState({password: e.target.value});
        break;
      default:
        return;
    }
  };

  loginRequest = async () => {
    const {username, password} = this.state;
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password
      });
      if (response.data.success) {
        toast.success('Login Success!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: '2000'
        });
        sessionStorage.setItem('token', response.data.token).then();
        this.props.history.push('/');
      } else {
        toast.error('Login failed. Please check your login credentials.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000
        })
      }
    } catch (e) {
      toast.error('An error has occured. Please try again later.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      })
    }
  };

  render() {
    return(
      <div>
        <Row className={'justify-content-md-center'}>
          <Col md={{span: 6, offset: 3}}>
            <InputGroup className={'m-3'}>
              <InputGroup.Prepend>
                <InputGroup.Text>Username</InputGroup.Text>
              </InputGroup.Prepend>
              <input type={'text'} name={'username'} value={this.state.username} onChange={e => this.handleChange(e)} />
            </InputGroup>
            <InputGroup className={'m-3'}>
              <InputGroup.Prepend>
                <InputGroup.Text>Password</InputGroup.Text>
                <input type={'password'} name={'password'} value={this.state.password} onChange={e => this.handleChange(e)} />
              </InputGroup.Prepend>
            </InputGroup>
          </Col>
          <Col>
            <Button type={'submit'} onClick={() => this.loginRequest()}>Login</Button>
          </Col>
        </Row>
        <a href={'/signup'}>Don't have an account yet? Sign up!</a>
      </div>
    );
  }

}

export default Login;
