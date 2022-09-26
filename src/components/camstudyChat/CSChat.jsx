import styled from "styled-components";

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

const CSChat= () => {
  
const navigate = useNavigate()
// const client = useRef()
const roomId = useParams();

const [message, setMessage] = useState("")
const [chatMessages, setChatMessages] = useState([]);

  // useEffect(() => {
  //   connect();

  //   return () => disconnect();
  // }, []);


const client = new StompJs.Client({
  brokerURL: 'ws://54.180.142.30/ws-stomp/websocket',
  connectHeaders: {
    login: 'user',
    passcode: 'password',
  },
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

// Fallback code
if (typeof WebSocket !== 'function') {
  // For SockJS you need to set a factory that creates a new SockJS instance
  // to be used for each (re)connect
  client.webSocketFactory = function () {
    // Note that the URL is different from the WebSocket URL
    return new SockJS('http://54.180.142.30/ws-stomp');
  };
}

client.onConnect = () => {
//구독(특정 방 입장, 수신)
  client.subscribe(`sub/chat/room/${roomId.id}`,function (message) {
    // called when the client receives a STOMP message from the server

    console.log(message)
    // if (message.body) {
    //   alert('got message with body ' + message.body);
    // } else {
    //   alert('got empty message');
    // }
  }
  )
  // console.log(roomId)
  // Do something, all subscribes must be done is this callback
  // This is needed because this will be executed after a (re)connect
};



client.onStompError = function (frame) {
  // Will be invoked in case of error encountered at Broker
  // Bad login/passcode typically will cause an error
  // Complaint brokers will set `message` header with a brief message. Body may contain details.
  // Compliant brokers will terminate the connection after any error
  console.log('Broker reported error: ' + frame.headers['message']);
  console.log('Additional details: ' + frame.body);
};

client.activate();

const disconnect = () => {
  client.unsubscribe();
  client.deactivate();
  navigate("/list")
}

const submit = () => {
  //메시지 송신
  client.publish({ 
    destination: `/pub/chat/message`, body: message,
  // headers: { priority: '9' },
});
}


    return (
      <>
      <button 
      onClick={()=>{disconnect()}}
      >중단하기</button>
      <ChatBox>
                <Chat>
                    <Who>이름</Who>
                    <What>내용</What>
                         </Chat>

                         
            </ChatBox>
            <SendBox>
                <InputBox 
                onChange={(e)=>setMessage(e.target.value)}
                ></InputBox>
                <SendBut 
                onClick={() => submit()}
                >전송</SendBut>
            </SendBox>
      </>
       );
    };
    
    export default CSChat;

const ChatBox=styled.div`
border: solid 1px green;
height: 240px;
width: 1250px;
display: block;
overflow: scroll;
overflow-x: hidden;
display: block;
border-radius: 20px;
margin-top: 10px;
margin-left: 25px;
background: #ebfbee;
`;

const Chat=styled.div`
display: flex;
border: none;
height: 40px;
width: 1200px;
margin-left: 50px;
margin-top: 10px;
`;

const Who=styled.div`
border: none;
width: 100px;
text-align : center;
font-weight: bold;
font-size: small;
align-items: center;
justify-content: center;
line-height: 35px;
border-radius: 20px;
background: #8ce99a;
`;

const What=styled.div`
border: solid 1px gray;
width: 1100px;
margin-left: 20px;
line-height: 35px;
border-radius: 20px;
/* //내부 스크롤 */
/* overflow: scroll;
overflow-x: hidden; */
background: white;
font-size: small;
`;


const SendBox=styled.div`
border: none;
margin-top: 20px;
height: 30px;
width: 1200px;
display: flex;
border-radius: 20px;
align-items: center;
 justify-content: center;
 margin-left: 50px;
`;

const InputBox=styled.input`
border: solid 1px green ;
width: 1200px;
height: 40px;
border-radius: 20px;
`;

const SendBut=styled.div`
width: 150px;
border: none;
background : #69DB7C;
height: 40px;
border-radius: 20px;
margin-left: 50px;
text-align : center;
line-height: 30px;
font-weight: bold;
font-size: middle;
line-height: 40px;
&:hover {
    background-color: #89f6ab;
  }
`;