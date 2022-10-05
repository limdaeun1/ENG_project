import styled from "styled-components";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import send from "../../img/send.png";
import promotion from "../../img/promotion.png";
import conversation from "../../img/conversation.png";
const CSChat = () => {
  const Authorization = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  // console.log(name)
  const roomId = useParams();
  const client = useRef({});
  const [chat, setChat] = useState({ content: "" });
  const [messages, setMessages] = useState([
    {
      chatMessage: "",
      user: "",
      type: "", //백과 협의한 메세지 type(0:입장, 1:퇴장, 2:채팅)
      image: "",
    },
  ]);
  const [notice, setNoitce] = useState(false);
  const inputRef = useRef("");
  const noticeRef = useRef("");
  const navigate = useNavigate();

  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
      setToggleState(index);
    };

  const chattingRef = useRef(null);
  const scrollToElement = () =>
    chattingRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    connect();

    return () => disconnect();
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
            message: "1",
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
        {
          chatMessage: content.msg,
          user: content.sender,
          type: content.type,
          image: content.image,
        },
      ]);
      setTimeout(() => scrollToElement(), 30);
    });
  };
  // console.log(inputRef.current.value)
  //채팅(type2)
  const submit = () => {
    if (inputRef.current.value == "") {
      alert("메세지를 입력하세요");
    }
    //  else if(inputRef.current.value === "\n"){
    //   return setChat({ content: "" });
    // }
    else {
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
      setChat({ content: "" });
    }
  };

  client.current.onStompError = function (frame) {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };

  //공지 등록
  const onSubmitNotice = () => {
    if (noticeRef.current.value == "") {
      alert("공지사항을 입력하세요");
    } else {
      client.current.publish({
        destination: "/pub/chat/message",
        headers: { Authorization: Authorization },
        //전송할 데이터를 입력
        body: JSON.stringify({
          type: 2,
          message: "!공지등록 " + noticeRef.current.value,
          roomId: roomId.id,
        }),
      });
    }
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
        message: "1",
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
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      // [shift] + [Enter] 치면 리턴
      return;
    } else if (e.key === "Enter") {
      //[Enter]치면 전송
      submit();
    }
  };

  const changeHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setChat({ [name]: value });
  };
  // console.log(chat)

  //공지등록상태 열고닫기
  const changeNotice = () => {
    setNoitce(!notice);
    setChat({ content: "" });
  };

  const filterdNotice = messages.filter(function (x) {
    return x.type == 3;
  });

  const newNotice = JSON.stringify(filterdNotice[filterdNotice.length - 1]?.chatMessage)
  console.log(newNotice)

  return (
    <Container>
      <LeftContainer>
        {/* <div style={{height:"30px",borderBottom:"1px solid black", marginBottom:"10px", padding:"10px 0px 0px 10px"}}>
          최신 공지 : 
        </div> */}
        <div>
          <ChatBox id="chatBox">
            {messages.map((c, i) => {
              return c.type === 2 ? (
                c.user == name ? (
                  <MyChat key={i}>
                    {/* <MyName>{c.user}</MyName> */}
                    <MyMsg>{c.chatMessage}</MyMsg>
                    <div ref={chattingRef} />
                  </MyChat>
                ) : (
                  <OtherChat key={i}>
                    <ImgBox src={c.image} />
                    <div>
                      <OtherName>{c.user}</OtherName>
                      <OtherMsg>{c.chatMessage}</OtherMsg>
                    </div>
                    <div ref={chattingRef} />
                  </OtherChat>
                )
              ) : c.type === 3 ? (
                <InfoBox>
                  {c.chatMessage}
                  <div ref={chattingRef} />
                </InfoBox>
              ) : (
                <EnterExitBox key={i}>
                  {c.chatMessage}
                  <div ref={chattingRef} />
                </EnterExitBox>
              );
            })}
          </ChatBox>
        </div>

        {notice === false ? (
          <SendBox>
            {/* <p>채팅모드</p> */}
            <img
              src={promotion}
              width={30}
              height={30}
              onClick={() => {
                changeNotice();
              }}
            />
            <InputBox
              placeholder="채팅을 입력하세요"
              name="content"
              value={chat.content}
              ref={inputRef}
              onKeyUp={handleKeyPress} //keydown or keypress일때하면 안됨. 올라갈때 실행되야지 엔터가 자동으로 안먹힘. 그래서 keyup사용
              onChange={changeHandler}
            />
            <img
              onClick={() => {
                submit();
              }}
              src={send}
              width={30}
              height={30}
            />
            {/* <SendBut
              onClick={() => {
                changeNotice();
              }}
            >
              공지 등록
            </SendBut> */}
          </SendBox>
        ) : (
          <SendBox>
            <img
              src={conversation}
              width={30}
              height={30}
              onClick={() => {
                changeNotice();
              }}
            />
            <NoticeInputBox ref={noticeRef} onKeyUp={handleKeyPress} placeholder="공지사항을 입력하세요"/>

            <img
              onClick={() => {
                onSubmitNotice();
                changeNotice();
              }}
              src={send}
              width={30}
              height={30}
            />
          </SendBox>
        )}
      </LeftContainer>
      <ScriptContainer>
      <TabContainer>
            {toggleState === 1
            ? <ActiveTabBox onClick={() => toggleTab(1)}>Memo</ActiveTabBox>
            :<TabBox onClick={() => toggleTab(1)} >Memo</TabBox>}

            {toggleState === 2
            ? <ActiveTabBox onClick={() => toggleTab(2)}>UserList</ActiveTabBox>
            :<TabBox onClick={() => toggleTab(2)} >UserList</TabBox>}          
            </TabContainer>

            <div style={{flexGrow : "1"}}>

            {toggleState === 1 
            ? <UserListBox>메모</UserListBox>
            :null}
            
            {toggleState === 2 
            ?<UserListBox>참가자 목록 관리</UserListBox>
            :null}
          </div>

      </ScriptContainer>

      
    </Container>
  );
};

