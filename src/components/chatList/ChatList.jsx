import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import ChatListCard from "./ChatListCard";
import { useNavigate } from "react-router-dom";
import { getChatrooms } from "../../redux/modules/chatroom";
import { useDispatch, useSelector } from "react-redux";
import NonCard from "./NonCard";
import reolad from "../../img/reload.png"


const ChatList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, roomlist } = useSelector((state) => state.chatroom);
  const [toggleState, setToggleState] = useState(1);

  useEffect(() => {
    dispatch(getChatrooms());
  }, []);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const addRoom = () => {
    navigate("/createroom");
  };

  let one = roomlist.filter((roomlist) => {
    return roomlist.category === "생활영어";
  });

  let two = roomlist.filter((roomlist) => {
    return roomlist.category === "스크립트";
  });

  let three = roomlist.filter((roomlist) => {
    return roomlist.category === "시험대비";
  });

  let four = roomlist.filter((roomlist) => {
    return roomlist.category === "캠스터디";
  });

  if (isLoading) {
    // return <div>로딩중...</div>;
    return <div>
            <Container>
        <BigBox>
          <BlocTabsContiner>
            {toggleState === 1 ? (
              <AciveTabBox onClick={() => toggleTab(1)}>생활영어</AciveTabBox>
            ) : (
              <TabBox onClick={() => toggleTab(1)}>생활영어</TabBox>
            )}

            {toggleState === 2 ? (
              <AciveTabBox onClick={() => toggleTab(2)}>스크립트</AciveTabBox>
            ) : (
              <TabBox onClick={() => toggleTab(2)}>스크립트</TabBox>
            )}

            {toggleState === 3 ? (
              <AciveTabBox onClick={() => toggleTab(3)}>시험대비</AciveTabBox>
            ) : (
              <TabBox onClick={() => toggleTab(3)}>시험대비</TabBox>
            )}

            {toggleState === 4 ? (
              <AciveTabBox onClick={() => toggleTab(4)}>캠스터디</AciveTabBox>
            ) : (
              <TabBox onClick={() => toggleTab(4)}>캠스터디</TabBox>
            )}

            <AddRoomBtn
              onClick={() => {
                addRoom();
              }}
            >
              방만들기
            </AddRoomBtn>
          </BlocTabsContiner>

          <div style={{ flexGrow: "1" }}>
            {toggleState === 1 ? (
              one.length !== 0 ? (
                <div>
                    <ReloadContainer>
                    <ReloadBtnBox
                    src={reolad}
                    onClick={()=>{dispatch(getChatrooms())}} />
                  </ReloadContainer>
                <ActiveContentBox>
                  <p>...로딩중</p>
                </ActiveContentBox>
                </div>
              ) : (
                <div>
                <ActiveContentBox>
                <p>...로딩중</p>
                </ActiveContentBox>
                </div>
              )
            ) : null}

            {toggleState === 2 ? (
              two.length !== 0 ? (
                <ActiveContentBox>
                <p>...로딩중</p>
                </ActiveContentBox>
              ) : (
                <ActiveContentBox>
                <p>...로딩중</p>
                </ActiveContentBox>
              )
            ) : null}

            {toggleState === 3 ? (
              three.length !== 0 ? (
                <ActiveContentBox>
                <p>...로딩중</p>
                </ActiveContentBox>
              ) : (
                <ActiveContentBox>
                <p>...로딩중</p>
                </ActiveContentBox>
              )
            ) : null}

            {toggleState === 4 ? (
              four.length !== 0 ? (
                <ActiveContentBox>
                <p>...로딩중</p>
                </ActiveContentBox>
              ) : (
                <ActiveContentBox>
                <p>...로딩중</p>
                </ActiveContentBox>
              )
            ) : null}
          </div>
        </BigBox>
        <BannerBox />
      </Container>
    </div>
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <Container>
        <BigBox>
          <BlocTabsContiner>
            {toggleState === 1 ? (
              <AciveTabBox onClick={() => toggleTab(1)}>생활영어</AciveTabBox>
            ) : (
              <TabBox onClick={() => toggleTab(1)}>생활영어</TabBox>
            )}

            {toggleState === 2 ? (
              <AciveTabBox onClick={() => toggleTab(2)}>스크립트</AciveTabBox>
            ) : (
              <TabBox onClick={() => toggleTab(2)}>스크립트</TabBox>
            )}

            {toggleState === 3 ? (
              <AciveTabBox onClick={() => toggleTab(3)}>시험대비</AciveTabBox>
            ) : (
              <TabBox onClick={() => toggleTab(3)}>시험대비</TabBox>
            )}

            {toggleState === 4 ? (
              <AciveTabBox onClick={() => toggleTab(4)}>캠스터디</AciveTabBox>
            ) : (
              <TabBox onClick={() => toggleTab(4)}>캠스터디</TabBox>
            )}

            <AddRoomBtn
              onClick={() => {
                addRoom();
              }}
            >
              방만들기
            </AddRoomBtn>
          </BlocTabsContiner>

          <div style={{ flexGrow: "1" }}>
            {toggleState === 1 ? (
              one.length !== 0 ? (
                <div>
                    <ReloadContainer>
                    <ReloadBtnBox
                    src={reolad}
                    onClick={()=>{dispatch(getChatrooms())}} />
                  </ReloadContainer>
                <ActiveContentBox>


                  {one.map((room) => {
                    return (
                      <ChatListCard
                        category={room.category}
                        maxCount={room.maxCount}
                        nowCount={room.nowCount}
                        id={room.roomId}
                        roomName={room.roomName}
                        key={room.roomId}
                        lock={room.lock}
                      />
                    );
                  })}
                </ActiveContentBox>
                </div>
              ) : (
                <div>
                  <ReloadContainer>
                    <ReloadBtnBox
                    src={reolad}
                    onClick={()=>{dispatch(getChatrooms())}} />
                  </ReloadContainer>
                <ActiveContentBox>

                  <NonCard></NonCard>
                </ActiveContentBox>
                </div>
              )
            ) : null}

            {toggleState === 2 ? (
              two.length !== 0 ? (
                <ActiveContentBox>
                  <ReloadContainer>
                    <ReloadBtnBox
                    src={reolad}
                    onClick={()=>{dispatch(getChatrooms())}} />
                  </ReloadContainer>
                  {two.map((room) => {
                    return (
                      <ChatListCard
                        category={room.category}
                        maxCount={room.maxCount}
                        nowCount={room.nowCount}
                        id={room.roomId}
                        roomName={room.roomName}
                        key={room.roomId}
                        lock={room.lock}
                      />
                    );
                  })}
                </ActiveContentBox>
              ) : (
                <ActiveContentBox>
                  <ReloadContainer>
                    <ReloadBtnBox
                    src={reolad}
                    onClick={()=>{dispatch(getChatrooms())}} />
                  </ReloadContainer>
                  <NonCard></NonCard>
                </ActiveContentBox>
              )
            ) : null}

            {toggleState === 3 ? (
              three.length !== 0 ? (
                <ActiveContentBox>
                  <ReloadContainer>
                    <ReloadBtnBox
                    src={reolad}
                    onClick={()=>{dispatch(getChatrooms())}} />
                  </ReloadContainer>
                  {three.map((room) => {
                    return (
                      <ChatListCard
                        category={room.category}
                        maxCount={room.maxCount}
                        nowCount={room.nowCount}
                        id={room.roomId}
                        roomName={room.roomName}
                        key={room.roomId}
                        lock={room.lock}
                      />
                    );
                  })}
                </ActiveContentBox>
              ) : (
                <ActiveContentBox>
                  <ReloadContainer>
                    <ReloadBtnBox
                    src={reolad}
                    onClick={()=>{dispatch(getChatrooms())}} />
                  </ReloadContainer>
                  <NonCard></NonCard>
                </ActiveContentBox>
              )
            ) : null}

            {toggleState === 4 ? (
              four.length !== 0 ? (
                <ActiveContentBox>
                  <ReloadContainer>
                    <ReloadBtnBox
                    src={reolad}
                    onClick={()=>{dispatch(getChatrooms())}} />
                  </ReloadContainer>
                  {four.map((room) => {
                    return (
                      <ChatListCard
                        category={room.category}
                        maxCount={room.maxCount}
                        nowCount={room.nowCount}
                        id={room.roomId}
                        roomName={room.roomName}
                        key={room.roomId}
                        lock={room.lock}
                      />
                    );
                  })}
                </ActiveContentBox>
              ) : (
                <ActiveContentBox>
                  <ReloadContainer>
                    <ReloadBtnBox
                    src={reolad}
                    onClick={()=>{dispatch(getChatrooms())}} />
                  </ReloadContainer>
                  <NonCard></NonCard>
                </ActiveContentBox>
              )
            ) : null}
          </div>
        </BigBox>
        <BannerBox />
      </Container>
    </div>
  );
};

