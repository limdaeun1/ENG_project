import { useState } from "react";
import styled from 'styled-components'
import MyMemo from "./MyMemo";
import StudyTime from "./StudyTime";
import Nonmypage from "./Nonmypage";

const MypageContent = () => {
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
      };

      
  return (
    <>
    <Bigcontainer>
    <Container>
    <BlocTabsContiner>
            {toggleState === 1 
            ? <AciveTabBox onClick={() => toggleTab(1)}>내 공부 시간</AciveTabBox> 
            :<TabBox onClick={() => toggleTab(1)} >내 공부 시간</TabBox>}

            {toggleState === 2 
            ? <AciveTabBox onClick={() => toggleTab(2)}> 내 메모</AciveTabBox> 
            :<TabBox onClick={() => toggleTab(2)} >내 메모</TabBox>}
    </BlocTabsContiner>

           <div style={{flexGrow : "1"}}>
            {toggleState === 1 
            ? <ActiveContentBox > <StudyTime/> </ActiveContentBox>
            :<ContentBox  > <StudyTime/> </ContentBox>}
            
            {toggleState === 2 
            ? <ActiveContentBox > <MyMemo/></ActiveContentBox>
            :<ContentBox  ><MyMemo/></ContentBox>}
          </div>
    </Container>
    </Bigcontainer>
    </>
  )
}

export default MypageContent

const Bigcontainer = styled.section`
border: none;
width: 100%;
align-items: center;
justify-content: center;
`;

const Container = styled.div`
border: none;
width: 50%;
min-width: 490px;
height: auto;
align-items: center;
justify-content: center;
place-content:center ;
margin:5% auto 0% auto;
`;

const BlocTabsContiner = styled.div`
border: none;
min-width: 485px;
align-items: center;
display: flex;
border-bottom: 1px solid #dee2e6;
width:100%;
`;

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
&:hover {
transform: scale(0.9);
transition: all 0.2s linear;
color: white;
}
`;

const AciveTabBox = styled.div`
border:none;
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
&:hover {
transform: scale(0.9);
transition: all 0.2s linear;
color: white;
}
`;

const ContentBox = styled.div`
border: none;
background: white;
padding: 10%;
display: none;
`;

const ActiveContentBox = styled.div`
width: 100%;
min-width: 485px;
border: none;
align-items: center;
justify-content: center;
display: inline-block;
`;