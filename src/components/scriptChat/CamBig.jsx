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




render() {   
  return (
    <>
        {this.props.streamManager !== undefined ? (
          <>
          <Cam>
            <OpenViduVideoComponent streamManager={this.props.streamManager}/>
            <Nick>
            <Iconbox>
              <Mute src={mute} onClick={()=>console.log("클릭")}></Mute>
              <Videooff  src={videooff} onClick={()=>console.log("클릭")}></Videooff>
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