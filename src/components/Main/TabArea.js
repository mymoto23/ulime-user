// import React from "react";
// import Card from "react-bootstrap/Card";
//
// const TabArea = ({items}) => {
//   console.log('props', items);
//   return (
//     <div>
//       {/*{items && items.map(i =>*/}
//       {/*  <Card>*/}
//       {/*    {i.title}*/}
//       {/*  </Card>*/}
//       {/*)}*/}
//     </div>
//   );
// };
//
//
// export default TabArea;

import React, {Component} from 'react';
import axios from "axios";
import {Card} from "react-bootstrap";

class TabArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    this.props.category && this.retrieveChannels(+this.props.category);
  }

  retrieveChannels = async (category) => {
    const result = category === 100 ? await axios.get(`http://localhost:8000/api/channels`)
      : await axios.get(`http://localhost:8000/api/channels?category=${category}`);
    this.setState({items: result.data});
    console.log('test', result, category);
  };

  render() {
    const {items} = this.state;
    // console.log('state', items);
    return(
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {items && items.map(i =>
          <Card style={{display: 'flex', width: '14em', margin: '0.5em'}} key={i._id}>
            <a href={`/channel/${i._id}`} style={{position: 'absolute', top: 0, left: 0, height: '100%', width: '100%'}} />
            <Card.Header style={{backgroundColor: 'white', display: 'flex', justifyContent: 'center'}}>
              <img src={i.thumbnail.url} style={{borderRadius: "50%", height: '8em', width: '8em'}} />
            </Card.Header>
            <Card.Body style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
              <h6>{i.titleENG}</h6>
              <span style={{fontSize: '14px'}}>{i.intro}</span>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}

export default TabArea
