import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
import {Row, Col} from 'react-bootstrap';
import youtubelogo from '../../static/youtubelogo.png';

class ChannelDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: {},
    };
  }

  componentDidMount() {
    this.props.match && this.retrieveChannel(this.props.match.params.channel_id);
  }

  retrieveChannel = async (channelId) => {
    const URL = `http://localhost:8000/api/channels/${channelId}`;
    const result = await axios.get(URL);
    this.setState({channel: result.data});
  };

  simplifyNum(num) {
    const div = num/1000;
    if (num < 1000) return num;
    else if (div >= 1 && div < 1000 ) return `${div}K`;
    else if (div >= 1000) return `${div/1000}M`;
  }

  render() {
    console.log('props', this.state);
    const {channel} = this.state;
    return(
      <div>
        {
          !_.isEmpty(channel) && <div>
            <div>
              <img src={channel.bannerURL} style={{width: '100%'}}/>
            </div>
            <div style={{padding: '2em', paddingLeft: '5em', paddingRight: '3em', borderBottom: '1px solid lightgrey'}}>
              <Row>
                <Col md={2}>
                  <img src={channel.thumbnail.url} style={{borderRadius: "50%", height: '8em', width: '8em'}} />
                </Col>
                <Col md={3} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}} >
                  <h5>{channel.titleENG} <h6 style={{fontWeight: 'lighter'}}>({channel.title})</h6></h5>
                  <span>{channel.intro}</span>
                </Col>
                <Col md={{offset: 6}} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  <a href={channel.channelURL}>
                    <img src={youtubelogo} style={{width: '2em', height: '1.5em'}} />
                  </a>
                  <span style={{fontSize: '14px',color: 'grey'}}>{this.simplifyNum(channel.subNum)}</span>
                </Col>
              </Row>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ChannelDetail
