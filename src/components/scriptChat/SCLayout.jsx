import styled from "styled-components";
import { useState } from "react";
import SCCamSet from "../scriptChat/SCCamSet";
import SCChat from "../scriptChat/SCChat";
import SCScript from "../scriptChat/SCScript";
import SCWhiteBoard from "./SCMemo";
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
      {/* <Container> */}

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
        {/* </Container> */}
      </>
    );
  };
  
  export default SCLayout;

//   const Container=styled.div`
//   width: 100%;
//   width: 1850px;
//   height: 950px;
//   margin: 20px auto;
//   border: solid;
// `;

  const TopBar=styled.div`
  border: none;
  width: 100%;
  min-width: 1200px;
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
display:flex;
border: none;
width: 100%;
min-width: 1200px;
`;


const ScriptChatBox=styled.div`
border: none;
height: 90%;
width: 30%;
min-width: 395px;
margin: 30px;
`;

const ScriptContainer=styled.div`
border: none;
height: 480px;
width: 100%;
margin-top: 30px;
`;

const TabContainer = styled.div`
  display: flex;
  width: 84%;
  height: 30px;
margin-top: 8px;
margin-left: 8%;
border:none;
`;

const ActiveTabBox = styled.div`
  padding: 4px;
  text-align: center;
  width: 23%;
  min-width: 55px;
  background: #51cf66;
  cursor: pointer;
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 0.2%;
  font-size: small;
  border: none;
`;

const TabBox = styled.div`
  padding: 4px;
  text-align: center;
  width: 23%;
  min-width: 55px;
  background: #b2f2bb;
  cursor: pointer;
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 0.2%;
  font-size: small;
  border: none;
`;

const ActiveContentBox = styled.div`
  padding: 4%;
  text-align: center;
  width: 89%;
  cursor: pointer;
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
  width: 89%;
  cursor: pointer;
  box-sizing: content-box;
  position: relative;
  outline: none;
  margin-right: 1%;
  display: none;
  /* border: solid 1px purple; */
`;