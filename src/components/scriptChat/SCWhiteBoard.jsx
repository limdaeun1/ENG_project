import { useDispatch } from "react-redux";
import styled from "styled-components";
import { postMemo } from "../../redux/modules/chatroom";
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

    return (
      <>
      <Div>
        <Textbox 
        placeholder="여기에 입력하세요"
        value={memo}
        onChange={(e)=>setMemo(e.target.value)}>
          dd
        </Textbox>
      </Div>
      <Btn onClick={SaveMemo}>저장하기</Btn>
      </>
      );
   };
   
   export default SCWhiteBoard;

   const Div = styled.div`
    width: 400px;
    height: 400px;
    margin-left: 16px;
    overflow: scroll;
    overflow-x: hidden;
   `

   const Textbox = styled.textarea`
    width: 100%;
    height: 380px;
    border:none;
    :focus {
      outline: none;
    }
    background-color: #e2f4e6;
    border-radius: 10px;
   `

   const Btn = styled.button`
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.5s;
      color: #fff;
      border: 0;
      font-size: 11px;
      padding: 6px;
      background-color: #000000;
      &:hover {
        background-color: #666666;
      }
      margin-left: 190px;
      width: 60px;
   `