import React, {Component} from 'react';
import Fade from 'react-bootstrap/Fade'
import {Tab, Tabs} from 'react-bootstrap';
import '../../style/custom.css';
import TabArea from "./TabArea";

class Main extends Component {

  render() {
    return(
      <div style={{width: '100%', padding: '1em'}}>
        {/*<button onClick={() => this.testAPI()} />*/}
        {/*{this.state.channel && <img src={this.state.channel.bannerURL} />}*/}
        <Tabs style={{padding: '1em'}} variant="pills" transition={Fade} defaultActiveKey="100">
          <Tab eventKey="100" title="All">
            <TabArea history={this.props.history} category={100} />
          </Tab>
          <Tab eventKey="0" title="Entertainment">
            <TabArea history={this.props.history} category={5} />
          </Tab>
          <Tab eventKey="1" title="People">
            <TabArea history={this.props.history} category={1} />
          </Tab>
          <Tab eventKey="2" title="Music">
            <TabArea history={this.props.history} category={2} />
          </Tab>
        </Tabs>

      </div>
    );
  }
}

export default Main;