export default CSChat;

const Container = styled.div`
  display: flex;
`;
const LeftContainer = styled.div`
  background: linear-gradient(to right, #effaf6, #e4fcf4);
  border-radius: 5px;
  box-shadow: 10px 10px 10px #e9ecef;
  width: 60%;
  margin-top: 30px;
`;
const ChatBox = styled.div`
  overflow-x: hidden;
  height: 260px;
  width: 100%;
  display: block;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: #96f2d7;
    border-radius: 6px;
  }
`;
const InfoBox = styled.div`
  text-align: center;
  color: green;
`;

const EnterExitBox = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const OtherChat = styled.div`
  display: flex;
  border: none;
  width: 100%;
`;

const MyChat = styled.div`
  width: 100%;
  float: right;
  clear: both;
  border: none;
  height: auto;
  margin: 10px 10px 0px 0px;
`;

const ImgBox = styled.img`
  border-radius: 10px;
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const OtherName = styled.div`
  border: none;
  width: 50px;
  text-align: center;
  font-weight: bold;
  font-size: 13px;
  align-items: center;
  justify-content: center;
  line-height: 30px;
`;

const MyMsg = styled.div`
  border: none;
  max-width: 80%;
  width: fit-content;
  margin-left: auto;
  padding: 0px 10px 0px 10px;
  line-height: 30px;
  background: white;
  font-size: small;
  word-break: break-all;
  border-radius: 10px 10px 0px 10px;
  color: white;
  background: linear-gradient(to right, #69db7c, #38d9a9);
`;

const OtherMsg = styled.div`
  border: none;
  max-width: 80%;
  width: fit-content;
  padding: 0px 10px 0px 10px;
  line-height: 35px;
  background: white;
  font-size: small;
  word-break: break-all;
  border-radius: 10px 10px 10px 0px;
  padding: 0px 10px 0px 10px;
  color: black;
  background-color: #f1f3f5;
`;

const SendBox = styled.div`
  background-color: white;
  border: none;
  box-shadow: 4px 4px 4px #e9ecef;
  border-radius: 20px;
  padding: 5px 10px 5px 10px;
  margin: 10px 10px 10px 10px;
  height: 30px;
  width: 600x;
  display: flex;
  align-items: center;
`;

const InputBox = styled.textarea`
  border: none;
  outline: none;
  width: 100%;
  height: 20px;
  resize: none;
  font-size: 15px;
  border-radius: 20px;
  &::placeholder {
    color: #ced4da;
    font-style: italic;
  }
`;

const NoticeInputBox = styled.textarea`
  border: none;
  outline: none;
  width: 100%;
  height: 20px;
  resize: none;
  font-size: 15px;
  border-radius: 20px;
  &::placeholder {
    color: #ced4da;
    font-style: italic;
  }
`;

const UserListBox = styled.div`
  width: 480;
  height: 320px;
  border-radius: 5px;
  background-color: #f4fce3;
  margin-left: 20px;
  box-shadow: 10px 10px 10px #e9ecef;
`;



const ScriptContainer=styled.div`
/* border: solid yellow; */
/* height: 450px; */
width: 40%;
/* margin-top: 30px; */
`;


const TabContainer = styled.div`
  display: flex;
  width: 380px;
  height: 30px;
/* margin-top: 10px; */
margin-left: 25px;
/* border: solid green; */
`;

const ActiveTabBox = styled.div`
  padding: 8px;
  text-align: center;
  width: 90px;
  background: #51cf66;
  cursor: pointer;
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 2px;
  font-size: small;
  /* border: solid yellow; */
`;

const TabBox = styled.div`
  padding: 8px;
  text-align: center;
  width: 90px;
  background: #b2f2bb;
  cursor: pointer;
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 2px;
  font-size: small;
  /* border: solid orange; */
`;