export default ChatList;

const Container = styled.div`
  border: none;
  display: flex;
  min-height: 400px;
  /* align-items: center; */
  /* justify-content: center; */
  width: 90%;
  margin: 100px auto 20px auto;
  font-size: 14px;
`;

const BlocTabsContiner = styled.div`
  border: none;
  display: flex;
  border-bottom: 1px solid #dee2e6;
  width: 100%;
`;

const AddRoomBtn = styled.div`
  border: none;
  padding: 1.2% 2% 1.2% 2%;
  text-align: center;
  font-size: 0.9em;
  width: 10%;
  min-width: 55px;
  color: white;
  font-weight: 600;
  letter-spacing:0.8px;
  background: linear-gradient(to right, #91a7ff, #748ffc);
  /* background: linear-gradient(to right,  #91a7ff, #748ffc); */
  box-shadow: 3px 0px 3px #d5d6d6;
  /* position: relative; */
  outline: none;
  margin-top: 0.3%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-left: auto;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const BannerBox = styled.img`
  border: none;
  height: 50%;
  min-height: 500px;
  width: 20%;
  background-color: #b2f2bb;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 9%;
  margin-bottom: 10%;
`;

const TabBox = styled.div`
  padding: 1.2% 3% 1.2% 3%;
  text-align: center;
  /* min-width: 70px; */
  width: 10%;
  min-width: 55px;
  /* height: %; */
  color:#495057;
  background: linear-gradient(to right,#d3f9d8,#b2f2bb);
  letter-spacing:0.8px;
  cursor: pointer;
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 0.3%;
  margin-top: 0.3%;
  font-size: 0.9em;
`;
const AciveTabBox = styled.div`
  padding: 1.2% 3% 1.2% 3%;
  text-align: center;
  /* min-width: 70px; */
  width: 10%;
  min-width: 55px;
  /* height: %; */
  color: white;
  font-weight: 600;
  letter-spacing:0.5px;
  background: linear-gradient(to right, #69db7c, #38d9a9);
  box-shadow: 3px 0px 3px #d5d6d6;
  cursor: pointer;
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 0.3%;
  margin-top: 0.3%;
  font-size: 0.9em;
`;

// const ContentBox = styled.div`
//   border: none;
//   background: white;
//   padding: 20px;
//   max-width: 1000px;
//   min-width: 705px;
//   min-height: 500px;
//   display: none;
// `;
const ReloadContainer = styled.div`
height: 30px;
  width:100%;
  min-width:400px;
  /* background-color:green; */
`
const ReloadBtnBox = styled.img`
width:30px;
height:30px;
cursor:pointer;
float:right
`

const ActiveContentBox = styled.div`
  border: none;
  display: block;
`;

const BigBox = styled.div`
  border: none;
  display: block;
  min-height: 500px;
  margin-left: 20%;
  width: 90%;
`;
