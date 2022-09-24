import React, { Component } from 'react';
import styled from 'styled-components'
import OpenViduVideoComponent2 from './OvVideo2';

export default class CamBig extends Component {

render() {   
  return (
    <>
        {this.props.streamManager !== undefined ? (
          <Camsmall>
            <OpenViduVideoComponent2 streamManager={this.props.streamManager}/>
          </Camsmall>
        ) : null}
    </>
  )
}
}


const Camsmall=styled.div`
border: solid 1px green;
background: #D9D9D9;
border-radius: 20px;
width: 300px;
box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
