import React from 'react'
import styled from 'styled-components'
import { useState } from "react";
import { useSelector } from "react-redux";


const SCScriptlist = () => {
  const {isLoading, scriptlist2} = useSelector((state) => state.script);
  const [isNow2,setIsNow2] = useState(true);
  const [story,setStory] = useState("");

 
 const handleAuc = (i)=>{
     setIsNow2(false);
     setStory(scriptlist2.scriptResponseDto[i].story)
 }
  if (isLoading) {
    return <>
     <Box>
      로딩중 입니다..
     </Box>
    </>}

  return (
    <Box>
      {isNow2 ? <> 
       {scriptlist2.scriptResponseDto.map((tag,i) => (
        <Listbox onClick = {()=>handleAuc(i)} key={i}>
           <p>{tag.categories}</p>
        </Listbox> ))} </>  
        :
        <>
        <Box2>
        <P>{story}</P>
        </Box2>
     </>}
    </Box>
  )
}

export default SCScriptlist

const Box = styled.div`
width: 100%;
min-width: 360px;
height: 65px;
padding-left:10px;
padding-top:30px;
`

const Listbox = styled.div`
    background-color: white;
    width: 80%;
    min-width: 260px;
    margin-left: 30px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 10px;
    transition: all 0.5s;
    &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 1px, rgb(51, 51, 51) 0px 0px 0px 1.7px;
    }
    border-radius: 10px;
    margin-top: 10px;
    p{
      font-size: 12px;
      font-weight: 600;
    }
`
const P = styled.p`
  font-size:14px;
  white-space:pre-wrap;
  padding-right: 10px;
  text-align: left;
  border-radius: 10px;
  margin-top: -10px;
  margin-right: 23px;
  font-weight: 600;
`

const Box2 = styled.div`
  padding-left: 5px;
`