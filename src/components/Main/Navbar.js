import React, {Component} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import ulimelogo from "../../static/ulime.png";
import {verifyToken} from "../../common/TokenAPI";
import user from '../../static/user.png';

class MyNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: null,
    }
  }

  componentDidMount() {
    verifyToken().then(response => this.checkIfLoggedIn(response));
  }

  checkIfLoggedIn = (response) => {
    if (!response) {
      this.setState({isLoggedIn: false});
    } else {
      const now = Math.round(new Date().getTime() / 1000);
      this.setState({isLoggedIn: response.data.verified && response.data.info.exp > now});
    }
  };

  render() {
    console.log('state', this.state);
     return(
       <Navbar sticky="top" collapseOnSelect expand="lg" style={{backgroundColor: 'white', boxShadow: '0px 0px 3px 1px #C0C0C0'}}>
         <Navbar.Brand href="/"><img src={ulimelogo} style={{width: '1em', height: '1em'}} /></Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
           {/*<Nav className="mr-auto">*/}
           {/*  <Nav.Link href="#features">Features</Nav.Link>*/}
           {/*  <Nav.Link href="#pricing">Pricing</Nav.Link>*/}
           {/*</Nav>*/}
           <Nav>
             {this.state.isLoggedIn
               ? <img style={{width: '2em', height: '2em', borderRadius: '20px', border: '1px solid #F57A9E'}} alt={'hi'} src={user} />
               : <Nav.Link eventKey={2} href="login">
                  Login
                </Nav.Link>
             }
           </Nav>
         </Navbar.Collapse>
       </Navbar>
     );
  }
}

export default MyNavBar;
