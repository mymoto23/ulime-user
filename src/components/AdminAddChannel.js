import React, {Component} from 'react';
import {CATEGORIES, CATEGORY_TYPE_STRINGS} from "../static/constants";
import {Input} from "reactstrap";
import axios from 'axios';
import {Button} from "react-bootstrap";

class AdminAddChannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelId: '',
      category: 0,
      intro: '',
      titleENG: '',
    }
  }

  async addChannel() {
    const {channelId, category, intro, titleENG} = this.state;
    if (!channelId || !category || !titleENG || !intro) {
      alert('빈칸 다 채워주세용~');
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/channels', this.state).then(() => alert('추가완료'));
    } catch (e) {
      alert(e);
      console.log('error', e);
    }
  }

  render() {
    return(
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Input type={'text'} placeholder={'unique channel id ex)UC6XZ4fmiUPQk6ws6fGs2rQg'} value={this.state.channelId} onChange={e => this.setState({channelId: e.target.value})} />
        <Input type={'select'} onChange={e => this.setState({category: +e.target.value})}>
          <option value={0}>Select</option>
          {CATEGORIES.map(v => <option key={v} value={v}>{CATEGORY_TYPE_STRINGS[v]}</option>)}
        </Input>
        <Input type={'text'} placeholder={'Intro'} value={this.state.intro} onChange={e => this.setState({intro: e.target.value})} />
        <Input type={'text'} placeholder={'english channel name'} value={this.state.titleENG} onChange={e => this.setState({titleENG: e.target.value})} />
        <Button type={'submit'} onClick={() => this.addChannel()}>Add Channel</Button>
      </div>
    );
  }

}

export default AdminAddChannel;
