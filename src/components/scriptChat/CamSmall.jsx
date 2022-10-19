import React, { Component } from 'react';
import styled from 'styled-components'
import OpenViduVideoComponent2 from './OvVideo2';
import mute from "../../img/mute.png";
import videooff from "../../img/videooff.png";
import videoon from "../../img/videoon.png";
import muteon from "../../img/muteon.png";

export default class CamBig extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      micOn : true,
      videoOn : true,
    };
  }

  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
}

subscribeToAudio() {
  if(this.props.streamManager.stream.audioActive == true) {
    this.props.streamManager.subscribeToAudio(false);
    this.setState({
      micOn : false,
     })
        console.log("음소거함") }
  else {
    this.props.streamManager.subscribeToAudio(true);
    this.setState({
      micOn : true,
     })
      console.log("마이크켬")
  }
}

subscribeToVideo() {
  if(this.props.streamManager.stream.videoActive == true) {
    this.props.streamManager.subscribeToVideo(false);
    this.setState({
      videoOn : false,
     })
        console.log("카메라끔") }
  else {
    this.props.streamManager.subscribeToVideo(true);
    this.setState({
      videoOn : true,
     })
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
              {this.state.micOn ?
              <Mute src={mute} onClick={()=>this.subscribeToAudio()}></Mute> : <Mute2 src={muteon} onClick={()=>this.subscribeToAudio()}></Mute2>}
              {this.state.videoOn ?
              <Videooff  src={videooff} onClick={()=>this.subscribeToVideo()}></Videooff> : <Videooff2  src={videoon} onClick={()=>this.subscribeToVideo()}></Videooff2>}
            </Iconbox>
              <p>{this.getNicknameTag()}</p></Nick>
          </Camsmall>
        ) : null}
    </>
  )
}
}


const Camsmall=styled.div`
border-radius: 20px;
width: 18vw;
min-width: 250px;
min-height: 227px;
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
const Mute2 = styled.img`
width: 15px;
height: 15px;
margin-right: 8px;
`
const Videooff = styled.img`
width: 12px;
height: 14px;
`
const Videooff2 = styled.img`
width: 12px;
height: 14px;
`
const Iconbox = styled.div`
height: 20px;
margin-right: 10px;
`

