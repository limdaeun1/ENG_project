import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import ChatListCard from "./ChatListCard";
import { useNavigate } from "react-router-dom";
import { getChatrooms } from "../../redux/modules/chatroom";
import { useDispatch, useSelector } from "react-redux";
import NonCard from "./NonCard";
import reolad from "../../img/reload.png"
import ListSlider from "./ListSlider";


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
    return roomlist.category === "스크립트";
  });
console.log(one)
  let two = roomlist.filter((roomlist) => {
    return roomlist.category === "캠스터디";
  });


  if (isLoading) {
    return <div>
       <ListSlider/>
            <Container>
        <BigBox>
          <BlocTabsContiner>
            {toggleState === 1 ? (
              <AciveTabBox onClick={() => toggleTab(1)}>스크립트</AciveTabBox>
            ) : (
              <TabBox onClick={() => toggleTab(1)}>스크립트</TabBox>
            )}

            {toggleState === 2 ? (
              <AciveTabBox onClick={() => toggleTab(2)}>캠스터디</AciveTabBox>
            ) : (
              <TabBox onClick={() => toggleTab(2)}>캠스터디</TabBox>
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
          </div>
        </BigBox>
      </Container>
    </div>
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (<>
  
      <Container>
      <ListSlider/>
        <BigBox>
          <BlocTabsContiner>
            {toggleState === 1 ? (
              <AciveTabBox onClick={() => toggleTab(1)}>스크립트</AciveTabBox>
            ) : (
              <TabBox onClick={() => toggleTab(1)}>스크립트</TabBox>
            )}

            {toggleState === 2 ? (
              <AciveTabBox onClick={() => toggleTab(2)}>캠스터디</AciveTabBox>
            ) : (
              <TabBox onClick={() => toggleTab(2)}>캠스터디</TabBox>
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
                        roomimage={room.roomImage}
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
                <>
                  <ReloadContainer>
                    <ReloadBtnBox
                    src={reolad}
                    onClick={()=>{dispatch(getChatrooms())}} />
                  </ReloadContainer>
                <ActiveContentBox>
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
                        roomimage={room.roomImage}
                      />
                    );
                  })}
                  
                </ActiveContentBox>
                </>
              ) : (
                <>
                <ReloadContainer>
                <ReloadBtnBox
                src={reolad}
                onClick={()=>{dispatch(getChatrooms())}} />
              </ReloadContainer>
                <ActiveContentBox>
                  <NonCard></NonCard>
                </ActiveContentBox>
                </>
              )
            ) : null}

         
          </div>
        </BigBox>
      </Container>
      </>
  );
};

export default ChatList;

const Container = styled.div`
  margin: 0 auto 10% auto;
  font-size: 14px;
  width: 70%;
  max-width: 1200px;
  min-width: 800px;
`;

const BigBox = styled.div`
  border: none;
  /* display: block; */
  min-height: 500px;
  width: 80%;
  /* max-width: 80%; */
  margin: 0 auto;
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

const ReloadContainer = styled.div`
height: 30px;
margin: 10px;
`
const ReloadBtnBox = styled.img`
width:30px;
height:30px;
cursor:pointer;
float: right;
`

const ActiveContentBox = styled.div`
  border: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

