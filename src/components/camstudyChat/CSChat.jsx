import styled from "styled-components";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

const CSChat = () => {
  const Authorization = localStorage.getItem("token");
  const name = localStorage.getItem("name")
  // console.log(name)
  const roomId = useParams();
  const client = useRef({});
  const [chat, setChat] = useState({content:""})

  const [messages, setMessages] = useState([{ 
  chatMessage: "", 
  user: "",
  type:"",                                                      //백과 협의한 메세지 type(0:입장, 1:퇴장, 2:채팅)
  image:"" }]);
  const inputRef = useRef("");
  const navigate = useNavigate();

  const chattingRef = useRef(null);
  const scrollToElement = () => chattingRef.current.scrollIntoView({behavior:"smooth"});

  
  
  useEffect(() => {
    connect();
    
    return () => 
         disconnect();
  }, []);

  // useEffect(() => {
  //   window.addEventListener("beforeunload", (event) => {
  //     event.preventDefault();
  //     event.returnValue = "";
  //   });
    
  //   return () => 
  //  disconnect();
  // }, []);




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
        //구독요청
        subscribe();
        //입장 메시징(type0)
        client.current.publish({
          destination: "/pub/chat/message",
          headers: { Authorization: Authorization },
          //전송할 데이터를 입력
          body: JSON.stringify({
            type: 0,
            roomId: roomId.id,
          }),
        });
      },
    });
    client.current.activate();
  };

  //sockjs 미지원 브라우저를 위한 websocketfactory연결
  client.webSocketFactory = () => {
    // return new SockJS("http://54.180.142.30/ws-stomp");
    return new SockJS("http://35.174.109.220:8080/ws-stomp");
  };

//구독
  const subscribe = () => {
    client.current.subscribe(`/sub/chat/room/${roomId.id}`, function (chat) {
      var content = JSON.parse(chat.body);
      // console.log(content);
      setMessages((_messages) => [
        ..._messages,
        { chatMessage: content.msg, user: content.sender, type: content.type,image:content.image },
      ]);
      setTimeout(()=>scrollToElement(),50);
    });
  };



  //채팅(type2)
  const submit = () => {
    if (inputRef.current.value == ""){
        alert("메세지를 입력하세요")
    } else {
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
    setChat({content:""});
    // setTimeout(()=>scrollToElement(),200);
   
    };
    
    
  };

  client.current.onStompError = function (frame) {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };

  //연결 중단
  const disconnect = () => {

//퇴장메시징(type1)
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
//구독해제
client.current.unsubscribe();
//웹소켓 비활성화
client.current.deactivate();

navigate("/list");

  };

  const handleKeyPress = e => {
    if(e.key === 'Enter') {
      submit();
    }
  }



  const changeHandler = (event) => {
    event.preventDefault();
    const{name , value} = event.target
    setChat({[name]:value})
    ;
  }
  // console.log(chat) 

  return (
    <>
    <button onClick={()=>{navigate("/")}}>홈으로</button>
  <div>
          <ChatBox id="chatBox">
           { messages.map((c, i) => {
          return (
             c.type === 2 ?
            (c.user == name ?
            <Chat2 key={i}> 
              <What>{c.chatMessage}</What>
             <div ref={chattingRef}/>
            </Chat2>:
            <Chat key={i}>
              <img width={50} src={c.image}/>
              <Who>{c.user}</Who>
              <What>{c.chatMessage}</What>
              <div ref={chattingRef}/>
            </Chat>)
            :
            <Chat key={i}>
            <p>{c.chatMessage}</p>
            <div ref={chattingRef}/>
          </Chat>
          );
        })}
        
      </ChatBox>
      
  </div>

      

      <SendBox>
        <InputBox
        name="content"
        value={chat.content}
        ref={inputRef}
        onKeyPress={handleKeyPress}
        onChange = {changeHandler}
        ></InputBox>
        <SendBut
          onClick={() => {submit()}}>
          전송
        </SendBut>
      </SendBox>
    </>
  );
};

export default CSChat;

const ChatBox = styled.div`
  /* border: solid 1px green;
  height: 240px;
  width: 1250px;
  display: block;
  overflow-x: hidden;
  display: block;
  border-radius: 20px;
  margin-top: 10px;
  margin-left: 25px;
  background: #ebfbee; */
  overflow-x: hidden;
  height: 240px;
  width: 1250px;
  border:1px solid black;
  display: block;
`;




const Chat = styled.div`
  display: flex;
  border: none;
  height: 40px;
  width: 1200px;
  margin-left: 50px;
  margin-top: 10px;
`;



const Chat2 = styled.div`
  display: flex;
  float: right;
  border: none;
  height: 40px;
  margin-left: 50px;
  margin-top: 10px;
  clear: both;
`;


const Who = styled.div`
  border: none;
  width: 100px;
  text-align: center;
  font-weight: bold;
  font-size: small;
  align-items: center;
  justify-content: center;
  line-height: 35px;
  border-radius: 20px;
  background: #8ce99a;
`;

const What = styled.div`
  border: solid 1px gray;
  width: fit-content;
  margin-left: 20px;
  padding:0px 10px 0px 10px;
  line-height: 35px;
  border-radius: 20px;
  /* //내부 스크롤 */
  /* overflow: scroll;
overflow-x: hidden; */
  background: white;
  font-size: small;
`;

const SendBox = styled.div`
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

const InputBox = styled.input`
  border: solid 1px green;
  width: fit-content;
  height: 40px;
  border-radius: 20px;
`;

const SendBut = styled.div`
  width: 150px;
  border: none;
  background: #69db7c;
  height: 40px;
  border-radius: 20px;
  margin-left: 50px;
  text-align: center;
  line-height: 30px;
  font-weight: bold;
  font-size: middle;
  line-height: 40px;
  &:hover {
    background-color: #89f6ab;
  }
`;
