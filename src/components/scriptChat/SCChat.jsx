import styled from "styled-components";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';

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
  const Authorization = `Bearer eyJ${localStorage.getItem(process.env.REACT_APP_TOKEN_A)}${localStorage.getItem(process.env.REACT_APP_TOKEN_B)}${localStorage.getItem(process.env.REACT_APP_TOKEN_C)}`;
  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("userId")
  const roomId = useParams();
  const client = useRef({});


 

  //채팅 메세지 관리
  const [chat, setChat] = useState({ content: "" });
  //백과 협의한 메세지 type(0:입장, 1:퇴장, 2:채팅)
  const [messages, setMessages] = useState([
    { chatMessage: "", user: "", type: "", image: "",time:"" },
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
  // const chattingRef = useRef(null);
  const chattingRef = useRef([]);

  useEffect(() => {
    connect();
    
    return () => disconnect();
  }, []);

  //기존 스크룰
  // const scrollToElement = () =>
  //   chattingRef.current?.scrollIntoView({ behavior: "smooth" });

//   window.onbeforeunload = function (e) {
//     // e.preventDefault()
//       disconnect();
// };

// window.addEventListener('beforeunload', navigate("/"));



    const scrollToBottom = () => {
      if (chattingRef.current) {
        chattingRef.current.scrollTop = chattingRef.current.scrollHeight;
      }
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages,toggleState]);
    


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

    const moveList = () =>{
      navigate("/");
      Swal.fire({
        title: "비정상적인 접근입니다.",
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
      brokerURL: process.env.REACT_APP_CHAT_WEBSOCKET,
      connectHeaders: {
        Authorization: Authorization,
      },
      debug: function (str) {
        // console.log(str);
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
        var heartbeat_msg = '--heartbeat--', heartbeat_interval = null;
        // missed_heartbeats = 0;
        if (heartbeat_interval === null) {
          // missed_heartbeats = 0;
          heartbeat_interval = setInterval(function() {
              try {
                  // missed_heartbeats++;
                  // if (missed_heartbeats >= 6)
                      // throw new Error("Too many missed heartbeats.");
                  client.current.publish({                                     
                    destination: "/pub/chat/message", 
                    headers: { Authorization: Authorization },
                    //전송할 데이터를 입력
                    body: JSON.stringify({
                      type: 8,                        
                      message: heartbeat_msg,
                      roomId: roomId.id,
                      // userId:userId,
                    }),
                  });
              } catch(e) {
                  clearInterval(heartbeat_interval);
                  // const heartbeat_interval = null;
                  // console.warn("Closing connection. Reason: " + e.message);
                  // console.log("짱많이 보냄")
                  // disconnect();
              }
          }, 3000);
      }
      },
    });
    client.current.activate();
  };
 //sockjs 미지원 브라우저를 위한 websocketfactory연결
  client.webSocketFactory = () => {
    // return new SockJS("http://54.180.142.30/ws-stomp");
    return new SockJS(process.env.REACT_APP_CHAT_SOCK);
  };


  // console.log(latesUser)

  //구독
  const subscribe = () => {
    //이곳에서 모든 구독(subScribe)가 되어야 합니다.
    client.current.subscribe(`/sub/chat/room/${roomId.id}`, function (chat) {
      const content = JSON.parse(chat.body);
     

      //van처리
      if(content.type === 4){
        // console.log(content.vanId)
        if(content.vanId == userId) {
          ban()
        }
        else {
          return null
        }
      }
      //방장 & 참가자 수 관리
      else if (content.type === 5){
        // console.log(content)
        setMemberCount(content?.maxMember)
        setRoomManager(content?.managerId)
      }    
      
      else if(content.type === 8){
        // console.log(content)
        if(content.vanId == userId) {
          moveList()
        }
        else{
          return null
        }
      }

       //참가자목록
      else if (content.type === 9) {
        // console.log(content)
        const a = content.enterMembers
        setParticipant(a)
      } 
    
      //채팅저장

      else if(content.type === 2) {
        setMessages((_messages) => [
          ..._messages,
          {
            chatMessage: content.msg,
            user: content.sender,
            type: content.type,
            image: content.image,
            time: content.chatTime,
          },
        ]);           
      }


      //공지 및 입장 퇴장 메세징
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

        // setTimeout(() => scrollToElement(), 50);
      }
    });
  };


  //채팅(type2)
  const submit = () => {
    if (inputRef.current.value == "") {
      Swal.fire({
        title: '메세지를 입력하세요.', 
        icon: 'warning', 
      });
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
    // console.log("Broker reported error: " + frame.headers["message"]);
    // console.log("Additional details: " + frame.body);
  };

  //공지 등록
  const onSubmitNotice = () => {
    if (noticeRef.current.value == "") {
      Swal.fire({
        title: '공지사항을 입력하세요.', 
        icon: 'warning', 
      });
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

   //엔터키 제어+엔터로 공지보내기
   const NoticeHandleKeyPress = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      // [shift] + [Enter] 치면 리턴
      return;
    } else if (e.key === "Enter") {
      //[Enter]치면 전송
      onSubmitNotice();
      changeNotice();
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

  return (
    <div >

{/* 탭바 */}

<TabContainer>
          {toggleState === 1 ? (
            <ActiveTabBox onClick={() => toggleTab(1)}>채팅</ActiveTabBox>
          ) : (
            <UserTabBox onClick={() => toggleTab(1)}>채팅</UserTabBox>
          )}

          {toggleState === 2 ? (
            <UserActiveTabBox onClick={() => toggleTab(2)}>UserList</UserActiveTabBox>
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
          <ChatBox ref={chattingRef}>
            {messages.map((c, i) => {
              return c.type === 2 ? (
                //내 메세지면
                c.user == name ?

                      // 본인메세지
                (
                  messages[i-1].user !== name
                  ?(messages[i+1]?.user == name
                    ?(messages[i+1]?.time == messages[i].time
                      ?(
                        <MyChat key={uuidv4()}>
                      <MsgTimeBox >
                    <MyMsg>{c.chatMessage}</MyMsg>
                    </MsgTimeBox>
                  </MyChat>
                      )
                      :(<MyChat key={uuidv4()}>
                        <MsgTimeBox >
                      <TimeMsg >{c.time}</TimeMsg>
                      <MyMsg>{c.chatMessage}</MyMsg>
                      </MsgTimeBox>
                    </MyChat>)
                    )
                    :(
                    <MyChat key={uuidv4()}>
                        <MsgTimeBox>
                        <TimeMsg >{c.time}</TimeMsg>
                      <MyMsg>{c.chatMessage}</MyMsg>
                      </MsgTimeBox>
                  </MyChat>))
                  :(messages[i+1]?.user == name
                    ?(messages[i+1]?.time == messages[i].time
                      ?(
                        
                        <MyChat key={uuidv4()}>
                          <MsgTimeBox>
                        <MyMsg>{c.chatMessage}</MyMsg>
                        </MsgTimeBox>
                      </MyChat>
                      )
                      :(
                        <MyChat key={uuidv4()}>
                        <MsgTimeBox >
                        <TimeMsg >{c.time}</TimeMsg>
                      <MyMsg>{c.chatMessage}</MyMsg>
                      </MsgTimeBox>
                      </MyChat>
                      ))
                    :(messages[i+1]?.time == messages[i].time
                      ?(
                        <MyChat key={uuidv4()}>
                        <MsgTimeBox>
                        <TimeMsg >{c.time}</TimeMsg>
                      <MyMsg>{c.chatMessage}</MyMsg>
                      </MsgTimeBox>
                      </MyChat>
                      )
                      :(
                        <MyChat key={uuidv4()}>
                        <MsgTimeBox>
                        <TimeMsg >{c.time}</TimeMsg>
                      <MyMsg>{c.chatMessage}</MyMsg>
                      </MsgTimeBox>
                        
                      </MyChat>
                      ))
)
                )
                 :             // 다른사람 메세지
                    (
                      messages[i-1].user !== messages[i].user 
                      ?(messages[i+1]?.user == messages[i].user
                        ?(messages[i+1]?.time == messages[i].time 
                          ?(

                            <OtherChat key={uuidv4()}>
                          <ImgBox src={c.image} />
                          <div>
                            <OtherName>{c.user}</OtherName>
                            <OtherMsg>{c.chatMessage}</OtherMsg>
                          </div>
                        </OtherChat>

                          )
                          :( 
                          
                          <OtherChat key={uuidv4()}>
                          <ImgBox src={c.image} />
                          <div>
                            <OtherName>{c.user}</OtherName>
                            <OtherMsg>{c.chatMessage}</OtherMsg>
                          </div>
                          <TimeMsg>{c.time}</TimeMsg>
                        </OtherChat>
                        
                        ))
                        :(messages[i+1]?.time == messages[i].time 
                          ?( <OtherChat key={uuidv4()}>
                              <ImgBox src={c.image} />
                              <MsgTimeBox2>
                              <div>
                                <OtherName>{c.user}</OtherName>
                                <OtherMsg>{c.chatMessage}</OtherMsg>
                              </div>
                              <TimeMsg>{c.time}</TimeMsg>
                              </MsgTimeBox2>
                            </OtherChat>)
                          :(                
                                <OtherChat key={uuidv4()}>
                              <ImgBox src={c.image} />
                              <MsgTimeBox2>
                              <div>
                                <OtherName>{c.user}</OtherName>
                                <OtherMsg>{c.chatMessage}</OtherMsg>
                              </div>
                              <TimeMsg>{c.time}</TimeMsg>
                              </MsgTimeBox2>
                            </OtherChat>)))
                      :( messages[i+1]?.user == messages[i].user
                        ?(messages[i+1]?.time == messages[i].time //고침 다음이랑 시간이 같으면
                          ?(
                    <OtherChat key={uuidv4()}>
                    <ImgBox2/>
                    {/* <ImgBox src={c.image} /> */}
                    <div>
                      <OtherMsg>{c.chatMessage}</OtherMsg>
                    </div>
                  </OtherChat>
                          )
                          :(
                            <OtherChat key={uuidv4()}>
                              <MsgTimeBox2>
                            <ImgBox2/>
                            <div>
                              <OtherMsg>{c.chatMessage}</OtherMsg>
                            </div>
                            <TimeMsg>{c.time}</TimeMsg>
                            </MsgTimeBox2>
                          </OtherChat>
                          )

                        )
                        :(messages[i+1]?.user !== messages[i].user
                          ?(
                            <OtherChat key={uuidv4()}>
                              <MsgTimeBox2>
                            <ImgBox2/>
                            <div>
                              <OtherMsg>{c.chatMessage}</OtherMsg>
                            </div>
                            <TimeMsg>{c.time}</TimeMsg>
                            </MsgTimeBox2>
                          </OtherChat>
                          ) 
                          :(
                            <OtherChat key={uuidv4()}>
                              <MsgTimeBox2>
                            <ImgBox2/>
                            <div>
                              <OtherMsg>{c.chatMessage}</OtherMsg>
                            </div>
                            <TimeMsg>{c.time}</TimeMsg>
                            </MsgTimeBox2>
                          </OtherChat>
                          )

                        ))
                    )
              ) : c.type === 3 ? (
                <InfoBox
                key={uuidv4()}
                >
                  {c.chatMessage}
                </InfoBox>
              ) : ( c.type === 0 || c.type === 1
                ?(
                  <div  key={uuidv4()} style={{width:"100%",textAlign:"center"}}>
                  <EnterExitBox>
                    {c.chatMessage}
                  </EnterExitBox>
                  </div>
                )
                :(
                  null
                )
              );
            })}
          </ChatBox>
        </div>

        {/* 메세지 전송(notice = false: 메세지 전송 모드, notice=true: 공지 전송 모드 ) */}
        {notice === false ? (
          <SendBox>
            <SendDiv>
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
              onKeyUp={handleKeyPress}
              //keydown or keypress일때하면 안됨. 올라갈때 실행되야지 엔터가 자동으로 안먹힘. 그래서 keyup사용
              onChange={changeHandler}
            />
            <SendBtnImg
              onClick={() => {
                submit();
              }}
              src={send}
            />
            </SendDiv>
          </SendBox>
        ) : (
          <SendBox>
            <SendDiv>
            <SendBtnImg
              src={conversation}
              onClick={() => {
                changeNotice();
              }}
            />
            <NoticeInputBox
              ref={noticeRef}
              onKeyUp={NoticeHandleKeyPress}
              placeholder="공지사항을 입력하세요"
            />

            <SendBtnImg
              onClick={() => {
                onSubmitNotice();
                changeNotice();
              }}
              src={send}
            />
            </SendDiv>
          </SendBox>
        )}
      </CamChatBox>
    </>
     :
     null}
      
      {toggleState === 2 ? (
      <UserContainer>
       <div style={{float:"right", display:"flex",margin:"2% 2%"}}>
       참가자 : {participant?.length}/{memberCount}명
       </div>
        {participant?.map((user, i)=>{return <UserCard user = {user} key = {i} roomId={roomId} userId={userId} Authorization ={Authorization} client={client} roomManager ={roomManager}/>})}
        </UserContainer>) : null}

    </div>
  );
};

export default SCChat;

const CamChatBox = styled.div`
  height: 40vh;
  min-height: 220px;
  width: 25vw;
  min-width: 320px;
  display: block;
  border-radius: 5px;
  background: linear-gradient(to right, #effaf6, #e4fcf4);
  box-shadow: 10px 10px 10px #e9ecef;
  /* padding-bottom: 10px; */
`;
const UserContainer = styled.div`
  width: 25vw;
  min-width: 320px;
min-height: 220px;
/* min-height:310px;  */
height:40vh;
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
  height: 33vh;
  min-height: 180px;
  /* min-width: 100px; */
  width: 100%;
  display: block;
  overflow-x: hidden;
  display: block;
  border-radius: 20px;
  margin: 0px auto 0px auto;
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
  width: 100%;
  font-size: 14px;
  margin: 10px 0px 10px 0px;
   white-space: pre-line;
`;

const EnterExitBox = styled.div`
  width: 40%;
  display: inline-block;
  margin: 10px 0px 10px 0px;
  border-radius: 5px;
  color:#adb5bd;
  font-size: 14px;
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
  display: flex;
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
const ImgBox2 =styled.div`
width:50px;
` 

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

const MsgTimeBox = styled.div`
  margin-left:auto;
  display:flex;
`

const MsgTimeBox2 = styled.div`
  display:flex;
`

const MyMsg = styled.div`
  border: none;
  max-width: 230px;
  width: fit-content;
  margin-left: auto;
  padding: 0px 10px 0px 10px;
  line-height: 30px;
  background: white;
  font-size: small;
  word-break: break-all;
  white-space: pre-line;
  border-radius: 10px 10px 0px 10px;
  color: white;
  background: linear-gradient(to right, #69db7c, #38d9a9);
`;

const OtherMsg = styled.div`
  border: none;
  max-width: 200px;
  width: fit-content;
  padding: 0px 10px 0px 10px;
  margin-right: 10px;
  line-height: 35px;
  background: white;
  font-size: small;
  word-break: break-all;
  white-space: pre-line;
  margin-top: 10px;
  border-radius: 10px 10px 10px 0px;
  color: black;
  background-color: #f1f3f5;
`;

const TimeMsg = styled.div`
  font-size:13px;
  margin-top:auto;
`

const SendBox = styled.div`
  background-color: white;
  border: none;
  box-shadow: 4px 4px 4px #e9ecef;
  border-radius: 20px;
  margin: 5px auto 0px auto;
  height: 30px;
  width: 90%;
  display: flex;
  padding: auto;
`;

const SendDiv = styled.div`
  display:flex;
  ;margin:auto;
  ;width:90%;
`

const SendBtnImg =styled.img`
  width: 20px;
  height:20px;
  cursor: pointer;
`

const InputBox = styled.textarea`
  border: none;
  outline: none;
  width: 80%;
  margin-left:auto;
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
  width: 80%;
  margin-left:auto;
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
  width:100%;
 min-height: 30px;
margin-top: 8px;
margin-left: 10px;
border:none;
`;

const ActiveTabBox = styled.div`
  padding: 4px;
  text-align: center;
  min-width: 100px;
  width:7vw;
  color: white;
  background: linear-gradient(to right, #69db7c, #38d9a9);
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: small;
  border: none;
`;


const UserActiveTabBox = styled.div`
  padding: 4px;
  text-align: center;
  min-width: 100px;
  width:7vw;
  color: white;
  background: linear-gradient(to right, #74c0fc, #91a7ff);
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: small;
  border: none;
`;

const TabBox = styled.div`
  padding: 4px;
  text-align: center;
  min-width: 95px;
  width: 6vw;
  color:#495057;
  background: linear-gradient(to right,#d3f9d8,#b2f2bb);
  cursor: pointer;
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 0.2%;
  font-size: small;
  border: none;
`;
const UserTabBox = styled.div`
  padding: 4px;
  text-align: center;
  min-width: 95px;
  width: 6vw;
  color:#495057;
  background: linear-gradient(to right,#d0ebff,#dbe4ff);
  cursor: pointer;
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 0.2%;
  font-size: small;
  border: none;
`;