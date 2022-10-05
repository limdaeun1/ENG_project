import styled from "styled-components";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import send from "../../img/send.png";
import promotion from "../../img/promotion.png";
import conversation from "../../img/conversation.png";
import UserCard from "./UserCard";

const SCChat = () => {
  const Authorization = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("userId")
  // console.log(name);
  const roomId = useParams();
  const client = useRef({});
  const [chat, setChat] = useState({ content: "" });
  const [messages, setMessages] = useState([
    { chatMessage: "", user: "", type: "", image: "" },
  ]);

  const [participant, setParticipant] = useState();

  const [notice, setNoitce] = useState(false);
  const inputRef = useRef("");
  const noticeRef = useRef("");
  const navigate = useNavigate();
  const chattingRef = useRef(null);
  const scrollToElement = () =>
    chattingRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    connect();

    return () => disconnect();
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
            type: 0,                         //입장 메세징
            message: "1",
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
      const content = JSON.parse(chat.body);
      //유저목록
      if (content.type === 9) {
        console.log(content)
        const a = content.enterMembers
        setParticipant(a)
      } 
      else if(content.type === 4){
        console.log(content.vanId)
        if(content.vanId == userId) {
          navigate("/")
        }
        else {
          return null
        }
        
      }
      else {
        setMessages((_messages) => [
          ..._messages,
          {
            chatMessage: content.msg,
            user: content.sender,
            type: content.type,
            image: content.image,
          },
        ]);
        setTimeout(() => scrollToElement(), 50);
      }
    });
  };

  const submit = () => {
    if (inputRef.current.value == "") {
      alert("메세지를 입력하세요");
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
      setChat({ content: "" });
    }
  };

  client.current.onStompError = function (frame) {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };

  //공지 등록
  const onSubmitNotice = () => {
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
  };


  //연결끊기(소켓종료, 구독종료)
  const disconnect = () => {
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
    client.current.unsubscribe();
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

  //채팅창 전송 후 초기화
  const changeHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setChat({ [name]: value });
  };

  //공지등록상태 열고닫기
  const changeNotice = () => {
    setNoitce(!notice);
    setChat({ content: "" });
  };

  console.log(participant)
  // console.log(inputRef.current.value)
  return (
    <>
    <div style={{width:"90%",minHeight:"300px", height:"content-fit", border:"1px solid black"}}>
      {participant?.map((user, i)=>{return <UserCard user = {user} key = {i} roomId={roomId} userId={userId} Authorization ={Authorization} client={client}/>})}
    </div>
      <CamChatBox id="chatBox">
        <div>
          <ChatBox>
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

        {/* 채팅 입력 */}

        {notice === false ? (
          <SendBox>
            {/* <button
              onClick={() => {
                onSubmitBan();
              }}
            >
              밴요청
            </button> */}
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
            <NoticeInputBox
              ref={noticeRef}
              onKeyUp={handleKeyPress}
              placeholder="공지사항을 입력하세요"
            />

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
      </CamChatBox>
    </>
  );
};

export default SCChat;

const CamChatBox = styled.div`
  height: 100%;
  width: 90%;
  display: block;
  border-radius: 5px;
  background: linear-gradient(to right, #effaf6, #e4fcf4);
  box-shadow: 10px 10px 10px #e9ecef;
  padding-bottom: 5px;
`;

const ChatBox = styled.div`
  height: 330px;
  /* min-width: 100px; */
  width: 100%;
  display: block;
  overflow-x: hidden;
  display: block;
  border-radius: 20px;
  margin: 10px auto 10px auto;
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
  margin: 10px;
  height: 30px;
  width: 90%;
  display: flex;
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
