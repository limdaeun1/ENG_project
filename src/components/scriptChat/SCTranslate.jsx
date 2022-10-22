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
      const str = response.split('\\n').join('<br>').replace(/(<br>|<br\/>|<br \/>)/g, '\r\n'); 
      setTranslates(str)
    } catch (error) {
      console.log(error);
    }
  };
  
    return (
     <Container>
      <Div>

        <Textbox 
        placeholder="번역할 내용을 입력하세요"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
            name="message">
        </Textbox>
        <Btn onClick={Translatemap}>번역하기</Btn>

        <Translatebox>
        {translates === "" ? <Box></Box>: <Box>{translates}</Box>}
        {/* <Box>{testmessage}</Box> */}
        </Translatebox>

      </Div>
      </Container>
      
      );
   };
   
   export default SCTranslate;
   const Container = styled.div`
   height: 35vh;
   min-height: 250px;
   width: 25vw;
    min-width: 320px;
  `
   const Div = styled.div`
    height: 35vh;
    min-height: 250px;
    min-width: 300px;
    width: 100%;
    border: none;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
   `

   const Textbox = styled.textarea`
    width: 100%;
    height: 15vh;
    min-height: 110px;
     resize: none;
    border: none;
    box-shadow: 5px 5px 5px #e9ecef;
    text-transform:capitalize ;
    :focus {
      outline: none;
    }
    background-color: #e2f4e6;
    border-radius: 10px;
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

const Translatebox = styled.div`
width: 100%;
height: 15vh;
min-height: 110px;
 resize: none;
border: none;
box-shadow: 5px 5px 5px #e9ecef;
:focus {
  outline: none;
}
background-color: #e2f4e6;
border-radius: 10px;
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

const Box = styled.div`
border: none;
width: 99%;
height: 15vh;
min-height: 100px;
float: left;
white-space:pre-line ;
word-break: keep-all;
text-align:left;
text-indent:10px;
`

   const Btn = styled.button`
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.5s;
      color: #fff;
      border: none;
      font-size: 11px;
      background-color: #40c057;
      &:hover {
        background-color: #89f6ab;
      };
      margin:1% 0 1% auto;
      width: 60px;
   `