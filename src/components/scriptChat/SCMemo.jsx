import { useDispatch } from "react-redux";
import styled from "styled-components";
import { postMemo , getMemo } from "../../redux/modules/chatroom";
import { useState } from "react";

const SCWhiteBoard= (id) => {
  const dispatch = useDispatch();
  const [memo, setMemo] = useState("");

  const memodata = {
    contents : memo,
    roomId : id.id
  }
  const SaveMemo = () => {
    dispatch(postMemo(memodata))
  }

  const GetMemo = async () => {
    try {
      const response = await dispatch(getMemo(id.id)).unwrap();
      console.log(response.data.data)
      if(response.data.data !== null) {
      setMemo(response.data.data) }
      else {
        window.alert("해당 방의 저장된 메모가 없습니다!")
      }
    } catch (error) {
      console.log(error);
    }
  };

    return (
      <Container>
      <Div>
        <Textbox 
        placeholder="여기에 입력하세요"
        value={memo}
        onChange={(e)=>setMemo(e.target.value)}>
        </Textbox>      

      </Div>
        <Btn onClick={SaveMemo}>저장하기</Btn>
      <Btn onClick={GetMemo}>불러오기</Btn>
      </Container>
      );
   };
   
   export default SCWhiteBoard;
   const Container = styled.div`
    height: 33vh;
    min-height: 230px;
    width: 25vw;
    min-width: 320px;
   `

   const Div = styled.div`
    height: 27vh;
    min-height: 230px;
    min-width: 300px;
    width: 100%;
    border: none;
    border-radius: 8px;
    box-shadow: 10px 10px 10px #e9ecef;
   `

   const Textbox = styled.textarea`
    width: 100%;
    height: 27vh;
    min-height: 225px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: #d0f38b;
    border-radius: 6px;
  }
   
     resize: none;
    border:none;
    :focus {
      outline: none;
    }
    background-color: #e2f4e6;
    border-radius: 10px;
   `

   const Btn = styled.button`
      font-weight: 600;
       min-height: 20px;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.5s;
      color: #fff;
      border: none;
      font-size: 11px;
      background-color: #000000;
      &:hover {
        background-color: #666666;
      }
      float: right;
      height: 3vh;
      width: 60px;
      margin-left:0.5vw;
   `