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
  border: solid;
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
display:flex;
border: solid red;
width: 100%;
min-width: 800px;
`;


const ScriptChatBox=styled.div`
border: solid orange;
margin-left: 60px;
height: 830px;
width: 420px;
margin-top: 30px;
`;

const ScriptContainer=styled.div`
border: solid yellow;
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
border: solid green;
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
  border: solid yellow;
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
  border: solid orange;
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
  border: solid blue;
`;

const ContentBox = styled.div`
  background: white;
  padding: 20px;
  max-width: 1000px;
  min-width: 705px;
  min-height: 500px;
  display: none;
  border: solid purple;
`;