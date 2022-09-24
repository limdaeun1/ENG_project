import React, { Component } from 'react';
import styled from 'styled-components'
import OpenViduVideoComponent from './OvVideo';

export default class CamBig extends Component {

render() {   
  return (
    <>
        {this.props.streamManager !== undefined ? (
          <Cam>
            <OpenViduVideoComponent streamManager={this.props.streamManager}/>
          </Cam>
        ) : null}
    </>
  )
}
}


const Cam=styled.div`
border: solid 1px green;
background: #D9D9D9;
border-radius: 20px;
margin-left: 215px;
width: 430px;
height: 322px;
box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;