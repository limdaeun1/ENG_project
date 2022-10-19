import React, { Component } from 'react';
import styled from 'styled-components'
import OpenViduVideoComponent from '../scriptChat/OvVideo';
import mute from "../../img/mute.png";
import videooff from "../../img/videooff.png";
import videoon from "../../img/videoon.png";
import muteon from "../../img/muteon.png";


export default class CSCam extends Component {
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
          <>
          <Cam>
            <OpenViduVideoComponent streamManager={this.props.streamManager}/>
            <Nick>
              <p>{this.getNicknameTag()}</p>
              <Iconbox>
                {this.state.micOn ?
                <Mute src={mute} onClick={()=>this.subscribeToAudio()}></Mute> : <Mute2 src={muteon} onClick={()=>this.subscribeToAudio()}></Mute2>}
                {this.state.videoOn ?
                <Videooff  src={videooff} onClick={()=>this.subscribeToVideo()}></Videooff> : <Videooff  src={videoon} onClick={()=>this.subscribeToVideo()}></Videooff> }
              </Iconbox>
            </Nick>
          </Cam>
          
          </>
        ) : null}
    </>
  )
}
}

// const Cam = styled.div`
// border: solid 1px green;
// background: #D9D9D9;
// border-radius: 20px;
// width: 200px;
// height: auto;
// box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
// margin: 7px auto 7px auto;
// `;
const Cam = styled.div`
background: #ebfbee;
border-radius: 20px;
min-width: 200px;
height: 24vh;
min-height: 170px;
margin: 7px auto 7px auto;
`;

const Nick = styled.div`
background-color: #dcf2d2;
border-radius: 20px;
justify-content: center;
p{
  text-align: center;
  font-size: 14px;
  font-weight: 600;
}
margin-top: -12px;
`

const Mute = styled.img`
width: 22px;
height: 13px;
margin-right: 7px;
cursor:pointer;
`
const Mute2 = styled.img`
width: 19px;
height: 14px;
margin-right: 9px;
margin-left:1px;
cursor:pointer;
`

const Videooff = styled.img`
width: 13px;
height: 13px;
cursor:pointer;
`
const Iconbox = styled.div`
  margin-top: -30px;
  margin-left: 10px;
`