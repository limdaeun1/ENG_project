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
  const [chat, setChat] = useState({content:""})
  const [messages, setMessages] = useState([{ chatMessage: "", 
  user: "",
  type:"",
image:"" }]);
 const [notice, setNoitce] = useState(false)
  const inputRef = useRef("");
  const noticeRef = useRef("");
  const navigate = useNavigate();
  
  const chattingRef = useRef(null);
  const scrollToElement = () => chattingRef.current?.scrollIntoView({behavior:"smooth"});


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
      setTimeout(()=>scrollToElement(),50);
    });
  };

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
    setChat({content:""})
  }
  };

  client.current.onStompError = function (frame) {
   
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };

  //공지 등록
  const onSubmitNotice = () =>{
    client.current.publish({
      destination: "/pub/chat/message",
      headers: { Authorization: Authorization },
      //전송할 데이터를 입력
      body: JSON.stringify({
        type: 2,
        message: "!공지등록 "+noticeRef.current.value,
        roomId: roomId.id,
      }),
    })
  } 
  //연결끊기(소켓종료, 구독종료)
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


  //엔터키 제어
  const handleKeyPress = e => {
    if (e.key === 'Enter' && e.shiftKey) { // [shift] + [Enter] 치면 리턴
      return;}
   else if(e.key === 'Enter') {             //[Enter]치면 전송
      submit();
    }
  }


  //채팅창 전송 후 초기화
  const changeHandler = (event) => {
    event.preventDefault();
    const{name , value} = event.target
    setChat({[name]:value})
    ;
  }

//공지등록상태 열고닫기
  const changeNotice = () => {
    setNoitce(!notice);
    setChat({content:""})
  }


  // console.log(inputRef.current.value)
    return (
    <>
    <CamChatBox id="chatBox">
    <ChatBox>
        { messages.map((c, i) => {
          return (
            c.type === 2 ?
            (c.user == name ?

            <MyChat key={i}>
              <MyName>{c.user}</MyName>
              <What>{c.chatMessage}</What>
              <div ref={chattingRef}/>
            </MyChat>:

            <OtherChat key={i}>
              <ImgBox src={c.image}/>
              <div style={{alignItems:"center"}}>
              <OtherName>{c.user}</OtherName>
              <What>{c.chatMessage}</What>
              </div>
              <div ref={chattingRef}/>
            </OtherChat>)
            :(c.type === 3? 
              <OtherChat key={i}>
                <div>
                   <p>{c.chatMessage}</p>
              <div ref={chattingRef}/>
                </div>
             
            </OtherChat>:
            <OtherChat key={i}>
              <p>{c.chatMessage}</p>
              <div ref={chattingRef}/>
            </OtherChat>)


          );
        })}
      </ChatBox>

      {/* 채팅 입력 */}
      {
        notice === false ?

        <SendBox>
        <InputBox 
        name="content" 
        value={chat.content} 
        ref={inputRef} 
        onKeyUp={handleKeyPress}             //keydown or keypress일때하면 안됨. 올라갈때 실행되야지 엔터가 자동으로 안먹힘. 그래서 keyup사용
        onChange = {changeHandler}/>
        <SendBut onClick={() => {submit()}}>전송</SendBut>
          <SendBut onClick={()=>{changeNotice()}}>공지</SendBut> 
        </SendBox>

        :

          <SendBox>
            <InputBox ref={noticeRef} onKeyUp={handleKeyPress} />
            <SendBut onClick={()=>{onSubmitNotice();changeNotice()}}>등록</SendBut>
            <SendBut onClick={()=>{changeNotice()}}>취소</SendBut>
          </SendBox>
        
      }
       
      </CamChatBox>

    </>
    ); 
  };

  export default SCChat;

  const CamChatBox=styled.div`
  border: solid 1px green;
  height: 300px;
  min-width: 360px;
  width: 89%;
  margin: 20px auto 15px auto;
  display: block;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  `;

const ChatBox=styled.div`
border: solid 1px green;
min-height: 190px;
/* min-width: 100px; */
width: 94%;
display: block;
overflow: scroll;
overflow-x: hidden;
/* overflow-y: hidden; */
display: block;
border-radius: 20px;
margin: 10px auto 0 auto;
background: #ebfbee;
`;

const OtherChat=styled.div`
display: flex;
border: none;
width: 370px;
margin-left: 10px;
margin-top: 10px;
`;

const MyChat=styled.div`
float: right;
clear: both;
border: none;
height: auto;
margin-left: 10px;
margin-top: 10px;
`;
const ImgBox =  styled.img`
  border-radius: 10px;
  width: 50px;
  height: 50px;
  object-fit: cover;
`
const MyName=styled.div`
margin-left:auto;
border: none;
width: 50px;
text-align : center;
font-weight: bold;
font-size: 13px;
align-items: center;
justify-content: center;
line-height: 30px;
/* border-radius: 20px;
background: #8ce99a; */
`;

const OtherName=styled.div`
border: none;
width: 50px;
text-align : center;
font-weight: bold;
font-size: 13px;
align-items: center;
justify-content: center;
line-height: 30px;
/* border-radius: 20px;
background: #8ce99a; */
`;

const What=styled.div`
border: solid 1px gray;
max-width: 200px;
word-break: keep-all;
margin-left: 5px;
line-height: 25px;
/* 내부 스크롤 */
/* overflow: scroll;
overflow-x: hidden; */
background: white;
font-size: small;
white-space: pre-wrap;
border-radius: 5px;
padding: 0px 10px 0px 10px;
`;


const SendBox=styled.div`
border: none;
margin-top: 20px;
height: 30px;
width: 85%;
min-width: 250px;
display: flex;
border-radius: 20px;
align-items: center;
 justify-content: center;
 margin-left: 10%;
`;

const InputBox=styled.textarea`
border: solid 1px green ;
width: 100%;
height: 30px;
border: 1px solid #51cf66;
border-radius: 5px;
`;

const SendBut=styled.div`
width: fit-content;
min-width:30px;
padding: 0px 5px 0px 5px;
border: none;
background : #69DB7C;
height: 30px;
border-radius: 5px;
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