import styled from "styled-components";
import CSChat from "../camstudyChat/CSChat";
import CSCamSet from "../camstudyChat/CSCamSet";
import Timer from "./Timer";
import { useParams , useLocation } from "react-router-dom";


const CSLayout = () => {
  const {id} = useParams();
  const {state} = useLocation();
  console.log(id)


    return (
      <>
      <TopBar>
        <ButOut>나가기</ButOut>
          <InfoBar>
            <Room>{state.roomName}</Room>
            <Timer id={state.id}/>
          </InfoBar>
      </TopBar>

        <Box>
          <CamBox>
            <CSCamSet id={id}/>
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
  border: none;
  width: 100%;
  min-width: 800px;
  display:flex;
  font-size: 10px;
`;

  const ButOut=styled.div`
  border: none;
  background: #40c057;
  border-radius: 20px;
  width: 9%;
  min-width: 80px;
  max-width: 150px;
  height: 3.1em;
  margin-left: 6%;
  margin-top: 2%;
  text-align : center;
  font-weight: bold;
  font-size: middle;
  align-items: center;
  justify-content:space-between;
  display: inline-block;
  font-size: 1.5em;
  line-height: 45px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  font-family: "IBM Plex Sans KR", sans-serif;
    &:hover {
    background-color: #89f6ab;
  }
`;

const InfoBar=styled.div`
border: none;
  background: #D3F9D8;
  border-radius: 20px;
width: 75%;
height: 2.9rem;
min-width: 500px;
max-width: 1500px;
  margin-left: 6%;
  margin-top: 2%;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  text-align : center;
  font-weight: bold;
  font-size: middle;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 10px;
  line-height: 45px;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const Room=styled.div`
border:none;
width: 35%;
min-width:200px;
height:3em;
font-size:1.5em;
`;


const Box=styled.div`
border: none;
display:block;
width: 100%;
min-width: 800px;
`;

const CamBox=styled.div`
border: solid 1px;
height: 70%;
width: 75%;
margin: 5% auto 5% auto;
min-width: 750px;
`;

const ScriptChatBox=styled.div`
border: solid 1px green;
margin: 5% auto 5% auto;
min-height: 320px;
height: 100%;
min-width: 750px;
width: 75%;
display: block;
align-items: center;
justify-content: center;
border-radius: 20px;
box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;