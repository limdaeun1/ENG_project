import React, { Component } from 'react';
import styled from 'styled-components'
import OpenViduVideoComponent2 from './OvVideo2';

export default class CamBig extends Component {

  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
}

render() {   
  return (
    <>
        {this.props.streamManager !== undefined ? (
          <Camsmall>
            <OpenViduVideoComponent2 streamManager={this.props.streamManager}/>
            <Nick><p>{this.getNicknameTag()}</p></Nick>
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
height: 227px;
box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;

const Nick = styled.div`
  
`