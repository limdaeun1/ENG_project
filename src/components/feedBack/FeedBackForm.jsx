import React from 'react';
import styled from 'styled-components';

const FeedBackForm = () => {
  return (
    <div>
      <Inputcontainer>
            <NameBox><p>UserID1</p></NameBox>
            <InputBox placeholder="피드백을 남겨주세요" />
          </Inputcontainer>

          <Inputcontainer>
            <NameBox><p>UserID2</p></NameBox>
            <InputBox placeholder="피드백을 남겨주세요" />
          </Inputcontainer>

          <Inputcontainer>
            <NameBox><p>UserID3</p></NameBox>
            <InputBox placeholder="피드백을 남겨주세요"/>
          </Inputcontainer>

          <Inputcontainer>
            <NameBox><p>UserID4</p></NameBox>
            <InputBox placeholder="피드백을 남겨주세요"/>
          </Inputcontainer>

          <Inputcontainer>
            <NameBox><p>UserID5</p></NameBox>
            <InputBox placeholder="피드백을 남겨주세요"/>
          </Inputcontainer>
    </div>
  )
}

export default FeedBackForm;

const Inputcontainer = styled.div`
  display: flex;
  width: 400px;
  height: 40px;
  margin: 30px;
`;

const NameBox = styled.div`
  background-color: #69db7c;
  color: white;
  width: 80px;
  height: 30px;
  border-radius: 5px;
  text-align: center;
  line-height: 0px;
`;

const InputBox = styled.input`
  /* background-color: #40c057; */
  width: 300px;
  height: 25px;
  border-radius: 5px;
  text-align: center;
  margin-left: 20px;
  border:none;
  outline:none
`;
