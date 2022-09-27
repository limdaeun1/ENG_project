import styled from "styled-components";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

const SCChat= () => {

  const Authorization = localStorage.getItem("token");
  const name = localStorage.getItem("name")
  console.log(name)
  const roomId = useParams();
  const client = useRef({});
  const [messages, setMessages] = useState([{ chatMessage: "", 
  user: "",
  type:"",
image:"" }]);
  const inputRef = useRef("");
  const navigate = useNavigate();
  

  useEffect(() => {
    connect();

    return () => 
    
    disconnect();
  }, []);



  const connect = () => {
    client.current = new StompJs.Client({
      //websocket 주소만 입력 가능 * ws://, wss:// 로 시작
      // brokerURL: "ws://54.180.142.30/ws-stomp/websocket",
      brokerURL: "ws://35.174.109.220:8080/ws-stomp/websocket",
      connectHeaders: {
        Authorization: Authorization,
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscribe();
        client.current.publish({
          destination: "/pub/chat/message",
          headers: { Authorization: Authorization },
          //전송할 데이터를 입력
          body: JSON.stringify({
            type: 0,
            // message: "OOO님이 입장하셨습니다",
            roomId: roomId.id,
          }),
        });
      },
    });
    client.current.activate();
  };


  client.webSocketFactory = () => {
    // return new SockJS("http://54.180.142.30/ws-stomp");
    return new SockJS("http://35.174.109.220:8080/ws-stomp");
  };

  const subscribe = () => {
    //이곳에서 모든 구독(subScribe)가 되어야 합니다.
    client.current.subscribe(`/sub/chat/room/${roomId.id}`, function (chat) {
      var content = JSON.parse(chat.body);
      console.log(content);
      setMessages((_messages) => [
        ..._messages,
        { chatMessage: content.msg, user: content.sender, type: content.type, image:content.image },
      ]);
    });
  };

  const submit = () => {
    client.current.publish({
      destination: "/pub/chat/message",
      headers: { Authorization: Authorization },
      //전송할 데이터를 입력
      body: JSON.stringify({
        type: 2,
        message: inputRef.current.value,
        roomId: roomId.id,
      }),
    });
  };

  client.current.onStompError = function (frame) {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };

  const disconnect = () => {
    client.current.publish({
      destination: "/pub/chat/message",
      headers: { Authorization: Authorization },
      //전송할 데이터를 입력
      body: JSON.stringify({
        type: 1,
        message: "",
        roomId: roomId.id,
      }),
    });
    client.current.unsubscribe();
    client.current.deactivate();

    navigate("/list");
  };

  const handleKeyPress = e => {
    if(e.key === 'Enter') {
      submit();
    }
  }

    return (
    <>
    <CamChatBox>
    <ChatBox>
        { messages.map((c, i) => {
          return (
            c.type === 2 ?
            (c.user == name ?
            <Chat2 key={i}>
              {/* <Who>{c.user}</Who> */}
              <What>{c.chatMessage}</What>
            </Chat2>:
            <Chat key={i}>
              <img width={30} src={c.image}/>
              <Who>{c.user}</Who>
              <What>{c.chatMessage}</What>
            </Chat>)
            :
            <Chat key={i}>
            <p>{c.chatMessage}</p>
          </Chat>
          );
        })}
      </ChatBox>
      <SendBox>
        <InputBox
          ref={inputRef}
          onKeyPress={handleKeyPress}
        ></InputBox>
        <SendBut
          onClick={() => {submit()}}>
          전송
        </SendBut>
      </SendBox>
      </CamChatBox>

    </>
    ); 
  };

  export default SCChat;

  const CamChatBox=styled.div`
  border: solid 1px green;
  height: 300px;
  width: 420px;
  margin-top: 30px;
  display: block;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  `;

const ChatBox=styled.div`
border: solid 1px green;
height: 220px;
width: 370px;
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
height: 30px;
width: 370px;
margin-left: 10px;
margin-top: 10px;
`;

const Chat2=styled.div`
display: flex;
float: right;
clear: both;
border: none;
height: 30px;
margin-left: 10px;
margin-top: 10px;
`;

const Who=styled.div`
border: none;
width: 50px;
text-align : center;
font-weight: bold;
font-size: small;
align-items: center;
justify-content: center;
line-height: 30px;
border-radius: 20px;
background: #8ce99a;
`;

const What=styled.div`
border: solid 1px gray;
width: fit-content;
margin-left: 5px;
line-height: 25px;
border-radius: 20px;
/* 내부 스크롤 */
/* overflow: scroll;
overflow-x: hidden; */
background: white;
font-size: small;
`;


const SendBox=styled.div`
border: none;
margin-top: 20px;
height: 30px;
width: 370px;
display: flex;
border-radius: 20px;
align-items: center;
 justify-content: center;
 margin-left: 25px;
`;

const InputBox=styled.input`
border: solid 1px green ;
width: 290px;
height: 30px;
border-radius: 20px;
`;

const SendBut=styled.div`
width: 50px;
border: none;
background : #69DB7C;
height: 30px;
border-radius: 20px;
margin-left: 15px;
font-size: small;
align-items: center;
 justify-content: center;
 text-align : center;
line-height: 27px;
&:hover {
    background-color: #89f6ab;
  }
`;