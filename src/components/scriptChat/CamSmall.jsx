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
margin: 5px;
/* 여기 카메라 부분 나중에 4명 들어오면 수정하기 */
`;

const Nick = styled.div`
background-color: #dcf2d2;
border-radius: 20px;
p{
  text-align: center;
  font-size: 14px;
  font-weight: 600;
}
`

const Mute = styled.img`
width: 23px;
height: 20px;
margin-right: 10px;
`

const Videooff = styled.img`
width: 18px;
height: 20px;
`
const Iconbox = styled.div`
  margin-top: -30px;
  margin-left: 120px;
`