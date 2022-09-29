import styled from "styled-components";
import { useState } from "react";
import SCCamSet from "../scriptChat/SCCamSet";
import SCChat from "../scriptChat/SCChat";
import SCScript from "../scriptChat/SCScript";
import SCWhiteBoard from "../scriptChat/SCWhiteBoard";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Timer from "../camstudyChat/Timer";




const SCLayout = () => {
  const {state} = useLocation();
  const [toggleState, setToggleState] = useState(1);
  const {id} = useParams();
  const toggleTab = (index) => {
      setToggleState(index);
    };
  
    return (
      <>
      <Container>

      <TopBar>
        <ButOut>나가기</ButOut>
          <InfoBar>
            <Room>{state.roomName}</Room>
            <Timer id={state.id}/>
            </InfoBar>
        </TopBar>


        <Box>

          <SCCamSet id={id}/>  

          <ScriptChatBox>

            <ScriptContainer>
              <TabContainer>
            {toggleState === 1
            ? <ActiveTabBox onClick={() => toggleTab(1)}>Script</ActiveTabBox>
            :<TabBox onClick={() => toggleTab(1)} >Script</TabBox>}

            {toggleState === 2
            ? <ActiveTabBox onClick={() => toggleTab(2)}>Memo</ActiveTabBox>
            :<TabBox onClick={() => toggleTab(2)} >Memo</TabBox>}          
            </TabContainer>

            <div style={{flexGrow : "1"}}>

            {toggleState === 1 
            ? <ActiveContentBox > <SCScript/> </ActiveContentBox>
            :<ContentBox  > <SCScript/></ContentBox>}
            
            {toggleState === 2 
            ? <ActiveContentBox > <SCWhiteBoard id={state.id}/></ActiveContentBox>
            :<ContentBox  ><SCWhiteBoard id={state.id}/></ContentBox>}
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

const ActiveTabBox = styled.div`
  padding: 8px;
  text-align: center;
  width: 90px;
  background: #51cf66;
  cursor: pointer;
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 2px;
  font-size: small;
`;

const TabBox = styled.div`
  padding: 8px;
  text-align: center;
  width: 90px;
  background: #b2f2bb;
  cursor: pointer;
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 2px;
  font-size: small;
`;

const ActiveContentBox = styled.div`
  padding: 8px;
  text-align: center;
  width: 100px;
  cursor: pointer;
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 2px;
`;

const ContentBox = styled.div`
  background: white;
  padding: 20px;
  max-width: 1000px;
  min-width: 705px;
  min-height: 500px;
  display: none;
`;