import { useDispatch } from "react-redux";
import styled from "styled-components";
import { postMemo , getMemo } from "../../redux/modules/chatroom";
import { useState } from "react";

const CSMemo = (id) => {
  const dispatch = useDispatch();
  const [memo, setMemo] = useState("");

  const memodata = {
    contents : memo,
    roomId : id.id.id
  }
  const SaveMemo = () => {
    dispatch(postMemo(memodata))
  }

  const GetMemo = async () => {
    try {
      const response = await dispatch(getMemo(id.id.id)).unwrap();
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
      <>
      <Div>
        <Textbox 
        placeholder="여기에 입력하세요"
        value={memo}
        onChange={(e)=>setMemo(e.target.value)}>
        </Textbox>
      </Div>
      <Btn onClick={SaveMemo}>저장하기</Btn>
      <Btn onClick={GetMemo}>불러오기</Btn>
      </>
      );
   };
   
   export default CSMemo;

   const Div = styled.div`
   `

   const Textbox = styled.textarea`
   width: 100%;
    height: 250px;
    border-radius: 5px;
    background-color: #f4fce3;
    margin-left: 5px;
    resize: none;
    border:none;
    :focus {
      outline: none;
    }
   `

   const Btn = styled.button`
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.5s;
      color: #fff;
      border: none;
      font-size: 11px;
      padding: 6px;
      background-color: #000000;
      &:hover {
        background-color: #666666;
      }
      float: right;
      /* margin-top:10px;
      margin-right:2%; */
      width: 60px;
      margin: 4px;
   `