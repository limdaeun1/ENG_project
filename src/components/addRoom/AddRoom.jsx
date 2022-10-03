import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createRoom } from "../../redux/modules/chatroom";
import { useNavigate } from "react-router-dom";


const AddRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [studyName, setStudyName] = useState("")
  const [category, setCategory] = useState("");
  const [memberCount, setMemberCount] = useState("");
  const [type, setType] = useState(false)
  const [password, setPassWord] = useState("");

  const roomData = {
      roomName : studyName,  
      category : category ,
      maxEnterMember : memberCount,
      lock : type,
      roomPw :password ,
  }

  const onChangeFalse = () => {
    setType(false)
  }

  const onChangeTrue = () => {
    setType(true)
  }

  //방 만든 후 생성한 방으로 바로 입장
  const createRommhandle = async () => {
    try {
      const response = await dispatch(createRoom(roomData)).unwrap();
      if(response.data.data.roomId !== null) {
        if(response.data.data.category === "캠스터디") {
        navigate("/camchat/" + response.data.data.roomId ,{state:response.data.data})}
        else {
        navigate("/scriptchat/" + response.data.data.roomId ,{state:response.data.data})
        }
      }
    } catch (error) {
      window.alert("방 만들기에 실패하였습니다!");
    }
  };

  return (
    <>
      <Container>
        {/* <form style={{backgroundColor:"blue",width:"500px"}}> */}
          {/* <div style={{display:"flex"}}>
            <div style={{dislpaly:"flex", flexDirection:"column"}}> */}
           <Inputcontainer>
            <NameBox><p>방제목</p></NameBox>
            <InputBox placeholder="Study Name" onChange={(e)=>setStudyName(e.target.value)}/>
          </Inputcontainer>
          <Inputcontainer>
            <NameBox><p>카테고리</p></NameBox>
            <SelectBox
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled hidden>
                카테고리를 선택하세요
              </option>
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
              <option value="" disabled hidden>
                인원수를 선택하세요
              </option>
              <option>2</option>
              <option>4</option>
              <option>6</option>
            </SelectBox>
          </Inputcontainer>
          <Inputcontainer>
          <NameBox><p>방설정</p></NameBox>
          {type === false 
          
          ?
          <div style={{display:"flex",marginLeft:"20px", padding:"5px", alignItems:"center"}}>
           <div>일반방 <input value="일반방" type="radio" name="type" checked="checked" onChange={()=>{onChangeFalse()}}/></div>
           <div>비밀방<input value="비밀방" type="radio" name="type" onChange={()=>{onChangeTrue()}}/></div>
           
          </div> 
          :
          <div style={{display:"flex",marginLeft:"20px", padding:"5px",alignItems:"center"}}>
           <div>일반방 <input value="일반방" type="radio" name="type"  onChange={()=>{onChangeFalse()}}/></div>
           <div>비밀방 <input value="비밀방" type="radio" name="type" onChange={()=>{onChangeTrue()}}/></div>
           <PasswordBox 
              onChange={(e) => setPassWord(e.target.value)} type = "password" placeholder="4자리" id = "password"/>
          </div> }
          

          </Inputcontainer>
          {/* </div>
          <div>
            채팅박스
          </div>
          </div> */}
          



        {/* </form>           */}
        <BtnContainer>
            <AddRoomBtn onClick={createRommhandle}>방만들기</AddRoomBtn>
          </BtnContainer>
      </Container>
    </>
  );
};

export default AddRoom;

const Container = styled.div`
border: none;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  height: 500px;
  margin: 50px auto 100px auto;
  width:90%;
  min-width: 100px;
  max-width: 1000px;
  background-color: #e9ecef;
  align-items: center;
`;

const Inputcontainer = styled.div`
  display: flex;
  width: 400px;
  height: 40px;
  margin: 30px auto 30px auto;
  align-items:center;
  border: none;
`;

const NameBox = styled.div`
  background-color: #69db7c;
  color: white;
  width: 80px;
  height: 30px;
  border-radius: 5px;
  text-align: center;
  line-height: 0px;
  font-weight: 600;
`;

const InputBox = styled.input`
  width: 300px;
  height: 25px;
  border-radius: 5px;
  text-align: center;
  margin: 0 auto 0 20px;
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
  width: 90px;
  height: 25px;
  border-radius: 5px;
  text-align: center;
  margin: 0 auto 0 20px;
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
  width: 30%;
  text-align: center;
  border: none;
`;

const AddRoomBtn = styled.button`
  margin: 0 auto 10px auto;
  padding: 10px;
  text-align: center;
  font-size: 15px;
  color: white;
  font-weight: 600;
  width: 100px;
  background: #fcc419;
  outline: none;
  border-radius: 10px;
  border:none;
`;

const SelectBox = styled.select`
  width: 300px;
  height: 30px;
  border-radius: 5px;
  margin: 0 auto 0 20px;
  outline: none;
  border:none;
  @media screen and (max-width: 700px) {
    width: 77%;
  }
  &:focus {
    border: solid 1px #8ce99a;
  }
  
`;
