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
      setTimeout(()=>scrollToElement(),30);
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
    };
    
    
  };

  client.current.onStompError = function (frame) {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };

    //공지 등록
    const onSubmitNotice = () =>{
      if (noticeRef.current.value == ""){
        alert("공지사항을 입력하세요")
    } else{
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

    } 
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

  //엔터키 제어
  const handleKeyPress = e => {
    if (e.key === 'Enter' && e.shiftKey) { // [shift] + [Enter] 치면 리턴
      return;}
   else if(e.key === 'Enter') {             //[Enter]치면 전송
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


//공지등록상태 열고닫기
const changeNotice = () => {
  setNoitce(!notice);
  setChat({content:""})
}


  return (
    <div style={{display:"flex"}}>
    <div>
      <div>
          <ChatBox id="chatBox">
         { messages.map((c, i) => {
          return (
            c.type === 2 ?
            (c.user == name ?

            <MyChat key={i}>
              <MyName>{c.user}</MyName>
              <MyMsg>{c.chatMessage}</MyMsg>
              <div ref={chattingRef}/>
            </MyChat>:

            <OtherChat key={i}>
              <ImgBox src={c.image}/>
              <div style={{alignItems:"center"}}>
              <OtherName>{c.user}</OtherName>
              <OtherMsg>{c.chatMessage}</OtherMsg>
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
      
  </div>

  {
        notice === false ?

        <SendBox>
        <p>채팅모드</p>
        <InputBox 
        name="content" 
        value={chat.content} 
        ref={inputRef} 
        onKeyUp={handleKeyPress}             //keydown or keypress일때하면 안됨. 올라갈때 실행되야지 엔터가 자동으로 안먹힘. 그래서 keyup사용
        onChange = {changeHandler}/>
        <SendBut onClick={() => {submit()}}>전송</SendBut>
          <SendBut onClick={()=>{changeNotice()}}>공지 모드</SendBut> 
        </SendBox>

        :

          <SendBox>
            <p>공지모드</p>
            <NoticeInputBox ref={noticeRef} onKeyUp={handleKeyPress} />
            <NoticeBut onClick={()=>{onSubmitNotice();changeNotice()}}>등록</NoticeBut>
            <NoticeBut onClick={()=>{changeNotice()}}>채팅 모드</NoticeBut>
          </SendBox>
        
      }
    </div>

    <UserListBox>
      참가자 목록 관리
    </UserListBox>
  
    </div>
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
  padding: 10px;
  overflow-x: hidden;
  height: 240px;
  /* max-width: 600px; */
   max-width: 600px;
  /* border:1px solid black; */
  display: block;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    /* background: rgba(0, 0, 0, 0.3); */
    background: #d3f9d8;
    border-radius: 6px;
  }
`;




const OtherChat = styled.div`
  display: flex;
  border: none;
  width: 1200px;
  /* margin-left: 50px; */
  /* margin-top: 10px; */
`;



const MyChat = styled.div`
  float: right;
  clear: both;
  border: none;
  height: auto;
  margin-left: 50px;
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

const MyMsg = styled.div`
  border: none;
  width: fit-content;
  margin-left: 20px;
  padding:0px 10px 0px 10px;
  line-height: 35px;
  background: white;
  font-size: small;
  white-space: pre-wrap;
border-radius: 10px 10px 0px 10px;
padding: 0px 10px 0px 10px;
color:white;
  background-color: #40c057;
`;

const OtherMsg = styled.div`
  border: none;
  width: fit-content;
  /* margin-left: 20px; */
  padding:0px 10px 0px 10px;
  line-height: 35px;
  background: white;
  font-size: small;
  white-space: pre-wrap;
border-radius: 10px 10px 10px 0px;
padding: 0px 10px 0px 10px;
color:white;
  background-color: #ced4da;
`;

const SendBox = styled.div`
  /* border: none; */
  border: 1px solid blue;
  margin-top: 20px;
  height: 30px;
  max-width: 600px;;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-left: 50px; */
`;

const InputBox=styled.textarea`
border: solid 1px green ;
width: 100%;
height: 30px;
border: 1px solid #51cf66;
border-radius: 20px;
`;

const NoticeInputBox=styled.textarea`
border: solid 1px green ;
width: 850px;
height: 30px;
border: 1px solid #1c7ed6;
border-radius: 5px;
`;

const SendBut = styled.div`
  width: fit-content;
  border: none;
  min-width:60px;
  background: #69db7c;
  height: 30px;
  border-radius: 5px;
  margin-left: 15px;
  text-align: center;
  line-height: 30px;
  font-weight: bold;
  font-size: small;
  line-height: 27px;
  /* &:hover {
    background-color: #1c7ed6;
  } */
`;

const NoticeBut = styled.div`
  width: fit-content;
  border: none;
  min-width:60px;
  background: #1c7ed6;
  height: 30px;
  border-radius: 5px;
  margin-left: 15px;
  text-align: center;
  line-height: 30px;
  font-weight: bold;
  font-size: small;
  line-height: 27px;
  /* &:hover {
    background-color: #89f6ab;
  } */
`;

const UserListBox = styled.div`
  width: 200px;
  border: 1px solid black;
  margin-left: 10px;
`
