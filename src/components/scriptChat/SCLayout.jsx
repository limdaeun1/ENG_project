import styled from "styled-components";
import { useState } from "react";
import SCCamSet from "../scriptChat/SCCamSet";
import SCChat from "../scriptChat/SCChat";
import SCScript from "../scriptChat/SCScript";
import SCWhiteBoard from "../scriptChat/SCWhiteBoard";
import "../scriptChat/SCLayout.css";




const SCLayout = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
      setToggleState(index);
    };

    return (
      <>
      <Container>

      <TopBar>
        <ButOut>나가기</ButOut>
          <InfoBar>
            <Room>[방 제목이 들어갈 곳 입니다]  </Room>
            <RoomStudyTime>우리 방 전체 공부 시간: 00:00:00</RoomStudyTime>
            <MyStudyTime>나의 공부 시간: 00:00:00</MyStudyTime>
            <Play>▶</Play>
            <Stop>⏸</Stop>
            </InfoBar>
        </TopBar>


        <Box>

          <SCCamSet/>

          <ScriptChatBox>

            <ScriptContainer>
              <TabContainer>
            <button
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              Script
            </button>
            <button
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              White Board
            </button>
            </TabContainer>

            <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "content active-content" : "content"
              }>
                <SCScript/>
            </div>
            
            <div
              className={
                toggleState === 2 ? "content active-content" : "content"
              }>
                <SCWhiteBoard/>
            </div>
          </div>

            </ScriptContainer>


            <SCChat/>
          </ScriptChatBox>

        </Box>
        </Container>
      </>
    );
  };
  
  export default SCLayout;

  const Container=styled.div`
  width: 100%;
  width: 1850px;
  height: 950px;
  margin: 20px auto;
  border: solid;
`;

  const TopBar=styled.div`
  display:flex;
`;

  const ButOut=styled.div`
  background: #37B24D;
  border-radius: 20px;
  width: 134px;
  height: 45px;
  margin-left: 60px;
  margin-top: 30px;
  text-align : center;
  font-weight: bold;
  font-size: middle;
  align-items: center;
  justify-content: center;
  display: inline-block;
  line-height: 45px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  font-family: "IBM Plex Sans KR", sans-serif;
  &:hover {
    background-color: #89f6ab;
  }
`;

const InfoBar=styled.div`
  background: #D3F9D8;
  border-radius: 20px;
  width: 1259px;
  height: 45px;
  margin-left: 45px;
  margin-top: 30px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  text-align : center;
  font-weight: bold;
  font-size: middle;
  align-items: center;
  justify-content: center;
  display: flex;
  line-height: 45px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const Room=styled.div`
width: 400px;
`;

const RoomStudyTime=styled.div`
width: 400px;
`;

const MyStudyTime=styled.div`
width: 400px;
`;

const Play=styled.div`
width: 100px;
`;

const Stop=styled.div`
width: 100px;
`;

const Box=styled.div`
display:flex;
border: none;
height: 700px;
`;


const ScriptChatBox=styled.div`
border: none;
margin-left: 60px;
height: 830px;
width: 420px;
margin-top: 30px;
`;

const ScriptContainer=styled.div`
border: none;
height: 450px;
width: 420px;
margin-top: 30px;
`;

const TabContainer = styled.div`
  display: flex;
  width: 380px;
  height: 30px;
margin-top: 10px;
margin-left: 25px;
`;