import styled from "styled-components";
import Swal from "sweetalert2";

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
  const roomId = useParams();
  const client = useRef({});

  //채팅 메세지 관리
  const [chat, setChat] = useState({ content: "" });
  //백과 협의한 메세지 type(0:입장, 1:퇴장, 2:채팅)
  const [messages, setMessages] = useState([
    { chatMessage: "", user: "", type: "", image: "" },
  ]); 
  const inputRef = useRef("");

  //공지 관리
  const [notice, setNoitce] = useState(false);
  const noticeRef = useRef("");


  //채팅 & 참가자목록 탭 관리
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };


  //참가자 목록 관리 & 룸매니저 관리
  const [participant, setParticipant] = useState();
  const [roomManager, setRoomManager] = useState();
  const [memberCount, setMemberCount] = useState();


  const navigate = useNavigate();
  const chattingRef = useRef(null);

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const scrollToElement = () =>
    chattingRef.current?.scrollIntoView({ behavior: "smooth" });


//강제퇴장
    const ban = () =>{
      navigate("/");
      Swal.fire({
        title: "강제퇴장되었습니다.",
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        showCancelButton: false,
        confirmButtonText: "확인",
    })
    }


  //웹소캣 연결 & 구독
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
       //구독
        subscribe();                              
        //입장 메세징
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
    //이곳에서 모든 구독(subScribe)가 되어야 합니다.
    client.current.subscribe(`/sub/chat/room/${roomId.id}`, function (chat) {
      const content = JSON.parse(chat.body);
      //참가자목록
      if (content.type === 9) {
        console.log(content)
        const a = content.enterMembers
        setParticipant(a)
      } 
      //van처리
      else if(content.type === 4){
        console.log(content.vanId)
        if(content.vanId == userId) {
          ban()
        }
        else {
          return null
        }
        
      }
      //방장 & 참가자 수 관리
      else if (content.type === 5){
        setMemberCount(content?.maxMember)
        setRoomManager(content?.managerId)
      }

      //채팅저장
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

  //채팅(type2)
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


    

  // console.log(participant)
  // console.log(participant?.length)
  // console.log(roomManager)
  // console.log(inputRef.current.value)
  return (
    <>

{/* 탭바 */}

<TabContainer>
          {toggleState === 1 ? (
            <ActiveTabBox onClick={() => toggleTab(1)}>채팅</ActiveTabBox>
          ) : (
            <TabBox onClick={() => toggleTab(1)}>채팅</TabBox>
          )}

          {toggleState === 2 ? (
            <ActiveTabBox onClick={() => toggleTab(2)}>UserList</ActiveTabBox>
          ) : (
            <TabBox onClick={() => toggleTab(2)}>UserList</TabBox>
          )}
        </TabContainer>

{/* 탭 컨텐츠 내용 (1:채팅, 2:참가자 목록) */}

    {toggleState === 1 ?
    <>
    {/* 채팅박스 */}
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

        {/* 메세지 전송(notice = false: 메세지 전송 모드, notice=true: 공지 전송 모드 ) */}
        {notice === false ? (
          <SendBox>
            <SendBtnImg
              src={promotion}
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
            <button onClick={()=>{ban()}}>확인용</button>
            <SendBtnImg
              onClick={() => {
                submit();
              }}
              src={send}
            />
          </SendBox>
        ) : (
          <SendBox>
            <SendBtnImg
              src={conversation}
              onClick={() => {
                changeNotice();
              }}
            />
            <NoticeInputBox
              ref={noticeRef}
              onKeyUp={handleKeyPress}
              placeholder="공지사항을 입력하세요"
            />

            <SendBtnImg
              onClick={() => {
                onSubmitNotice();
                changeNotice();
              }}
              src={send}
            />
          </SendBox>
        )}
      </CamChatBox>
    </>
     :
     null}
      
      {toggleState === 2 ? (
      <UserContainer>
       <div >
        {participant?.length}/{memberCount}명
       </div>
        {participant?.map((user, i)=>{return <UserCard user = {user} key = {i} roomId={roomId} userId={userId} Authorization ={Authorization} client={client} roomManager ={roomManager}/>})}
        </UserContainer>) : null}

    </>
  );
};

export default SCChat;

const CamChatBox = styled.div`
  height: 80%;
  width: 90%;
  display: block;
  border-radius: 5px;
  background: linear-gradient(to right, #effaf6, #e4fcf4);
  box-shadow: 10px 10px 10px #e9ecef;
  padding-bottom: 10px;
`;
const UserContainer = styled.div`
width:90%;
min-height:315px; 
height:315px;
  background: linear-gradient(to right,#e7f5ff,#e3fafc );
  border-radius: 5px;
  box-shadow: 10px 10px 10px #e9ecef;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: #d0ebff;
    border-radius: 6px;
  }
`;
const ChatBox = styled.div`
  height: 250px;
  /* min-width: 100px; */
  width: 100%;
  display: block;
  overflow-x: hidden;
  display: block;
  border-radius: 20px;
  margin: 0px auto 10px auto;
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
  /* max-width: 80%; */
  width: fit-content;
  padding: 0px 10px 0px 10px;
  margin-right: 10px;
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
  margin: 0px 10px 0px 10px;
  height: 30px;
  width: 90%;
  display: flex;
`;

const SendBtnImg =styled.img`
  width: 30px;
  height:30px;
  cursor: pointer;
`

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

const TabContainer = styled.div`
  display: flex;
  width: 380px;
  height: 30px;
  margin-left: 10px;
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
`;

