import styled from "styled-components";
import CSChat from "../camstudyChat/CSChat";
import CSCamSet from "../camstudyChat/CSCamSet";


const CSLayout = () => {

    return (
      <>

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

          <CamBox>
            <CSCamSet/>
          </CamBox>

          <ScriptChatBox>
            <CSChat/>
          </ScriptChatBox>
        
        </Box>
          
      </>
    );
  };
  
  export default CSLayout;

  const TopBar=styled.div`
  display:flex;
`;

  const ButOut=styled.div`
  background: #40c057;
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
display:block;
border: none;
height: 950px;
`;

const CamBox=styled.div`
border: none;
margin-left: 235px;
height: 500px;
width: 1080px;
margin-top: 30px;
`;

const ScriptChatBox=styled.div`
border: solid 1px green;
margin-left: 100px;
height: 320px;
width: 1300px;
margin-top: 50px;
display: block;
align-items: center;
justify-content: center;
border-radius: 20px;
box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;