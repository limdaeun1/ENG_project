import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { postTranslate, getTranslate } from "../../redux/modules/translate";
import { useState, useEffect } from "react";

const SCTranslate= (id) => {
const dispatch = useDispatch();
const [message, setMessage] = useState("");
const [translates, setTranslates] = useState("");


const messagedata = {
    message : message,
  }


  const Translatemap = async (payload) => {
    try {
      const response = await dispatch(postTranslate(messagedata)).unwrap();
      console.log(response)
      setTranslates(response)
    //   console.log(translates)
    //   setTranslates(response.categories)
    //   setPeople(payload)
    } catch (error) {
      console.log(error);
    }
  };
  console.log(translates)

    return (
      <>
      <Div>

        <Textbox 
        placeholder="번역할 내용을 입력하세요"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
            name="message">
        </Textbox>
        <Btn onClick={Translatemap}>번역하기</Btn>

        <div>
        {translates === "" ? <p>값이 없습니다</p>: <p>{translates}</p>}
        </div>

      </Div>
      
      </>
      );
   };
   
   export default SCTranslate;

   const Div = styled.div`
    height: 370px;
    min-width: 360px;
    width: 100%;
    overflow: scroll;
    overflow-x: hidden;
    border: none;
    border-radius: 8px;
    box-shadow: 10px 10px 10px #e9ecef;
   `

   const Textbox = styled.textarea`
    width: 100%;
    height: 155px;
     resize: none;
    border:solid 1px red;
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
      border: none;
      font-size: 11px;
      padding: 6px;
      background-color: #40c057;
      &:hover {
        background-color: #89f6ab;
      }
      float: right;
      /* margin-top:10px;
      margin-right:2%; */
      width: 60px;
      margin-bottom: 10px;
      margin-top: 10px;
   `