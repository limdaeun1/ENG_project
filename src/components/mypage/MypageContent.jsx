import { useState } from "react";
import styled from 'styled-components'
import MyfeedBack from "./MyfeedBack";
import "./MypageContent.css";
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
            <button
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              내 공부 시간
            </button>
            <button
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              내 피드백
            </button>
          </BlocTabsContiner>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "content active-content" : "content"
              }>
                <StudyTime/>
                <StudyTime/>
            </div>
            
            <div
              className={
                toggleState === 2 ? "content active-content" : "content"
              }>
                <MyfeedBack/>
            </div>
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
