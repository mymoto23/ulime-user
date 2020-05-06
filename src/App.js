import React from 'react';
import './App.css';
import Main from "./components/Main/Main";
import {Route, Switch} from 'react-router-dom';
import ChannelDetail from "./components/Channel/ChannelDetail";
import AdminAddChannel from "./components/AdminAddChannel";
import MyNavBar from './components/Main/Navbar';
import {toast} from "react-toastify";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

toast.configure();

const App = () => (
    <div>
      <MyNavBar />
      <Switch>
        <Route exact path={'/'} component={Main} />
        <Route exact path={'/login'} component={LoginPage} />
        <Route exact path={'/channel/:channel_id'} component={ChannelDetail} />
        <Route exact path={'/admin/addchannel'} component={AdminAddChannel} />
        <Route exact path={'/signup'} component={SignUpPage} />
      </Switch>
    </div>
  );

export default App;
