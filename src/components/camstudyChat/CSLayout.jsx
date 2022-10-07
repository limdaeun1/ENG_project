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
  width: 100%;
  min-width: 800px;
  display:flex;
  font-size: 10px;
  margin-top: -10px;
`;

  const ButOut=styled.div`
  border: none;
  background: #40c057;
  border-radius: 20px;
  width: 6%;
  min-width: 80px;
  max-width: 150px;
  height: 2.6em;
  margin-left: 6%;
  margin-top: 2%;
  text-align : center;
  font-weight: bold;
  font-size: middle;
  align-items: center;
  justify-content:space-between;
  display: inline-block;
  font-size: 1.5em;
  line-height: 40px;
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
  height: 2.3rem;
  min-width: 500px;
  max-width: 1500px;
  margin-left: 3%;
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
height: 100%;
min-width: 800px;
/* margin-top: -40px; */
`;

const CamBox=styled.div`
border: none;
background: #ebfbee;
border-radius: 20px;
height: auto;
width: 75%;
margin: 10px auto 0px auto;
min-width: 750px;
box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;

const ScriptChatBox=styled.div`
/* border: solid 1px green; */
margin: 5px auto 5px auto;
min-height: 40%;
/* min-height: 400px; */
/* height: 50%; */
min-width: 750px;
width: 75%;
display: block;
align-items: center;
justify-content: center;
border-radius: 20px;
/* margin-top:-67px; */
/* box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%); */
`;