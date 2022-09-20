import { useState } from "react";
import styled from 'styled-components'
import MyfeedBack from "./MyfeedBack";
import StudyTime from "./StudyTime";


const MypageContent = () => {
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
      };

      
  return (
    <>
    <Container>
    <BlocTabsContiner>
            {toggleState === 1 
            ? <AciveTabBox onClick={() => toggleTab(1)}>내 공부 시간</AciveTabBox> 
            :<TabBox onClick={() => toggleTab(1)} >내 공부 시간</TabBox>}

            {toggleState === 2 
            ? <AciveTabBox onClick={() => toggleTab(2)}> 내 피드백</AciveTabBox> 
            :<TabBox onClick={() => toggleTab(2)} >내 피드백</TabBox>}
    </BlocTabsContiner>

           <div style={{flexGrow : "1"}}>
            {toggleState === 1 
            ? <ActiveContentBox > <StudyTime/> </ActiveContentBox>
            :<ContentBox  > <StudyTime/></ContentBox>}
            
            {toggleState === 2 
            ? <ActiveContentBox > <MyfeedBack/></ActiveContentBox>
            :<ContentBox  ><MyfeedBack/></ContentBox>}
          </div>
    </Container>
    </>
  )
}

export default MypageContent

const Container = styled.div`
    width: 100%;
    width: 800px;
    margin: 30px auto;
    height: auto;
    margin-bottom: 100px;
`

const BlocTabsContiner = styled.div`
  display: flex;
  border-bottom: 1px solid #dee2e6;
  max-width: 1000px;
  min-width: 705px;
`;

const BannerBox = styled.img`
  height: 400px;
  width: 150px;
  background-color: #b2f2bb;
  margin-left: 20px;
`


const TabBox = styled.div`
  padding: 8px;
  text-align: center;
  width: 100px;
  background: #b2f2bb;
  cursor: pointer;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.274); */
  box-sizing: content-box;
  position: relative;
  outline: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-right: 2px;
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
`;

const ContentBox = styled.div`
  background: white;
  padding: 20px;
  max-width: 1000px;
  min-width: 705px;
  min-height: 500px;
  display: none;
`;

const ActiveContentBox = styled.div`
  display: block;
`;