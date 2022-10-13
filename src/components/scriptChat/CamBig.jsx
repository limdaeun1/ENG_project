import React, { Component } from 'react';
import styled from 'styled-components'
import OpenViduVideoComponent from './OvVideo';
import mute from "../../img/mute.png";
import videooff from "../../img/videooff.png";

export default class CamBig extends Component {

  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
}

publishAudio(e) {
  if (this.props.streamManager.stream.audioActive == true) {
     this.props.streamManager.publishAudio(false);
       console.log("음소거함") }
   else {
       this.props.streamManager.publishAudio(true);
       console.log("켜기")
    }
}

publishVideo() {
  if(this.props.streamManager.stream.videoActive == true) {
  this.props.streamManager.publishVideo(false);
       console.log("카메라끄기") }
  else {
      this.props.streamManager.publishVideo(true);
      console.log("카메라켜기")
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
            <Iconbox>
              <Mute src={mute} onClick={()=>this.publishAudio()}></Mute>
              <Videooff  src={videooff} onClick={()=>this.publishVideo()}></Videooff>
            </Iconbox>
              <p>{this.getNicknameTag()}</p>
            </Nick>
          </Cam>
          
          </>
        ) : null}
    </>
  )
}
}


const Cam=styled.div`
border: solid 1px green;
background: #D9D9D9;
border-radius: 20px;
margin:0 auto 0 auto;
width: 430px;
height: 322px;
box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
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
width: 20px;
height: 15px;
margin-right: 10px;
`

const Videooff = styled.img`
width: 15px;
height: 15px;
`
const Iconbox = styled.div`
height: 20px;
margin-right: 10px;
`