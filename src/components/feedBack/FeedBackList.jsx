import React from "react";
import FeedBackForm from "./FeedBackForm";
import styled from "styled-components";

const FeedBackList = () => {
  return (
    <div>
      <Container>
        <FeedBackForm />
        <BtnContainer>
          <AddRoomBtn>피드백 제출</AddRoomBtn>
        </BtnContainer>
      </Container>
    </div>
  );
};

export default FeedBackList;
const Container = styled.div`
  /* width: 100%;F
  width: 1040px; */

  display: flex;
  flex-direction: column;
  border-radius: 10px;
  height: 500px;
  margin: auto;
  margin-top: 30px;
  max-width: 1000px;
  min-width: 705px;
  background-color: #e9ecef;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`;

const BtnContainer = styled.div`
  max-width: 1000px;
  min-width: 705px;
  text-align: center;
`;

const AddRoomBtn = styled.button`
  margin-bottom: 10px;
  padding: 10px;
  text-align: center;
  font-size: 15px;
  color: white;
  font-weight: 600;
  width: 100px;
  background: #fcc419;
  /* position: relative; */
  outline: none;
  border-radius: 10px;
`;
