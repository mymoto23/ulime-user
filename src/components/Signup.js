import React, {Component} from 'react';
import {Button, Col, InputGroup, Row} from "react-bootstrap";
import {CountryDropdown} from "react-country-region-selector";
import {toast} from 'react-toastify';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import {API_URL} from "../static/constants";
import "react-datepicker/dist/react-datepicker.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameAvailable: null,
      password: '',
      passwordConfirm: '',
      passwordMatch: null,
      firstName: '',
      lastName: '',
      gender: 0,
      dob: new Date("2000-01-01"),
      nationality: '',
    };
  }

  isUserDataValid = () => {
    const {usernameAvailable, passwordMatch, firstName, lastName, gender, nationality} = this.state;
    return usernameAvailable === 2 || passwordMatch === 2 || firstName || lastName || gender !== 0 || nationality;
  };

  checkAvailability = async () => {
    if (!this.state.username) {
      toast.error('Username cannot be empty.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/auth/check_availability`, {username: this.state.username});
      if (response.data.available) {
        this.setState({usernameAvailable: 2});
      } else {
        this.setState({usernameAvailable: 1});
      }
    } catch(e) {
      toast.error('There was an error. Please try again later.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    }
  };

  checkPasswordMatch = (e) => {
    this.setState({passwordConfirm: e.target.value});
    if (this.state.password === e.target.value) {
      this.setState({passwordMatch: 2});
    } else {
      this.setState({passwordMatch: 1});
    }
  };

  createNewUserRequest = async () => {
    if (!this.isUserDataValid()) {
      toast.error('Please fill in all the fields properly.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
      return;
    }
    const {username, password, firstName, lastName, gender, dob, nationality} = this.state;
    try {
      await axios.post(`${API_URL}/auth/register`, {
        username,
        password,
        firstName,lastName,
        gender,
        dob,
        nationality
      });
      toast.success('Successfully registered!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
      this.props.history.push('/login');
    } catch (e) {
      toast.error(e.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    }
  };

  render() {
    const {usernameAvailable, passwordMatch} = this.state;
    return(
      <div>
        <Row>
          <Col>
            <InputGroup className={'m-3'}>
              <InputGroup.Prepend>
                <InputGroup.Text>Username</InputGroup.Text>
              </InputGroup.Prepend>
              <input type={'text'} name={'username'} value={this.state.username} onChange={e => this.setState({username: e.target.value, usernameAvailable: null})} />
              <InputGroup.Append>
                <Button onClick={() => this.checkAvailability()}>Check Availability</Button>
              </InputGroup.Append>
              {usernameAvailable === 2 && <span style={{marginLeft: '2em', fontSize: '10px', color: 'green'}}>Available!</span>}
              {usernameAvailable === 1 && <span style={{marginLeft: '2em', fontSize: '10px', color: 'red'}}>Unavailable.</span>}
            </InputGroup>
            <InputGroup className={'m-3'}>
            <InputGroup.Prepend>
              <InputGroup.Text>Password</InputGroup.Text>
            </InputGroup.Prepend>
            <input type={'password'} name={'password'} value={this.state.password} onChange={e => this.setState({password: e.target.value})} />
          </InputGroup>
            <InputGroup className={'m-3'}>
            <InputGroup.Prepend>
              <InputGroup.Text>Confirm PW</InputGroup.Text>
            </InputGroup.Prepend>
            <input type={'password'} name={'passwordConfirm'} value={this.state.passwordConfirm} onChange={e => this.checkPasswordMatch(e)} />
            {passwordMatch === 2 && <span style={{marginLeft: '2em', fontSize: '10px', color: 'green'}}>Match!</span>}
            {passwordMatch === 1 && <span style={{marginLeft: '2em', fontSize: '10px', color: 'red'}}>Password does not match.</span>}
          </InputGroup>
            <InputGroup className={'m-3'}>
              <InputGroup.Prepend>
                <InputGroup.Text>First Name</InputGroup.Text>
              </InputGroup.Prepend>
              <input type={'text'} name={'firstName'} value={this.state.firstName} onChange={e => this.setState({firstName: e.target.value})} />
            </InputGroup>
            <InputGroup className={'m-3'}>
              <InputGroup.Prepend>
                <InputGroup.Text>Last Name</InputGroup.Text>
              </InputGroup.Prepend>
              <input type={'text'} name={'lastName'} value={this.state.lastName} onChange={e => this.setState({lastName: e.target.value})} />
            </InputGroup>
            <InputGroup className={'m-3'}>
              <InputGroup.Prepend>
                <InputGroup.Text>Gender</InputGroup.Text>
              </InputGroup.Prepend>
              <select value={this.state.gender} onChange={e => this.setState({gender: e.target.value})}>
                <option value={0}>Select gender</option>
                <option value={1}>Male</option>
                <option value={2}>Female</option>
              </select>
            </InputGroup>
            <InputGroup className={'m-3'}>
              <InputGroup.Prepend>
                <InputGroup.Text>Date of Birth</InputGroup.Text>
              </InputGroup.Prepend>
              <DatePicker
                selected={this.state.dob}
                onChange={date => this.setState({dob: date})}
              />
            </InputGroup>
            <InputGroup className={'m-3'}>
              <InputGroup.Prepend>
                <InputGroup.Text>Nationality</InputGroup.Text>
              </InputGroup.Prepend>
              <CountryDropdown value={this.state.nationality} onChange={country => this.setState({nationality: country})} />
            </InputGroup>
            <Button className={'ml-3'} type={'submit'} onClick={() => this.createNewUserRequest()}>Register</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SignUp;
