import React, { Component } from 'react';
import styled from 'styled-components'
import OpenViduVideoComponent from './OvVideo';
import mute from "../../img/mute.png";
import muteon from "../../img/muteon.png";
import videooff from "../../img/videooff.png";
import videoon from "../../img/videoon.png";

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

publishAudio(e) {
  if (this.props.streamManager.stream.audioActive == true) {
     this.props.streamManager.publishAudio(false);
       this.setState({
        micOn : false,
       })
       console.log("음소거함") }
   else {
       this.props.streamManager.publishAudio(true);
       this.setState({
        micOn : true,
       })
       console.log("켜기")
    }
}

publishVideo() {
  if(this.props.streamManager.stream.videoActive == true) {
  this.props.streamManager.publishVideo(false);
  this.setState({
    videoOn : false,
   })
    console.log("카메라끄기") }
  else {
      this.props.streamManager.publishVideo(true);
      this.setState({
        videoOn : true,
       })
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
              {this.state.micOn ? 
              <Mute src={mute} onClick={()=>this.publishAudio()}></Mute> : <Mute2 src={muteon} onClick={()=>this.publishAudio()}></Mute2>}
              {this.state.videoOn ?
              <Videooff  src={videooff} onClick={()=>this.publishVideo()}></Videooff> :  <Videooff2  src={videoon} onClick={()=>this.publishVideo()}></Videooff2>}
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
cursor: pointer;
`
const Mute2 = styled.img`
width: 19px;
height: 15px;
margin-right: 10px;
cursor: pointer;
`

const Videooff = styled.img`
width: 14px;
height: 14px;
cursor: pointer;
`
const Videooff2 = styled.img`
width: 15px;
height: 15px;
cursor: pointer;
`

const Iconbox = styled.div`
height: 20px;
margin-right: 10px;
`