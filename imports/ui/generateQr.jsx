import React, { Component } from 'react'
import QRCode from 'qrcode.react';
import {Rnd} from 'react-rnd';
import { withTracker } from "meteor/react-meteor-data";
import { Card, Spin } from 'antd'
import { Classe } from '../api/classes'
class QrCode extends Component {
  render() {
    return (
      <Card style={{backgroundColor : 'white'}} loading={!this.props.ready}>       <Rnd
        default={{
          x: 300,
          y: 100,
          width: 300,
          height: 300,
        }}

        bounds="window"
      >
      {this.props.data ? 
          <QRCode value={`https://capstone-classify.herokuapp.com/attendance/${this.props.id}/d/${this.props.today}/c/${this.props.data.classCounter}`} style={{ width : '100%', height : 'auto'}}/>
          : <Spin />}
          </Rnd>
          </Card>
    )
  }
}


const ViewArticlesWrapper = withTracker(props => {
  const id = props.id;
  const status = Meteor.subscribe("get.classes");
  const data = Classe.findOne({_id : id})
  let today = new Date().getDay();
  console.log(today);
  const ready = status.ready();
  return {
    id,
    data,
    ready,
    today,
    ...props
  };
})(QrCode);

export default ViewArticlesWrapper;
