import styled from "styled-components";
import { useState , useEffect} from "react";
import SCCamSet from "../scriptChat/SCCamSet";
import SCTranslate from "../scriptChat/SCTranslate";
import SCChat from "../scriptChat/SCChat";
import SCScript from "../scriptChat/SCScript";
import SCWhiteBoard from "./SCMemo";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Timer from "../camstudyChat/Timer";
import { useDispatch } from "react-redux";
import { exitRoom } from "../../redux/modules/chatroom";
import { useNavigate } from "react-router-dom";


const SCLayout = () => {
  const [toggleState, setToggleState] = useState(1);
  const {state} = useLocation();
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleTab = (index) => {
      setToggleState(index);
    };
  
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

          <SCCamSet id={id}/>  

<Container>
{/* <div> */}

          <ScriptChatBox>

            {/* <ScriptContainer> */}
              <TabContainer>
            {toggleState === 1
            ? <ActiveTabBox onClick={() => toggleTab(1)}>Script</ActiveTabBox>
            :<TabBox onClick={() => toggleTab(1)} >Script</TabBox>}

            {toggleState === 2
            ? <ActiveTabBox onClick={() => toggleTab(2)}>Memo</ActiveTabBox>
            :<TabBox onClick={() => toggleTab(2)} >Memo</TabBox>}      

             {toggleState === 3
            ? <ActiveTabBox onClick={() => toggleTab(3)}>Translate</ActiveTabBox>
            :<TabBox onClick={() => toggleTab(3)} >Translate</TabBox>} 
                   
            </TabContainer>

            <div style={{flexGrow : "1"}}>

            {toggleState === 1 
            ? <ActiveContentBox > <SCScript/> </ActiveContentBox>
            :<ContentBox  > <SCScript/></ContentBox>}
            
            {toggleState === 2 
            ? <ActiveContentBox > <SCWhiteBoard id={id}/></ActiveContentBox>
            :<ContentBox  ><SCWhiteBoard id={id}/></ContentBox>}
            
            
            {toggleState === 3 
            ? <ActiveContentBox ><SCTranslate/></ActiveContentBox>
            :<ContentBox  ><SCTranslate/></ContentBox>}
            
          </div>

            {/* </ScriptContainer> */}


            
          </ScriptChatBox>
          <div >
            <SCChat/>
          </div>

{/* </div> */}
        </Container>
        </Box>

      </>
    );
  };
  
  export default SCLayout;

const TopBar=styled.div`
  border: none;
  width: 100vw;
  height: 5vh;
  min-height: 50px;
  display:flex;
  font-size: 10px;
  align-items: center;
`;
const Box=styled.div`
display:flex;
border: none;
min-width: 1200px;
width: 95vw;
min-height: 600px;
height: 90vh;
margin: auto;
margin-top: 1%;
`;

  const Container=styled.div`
  display: block;
  display: flex;
  flex-direction: column;
  width: 25vw;
  margin-top: 1.5%;
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
/* height:3em; */
font-size:1.5em;
`;



const ScriptChatBox=styled.div`
border: none;
min-height: 300px;
height: 40vh;
width: 25vw;
min-width: 320px;
display: flex;
  flex-direction: column;
`;

// const ScriptContainer=styled.div`
// border: none;
// height: 40vh;
// width: 100%;
// border: 3px solid yellow;
// /* margin-top: 30px; */
// `;

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
  background: linear-gradient(to right, #69db7c, #38d9a9);
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: small;
  border: none;
  color: white;
`;

const TabBox = styled.div`
  padding: 4px;
  text-align: center;
  min-width: 95px;
  width: 6vw;
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
  color:#495057;
`;

const ActiveContentBox = styled.div`
  text-align: center;
  width: 89%;
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 1%;
  border: none;
`;

const ContentBox = styled.div`
  background: white;
  padding: 4%;
  text-align: center;
  height: 20vh;
  width: 89%;
  box-sizing: content-box;
  position: relative;
  outline: none;
  margin-right: 1%;
  display: none;
`;