import { useDispatch } from "react-redux";
import styled from "styled-components";
import { postMemo , getMemo } from "../../redux/modules/chatroom";
import { useState } from "react";
import Swal from "sweetalert2";

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
        Swal.fire({
          title: '해당 방의 저장된 메모가 없습니다!', 
          icon: 'warning', 
        });
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
   width: 40vw;
   min-width: 360px;
    height: 22vh;
    min-height: 125px;
    border-radius: 5px;
    background-color: #f4fce3;
    margin-left: 5px;
    resize: none;
    border:none;
    :focus {
      outline: none;
    }
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
   `

   const Btn = styled.button`
      font-weight: 600;
      height: 3vh;
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
      width: 60px;
      margin-left:0.5vw;
   `