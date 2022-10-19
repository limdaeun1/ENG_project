import styled from "styled-components";
import CSChat from "../camstudyChat/CSChat";
import CSCamSet from "../camstudyChat/CSCamSet";
import Timer from "./Timer";
import { useParams , useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { exitRoom } from "../../redux/modules/chatroom";
import { useNavigate } from "react-router-dom";

const CSLayout = () => {
  const {id} = useParams();
  const {state} = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {    
  return () => {
    onbeforeunload();
  };
  }, []);

  const onbeforeunload = () => {
    try {
      dispatch(exitRoom(id))
    } catch (e) {
      console.log("연결 구독 해체 에러", e);
    }
  }

    return (
      <>
      <TopBar>
        <ButOut onClick={()=>navigate("/list")}>나가기</ButOut>
          <InfoBar>
            <Room>{state.roomName}</Room>
            <Timer id={id}/>
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
  width: 100vw;
  height: 5vh;
  min-height: 50px;
  display:flex;
  font-size: 10px;
  align-items: center;
`;



const ButOut=styled.div`
border: none;
  background: #40c057;
  border-radius: 20px;
  width: 10vw;
  min-width: 100px;
  height: 6vh;
  text-align : center;
  font-weight: bold;
  font-size: middle;
  display: inline-block;
  font-size: 1.5em;
  line-height: 6vh;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  font-family: "IBM Plex Sans KR", sans-serif;
  &:hover {
    background-color: #89f6ab;
  }
`;

const InfoBar=styled.div`
border: none;
height: 6vh;
  background: #D3F9D8;
  border-radius: 20px;
width: 90vw;
min-width: 1100px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  text-align : center;
  font-weight: bold;
  font-size: middle;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 10px;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const Room=styled.div`
border:none;
width: 35%;
min-width:200px;
font-size:1.5em;
`;


const Box=styled.div`
display:flex;
flex-direction: column;
border: none;
/* width: 95%; */
min-width: 1200px;
width: 90vw;
min-height: 600px;
height: 90vh;
margin: auto;
margin-top: 1%;
`;

const CamBox=styled.div`
border: none;
background: #ebfbee;
border-radius: 20px;
height: 62vh;
min-height: 400px;
width: 90vw;
margin:auto;
min-width: 1000px;
box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;

const ScriptChatBox=styled.div`
height: 28vh;
margin:auto;
width: 90vw;
min-width: 1000px;
/* width: 75%; */
display: block;
align-items: center;
justify-content: center;
border-radius: 20px;
`;