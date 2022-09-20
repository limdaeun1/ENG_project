import React from "react";
import styled from "styled-components";
import { useState } from "react";
import "./ChatList.css";
import ChatListCard from "./ChatListCard";
import { useNavigate } from "react-router-dom";


const ChatList = () => {
  const navigate = useNavigate()
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const addRoom = () =>{
   navigate("/createroom")
  }

  return (
    <div>
      <Container>
        <div>
          <BlocTabsContiner>
            {/* {toggleState === 1 ? <TabBox onClick={() => toggleTab(1)} >tab1</TabBox>:<AciveTabBox onClick={() => toggleTab(1)}> tab1</AciveTabBox>} */}
            <button
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              <div>생활영어</div>
            </button>
            <button
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              <div>스크립트</div>
            </button>
            <button
              className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(3)}
            >
              <div>시험대비</div>
            </button>
            <button
              className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(4)}
            >
              <div>캠스터디</div>
            </button>
            <AddRoomBtn onClick ={()=>{addRoom()}}>방만들기</AddRoomBtn>
          </BlocTabsContiner>
          

          <div className="content-tabs">
            {/* {toggleState === 1 ? <ContentBox onClick={() => toggleTab(1)} >content1</ContentBox>:<ActiveContentBox onClick={() => toggleTab(1)}> content1</ActiveContentBox>} */}

            <div
              className={
                toggleState === 1 ? "content active-content" : "content"
              }
            >
              <ChatListCard />
            </div>

            <div
              className={
                toggleState === 2 ? "content active-content" : "content"
              }
            >
              <ChatListCard />
            </div>

            <div
              className={
                toggleState === 3 ? "content active-content" : "content"
              }
            >
              <ChatListCard />
            </div>

            <div
              className={
                toggleState === 4 ? "content active-content" : "content"
              }
            >
              <ChatListCard />
            </div>
          </div>
        </div>
        <BannerBox />
      </Container>
      
    </div>
  );
};

export default ChatList;

const Container = styled.div`
  /* width: 100%;F
  width: 1040px; */
  display: flex;
  margin: auto;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  max-width: 1000px;
  min-width: 705px;
  /* background-color: green; */
`;

const BlocTabsContiner = styled.div`
  display: flex;
  border-bottom: 1px solid #dee2e6;
  max-width: 1000px;
  min-width: 705px;
`;

const AddRoomBtn= styled.div`
  padding: 8px;
  text-align: center;
  font-size: 13px;
  width: 80px;
  background: #fcc419;
  /* position: relative; */
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-left: auto;
  color:white;
  font-weight: 600;
`;

const BannerBox = styled.img`
  height: 400px;
  width: 150px;
  background-color: #b2f2bb;
  margin-left: 20px;
`


// const TabBox = styled.div`
//   padding: 8px;
//   text-align: center;
//   width: 100px;
//   background: #b2f2bb;
//   cursor: pointer;
//   /* border-bottom: 1px solid rgba(0, 0, 0, 0.274); */
//   box-sizing: content-box;
//   position: relative;
//   outline: none;
//   border-top-left-radius: 10px;
//   border-top-right-radius: 10px;
//   margin-right: 2px;
// `;
// const AciveTabBox = styled.button`
//   background: #51cf66;
//   border-bottom: 1px solid transparent;
//   border-top: 1px solid transparent;
// `;
// const ContentBox = styled.div`
//   background: white;
//   padding: 20px;
//   max-width: 1000px;
//   min-width: 705px;
//   min-height: 500px;
//   display: none;
// `;
// const ActiveContentBox = styled.div`
//   display: block;
// `;
