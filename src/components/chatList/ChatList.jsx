import React from "react";
import styled from "styled-components";
import { useState } from "react";
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
            {toggleState === 1 
            ? <AciveTabBox onClick={() => toggleTab(1)}> tab1</AciveTabBox> 
            :<TabBox onClick={() => toggleTab(1)} >tab1</TabBox>}

            {toggleState === 2 
            ? <AciveTabBox onClick={() => toggleTab(2)}> tab2</AciveTabBox> 
            :<TabBox onClick={() => toggleTab(2)} >tab2</TabBox>}

            {toggleState === 3 
            ? <AciveTabBox onClick={() => toggleTab(3)}> tab3</AciveTabBox> 
            :<TabBox onClick={() => toggleTab(3)} >tab3</TabBox>}

            {toggleState === 4 
            ? <AciveTabBox onClick={() => toggleTab(4)}> tab4</AciveTabBox> 
            :<TabBox onClick={() => toggleTab(4)} >tab4</TabBox>}

            <AddRoomBtn onClick ={()=>{addRoom()}}>방만들기</AddRoomBtn>
          </BlocTabsContiner>
          

          <div style={{flexGrow : "1"}}>
            {toggleState === 1 
            ? <ActiveContentBox > 1 <ChatListCard /> </ActiveContentBox>
            :<ContentBox  > 1 <ChatListCard /></ContentBox>}
            

            {toggleState === 2 
            ? <ActiveContentBox > 2 <ChatListCard /></ActiveContentBox>
            :<ContentBox  > 2 <ChatListCard /></ContentBox>}


            {toggleState === 3 
            ? <ActiveContentBox > 3 <ChatListCard /></ActiveContentBox>
            :<ContentBox  > 3 <ChatListCard /></ContentBox>}


            {toggleState === 4 
            ? <ActiveContentBox > 4 <ChatListCard /></ActiveContentBox>
            :<ContentBox  > 4 <ChatListCard /></ContentBox>}
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


const TabBox = styled.div`
  padding: 8px;
  text-align: center;
  width: 100px;
  background: #b2f2bb;
  cursor: pointer;
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 2px;
  font-size: 14px;
`;
const AciveTabBox = styled.div`
  padding: 8px;
  text-align: center;
  width: 100px;
  background: #51cf66;
  cursor: pointer;
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 2px;
  border:none;
  font-size: 14px;
`;
const ContentBox = styled.div`
  background: white;
  padding: 20px;
  max-width: 1000px;
  min-width: 705px;
  min-height: 500px;
  display: none;
`;
const ActiveContentBox = styled.div`
  display: block;
`;
