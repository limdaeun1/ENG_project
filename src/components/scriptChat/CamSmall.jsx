import React, { Component } from 'react';
import styled from 'styled-components'
import OpenViduVideoComponent2 from './OvVideo2';
import mute from "../../img/mute.png";
import videooff from "../../img/videooff.png";


export default class CamBig extends Component {

  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
}

subscribeToAudio() {
  if(this.props.streamManager.stream.audioActive == true) {
    this.props.streamManager.subscribeToAudio(false);
        console.log("음소거함") }
  else {
    this.props.streamManager.subscribeToAudio(true);
      console.log("마이크켬")
  }
}

subscribeToVideo() {
  if(this.props.streamManager.stream.videoActive == true) {
    this.props.streamManager.subscribeToVideo(false);
        console.log("카메라끔") }
  else {
    this.props.streamManager.subscribeToVideo(true);
      console.log("카메라켬")
  }
}

render() {   
  return (
    <>
        {this.props.streamManager !== undefined ? (
          <Camsmall>
            <OpenViduVideoComponent2 streamManager={this.props.streamManager}/>
           
            <Nick>
            <Iconbox>
              <Mute src={mute} onClick={()=>this.subscribeToAudio()}></Mute>
              <Videooff  src={videooff} onClick={()=>this.subscribeToVideo()}></Videooff>
            </Iconbox>
              <p>{this.getNicknameTag()}</p></Nick>
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
display: flex;
align-items: center;
justify-content: center;
height: 20px;
`

const Mute = styled.img`
width: 15px;
height: 15px;
margin-right: 8px;
`

const Videooff = styled.img`
width: 12px;
height: 14px;
`
const Iconbox = styled.div`
height: 20px;
margin-right: 10px;
`

