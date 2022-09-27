import React, { Component } from 'react';
import styled from 'styled-components'
import OpenViduVideoComponent from '../scriptChat/OvVideo';
import mute from "../../img/mute.png";
import videooff from "../../img/videooff.png";


export default class CSCam extends Component {

  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
}


render() {   
  return (
    <>
        {this.props.streamManager !== undefined ? (
          <>
          <Cam>
            <OpenViduVideoComponent streamManager={this.props.streamManager}/>
            <Iconbox>
              <Mute src={mute}></Mute>
              <Videooff  src={videooff}></Videooff>
            </Iconbox>
            <Nick>
              <p>{this.getNicknameTag()}</p>
            </Nick>
          </Cam>
          
          </>
        ) : null}
    </>
  )
}
}

const Cam = styled.div`
border: solid 1px green;
background: #D9D9D9;
border-radius: 20px;
width: 299px;
box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
margin: 7px;
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
width: 30px;
height: 20px;
margin-right: 10px;
`

const Videooff = styled.img`
width: 20px;
height: 20px;
`
const Iconbox = styled.div`
  margin-top: -30px;
  margin-left: 122px;
`