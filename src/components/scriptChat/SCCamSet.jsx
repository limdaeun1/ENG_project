import React, { Component } from 'react';
import styled from "styled-components";
import CamBig from "./CamBig";
import CamSmall from "./CamSmall";
import axios from "axios";
import { OpenVidu } from 'openvidu-browser';

const OPENVIDU_SERVER_URL = 'https://ddaeum.shop:4443';
const OPENVIDU_SERVER_SECRET = 'eng';
const name = localStorage.getItem("name")

    
class SCCamSet extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
        mySessionId: `Session${this.props.id}`,
        myUserName: name,
        session: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: [],
        id:this.props.id,
    };
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    
}
componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload); //beforeunload => 사용자가 페이지를 이탈하려고 할 때 호출하는 함수
    this.joinSession()
}

componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload());
}

onbeforeunload(event) {
    this.leaveSession();
}

handleChangeSessionId(e) {     
    this.setState({
        mySessionId: e.target.value,
    });
}

handleChangeUserName(e) {
    this.setState({
        myUserName: e.target.value,
    });
}

handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
        this.setState({
            mainStreamManager: stream
        });
    }
}

deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
        subscribers.splice(index, 1);
        this.setState({
            subscribers: subscribers,
        });
    }
}



joinSession() {

    this.OV = new OpenVidu();

    this.setState(
        {
            session: this.OV.initSession(),
        },
        () => {
            var mySession = this.state.session;
            
            mySession.on('streamCreated', (event) => {
   
                var subscriber = mySession.subscribe(event.stream, undefined);
                var subscribers = this.state.subscribers;
                subscribers.push(subscriber);

                this.setState({
                    subscribers: subscribers,
                });
            });
           
            // 구독자 삭제
            mySession.on('streamDestroyed', (event) => {
                this.deleteSubscriber(event.stream.streamManager);
            });
            mySession.on('exception', (exception) => {
                console.warn(exception);
            });


            //토큰 가져오는 과정에서 session 과 token 이 생성되며 return  된다.
            //그 후, 가져온 세션과 토큰을 이용해 WebScoket과 통신을 시도하며, sdp 정보를 보내준다.
            this.getToken().then((token) => {
                // 첫 번째 param은 OV Server 에서 오는 토큰 값이며, 두 번째 param은 모든 유저가 "streamCreated"를 통해
                // 받는 정보들이다. 그리고 이것은 유저 닉네임으로 DOM 에 추가된다.
                mySession
                    .connect(
                        token,
                        { clientData: this.state.myUserName },
                    )
                    .then(async () => {
                        var devices = await this.OV.getDevices();
                        var videoDevices = devices.filter(device => device.kind === 'videoinput');

                      
                        let publisher = this.OV.initPublisher(undefined, {
                            audioSource: undefined, 
                            videoSource: videoDevices[0].deviceId, 
                            publishAudio: true, 
                            publishVideo: true, 
                            resolution: '640x480', 
                            frameRate: 30, 
                            insertMode: 'APPEND', 
                            mirror: false,
                        });

                       
                        //본인의 정보를 퍼블리싱 한다
                        mySession.publish(publisher);
                        // 첫번째 메인카메라를 본인의 웹캠으로 설정시키는것
                        this.setState({
                            currentVideoDevice: videoDevices[0],
                            mainStreamManager: publisher,
                            publisher: publisher,
                        });
                    })
                    .catch((error) => {
                        console.log('There was an error connecting to the session:', error.code, error.message);
                    });
            });
        },
    );
}

leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
        mySession.disconnect();
    }
    this.OV = null;
    this.setState({
        session: undefined,
        subscribers: [],
        mySessionId: 'SessionA',
        myUserName: 'Participant' + Math.floor(Math.random() * 100),
        mainStreamManager: undefined,
        publisher: undefined
    });
}

async switchCamera() {
    try{
        const devices = await this.OV.getDevices()
        var videoDevices = devices.filter(device => device.kind === 'videoinput');

        if(videoDevices && videoDevices.length > 1) {

            var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

            if (newVideoDevice.length > 0){
     
                var newPublisher = this.OV.initPublisher(undefined, {
                    videoSource: newVideoDevice[0].deviceId,
                    publishAudio: true,
                    publishVideo: true,
                    mirror: true
                });

      
                await this.state.session.unpublish(this.state.mainStreamManager)

                await this.state.session.publish(newPublisher)
                this.setState({
                    currentVideoDevice: newVideoDevice,
                    mainStreamManager: newPublisher,
                    publisher: newPublisher,
                });
            }
        }
      } catch (e) {
        console.error(e);
      }
}

render() {
  const mySessionId = this.state.mySessionId;
  const myUserName = this.state.myUserName;


    return (
      <>
          <CamBox>
          {this.state.publisher !== undefined ? (
            <>
            <CamBig streamManager={this.state.publisher}/>
            </>
          ) : null}
            <CamSmallBox>
          {this.state.subscribers.map((sub, i) => (
            <div key={i} >
              <CamSmall streamManager={sub}/>
            </div> 
          ))}
            </CamSmallBox>
          </CamBox>
      </>
  );
};

getToken() {
  return this.createSession(this.state.mySessionId).then((sessionId) => this.createToken(sessionId));
}

createSession(sessionId) {
  return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
          .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
              headers: {
                  Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                  'Content-Type': 'application/json',
              },
          })
          .then((response) => {
              console.log('CREATE SESION', response);
              resolve(response.data.id);
          })
          .catch((response) => {
              var error = Object.assign({}, response);
              if (error?.response?.status === 409) {
                  resolve(sessionId);
              } else {
                  console.log(error);
                  console.warn(
                      'No connection to OpenVidu Server. This may be a certificate error at ' +
                      OPENVIDU_SERVER_URL,
                  );
                  if (
                      window.confirm(
                          'No connection to OpenVidu Server. This may be a certificate error at "' +
                          OPENVIDU_SERVER_URL +
                          '"\n\nClick OK to navigate and accept it. ' +
                          'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                          OPENVIDU_SERVER_URL +
                          '"',
                      )
                  ) {
                      window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                  }
              }
          });
  });
}


createToken(sessionId) {
  return new Promise((resolve, reject) => {
      var data = {};
      axios
          .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
              headers: {
                  Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                  'Content-Type': 'application/json',
              },
          })
          .then((response) => {
              console.log('TOKEN', response);
              resolve(response.data.token);
          })
          .catch((error) => reject(error));
  });
}
}

export default SCCamSet;

const CamBox=styled.div`
border: none;
height: 100%;
width: 70%;
min-width:800px;
margin:auto;
`;

const CamSmallBox=styled.div`
display:flex;
border: none;
border-radius: 20px;
height: 270px;
width:96%;
margin-top: 40px;
margin-left:2%;
margin-right: 2%;
`;


