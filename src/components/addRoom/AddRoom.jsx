import React from "react";
import styled from "styled-components";
import { useState } from "react";


const AddRoom = () => {
  const [category, setCategory] = useState("");
  const [memberCount, setMemberCount] = useState("");

  const [type, setType] = useState(false)

  const onChangeFalse = () => {
    setType(false)
  }

  const onChangeTrue = () => {
    setType(true)
  }

  return (
    <>
      <Container>
        {/* <form style={{backgroundColor:"blue",width:"500px"}}> */}
          {/* <div style={{display:"flex"}}>
            <div style={{dislpaly:"flex", flexDirection:"column"}}> */}
           <Inputcontainer>
            <NameBox><p>제목</p></NameBox>
            <InputBox placeholder="Room Name"/>
          </Inputcontainer>
          <Inputcontainer>
            <NameBox><p>카테고리</p></NameBox>
            <SelectBox
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {/* <option value="" selected disabled hidden>
                카테고리를 선택하세요
              </option> */}
              <option>스크립트</option>
              <option>생활영어</option>
              <option>시험대비</option>
              <option>캠스터디</option>
            </SelectBox>
          </Inputcontainer>
          <Inputcontainer>
            <NameBox><p>참가인원</p></NameBox>
            <SelectBox
              value={memberCount}
              onChange={(e) => setMemberCount(e.target.value)}
            >
              {/* <option value="" selected disabled hidden>
                인원수를 선택하세요
              </option> */}
              <option>2</option>
              <option>4</option>
              <option>6</option>
            </SelectBox>
          </Inputcontainer>
          <Inputcontainer>
          <NameBox><p>비밀번호</p></NameBox>
          {type === false 
          
          ?
          <div style={{display:"flex",marginLeft:"20px", padding:"5px", alignItems:"center"}}>
           <div>일반방 <input value="일반방" type="radio" name="type" checked="checked" onClick={()=>{onChangeFalse()}}/></div>
           <div>비밀방 설정 <input value="비밀방 설정" type="radio" name="type" onClick={()=>{onChangeTrue()}}/></div>
          </div> 
          :
          <div style={{display:"flex",marginLeft:"20px", padding:"5px",alignItems:"center"}}>
           <div>일반방 <input value="일반방" type="radio" name="type"  onClick={()=>{onChangeFalse()}}/></div>
           <div>비밀방 설정 <input value="비밀방 설정" type="radio" name="type" onClick={()=>{onChangeTrue()}}/></div>
           <PasswordBox type = "password" placeholder="4자리" />
          </div> }
          

          </Inputcontainer>
          {/* </div>
          <div>
            채팅박스
          </div>
          </div> */}
          



        {/* </form>           */}
        <BtnContainer>
            <AddRoomBtn>방만들기</AddRoomBtn>
          </BtnContainer>
      </Container>
    </>
  );
};

export default AddRoom;

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
  align-items: center;
`;
const Inputcontainer = styled.div`
  display: flex;
  width: 400px;
  height: 40px;
  margin: 30px;
  align-items:center;
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
  outline:none;
  @media screen and (max-width: 700px) {
    width: 77%;
  }
  &:focus {
    border: solid 1px #8ce99a;
  }
`;

const PasswordBox = styled.input`
  /* background-color: #40c057; */
  width: 70px;
  height: 25px;
  border-radius: 5px;
  text-align: center;
  margin-left: 20px;
  border:none;
  outline:none;
  transition: border-color 300ms ease-in-out;
  outline: none;
  @media screen and (max-width: 700px) {
    width: 77%;
  }
  &:focus {
    border: solid 1px #8ce99a;
  }
`;


const BtnContainer = styled.div`
  margin-top: auto;
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
const SelectBox = styled.select`
  width: 300px;
  height: 30px;
  border-radius: 5px;
  margin-left: 20px;
  outline: none;
  border:none;
  @media screen and (max-width: 700px) {
    width: 77%;
  }
  &:focus {
    border: solid 1px #8ce99a;
  }
  
`;
