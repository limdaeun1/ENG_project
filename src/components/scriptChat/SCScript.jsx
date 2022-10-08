import styled from "styled-components";
import { useDispatch } from 'react-redux'
import { getTag , getScriptlist } from "../../redux/modules/script";
import { useState } from "react";
import { useSelector } from "react-redux";
import SCScriptlist from "./SCScriptlist";

const SCScript= () => {
   const dispatch= useDispatch();
   const [tags, setTags] = useState([])
   const [people , setPeople ] = useState("")
   const [isNow,setIsNow] = useState(true);  //스크립트 컴포넌트 바꿔서 띄워주는 용도
   const {isLoading, error, scriptlist} = useSelector((state) => state.script);
   
   const Tagmap = async (payload) => {
      try {
        const response = await dispatch(getTag(payload)).unwrap();
        setTags(response.categories)
        setPeople(payload)
      } catch (error) {
        console.log(error);
      }
    };

   const handleNow = ()=>{
      setIsNow(true);
   }
   
   const handleAuc = ()=>{
       setIsNow(false);
   }

   const clickTag = (tag) => {
      const payload = {
         people : people ,
         tag : tag,
      }
      console.log(payload)
      dispatch(getScriptlist(payload))
      handleAuc()
   }

   if (isLoading) {
      return <>
      <ScriptBox>
      <P><p>✔️ 인원별로 선택</p></P>
         <Box>
            <People >2인</People>
            <People >3인</People>
            <People >4인</People>
         </Box>
         <Box2>
         <p>✔️ 태그별로 선택</p>
         <p>로딩중...</p>
         </Box2> 
      </ScriptBox>
            </>;
    }

       return (
      <>
      <ScriptBox>
         {isNow ? <>
         <P><p>✔️ 인원별로 선택</p></P>
         <Box>
            <People onClick = {()=>Tagmap(2)}>2인</People>
            <People onClick = {()=>Tagmap(3)}>3인</People>
            <People onClick = {()=>Tagmap(4)}>4인</People>
         </Box>
         <Box2>
         <p>✔️ 태그별로 선택</p>
         {tags?.map((tag,i) => (
            <Tag onClick={()=>clickTag(tag.split('#')[1])} key={i}>{tag}</Tag>
         ))}
         </Box2> 
         </> 
         :
         <SCScriptlist/> 
         }
      </ScriptBox>
      </>
      );
   };
   
   export default SCScript;

   const ScriptBox=styled.div`
   border: none;
   height: 380px;
   min-width: 360px;
   width: 100%;
   overflow: scroll;
   overflow-x: hidden;
   border-radius: 10px;
   line-height: 1.8;
   background-color: #e2f4e6;
   box-shadow: 10px 10px 10px #e9ecef;
`;

const Box = styled.div`
   width: 100%;
   min-width: 360px;
   height: 65px;
   padding-left:10px;
`

   const Box2 = styled.div`
   margin:-30px 6px 0 6px;
   p{
      font-size: 14px;
      font-weight: 630;
   }
   `
   const People = styled.div`
      border-radius: 20px;
      width: 70px;
      min-width: 50px;
      margin: 19px;
      float:left;
      background-color: #f7f8f0;
      font-weight: 450;
      transition: all 0.5s;
      cursor: pointer;
      &:hover {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 1px, rgb(51, 51, 51) 0px 0px 0px 1.3px;
       }
      margin-top: -5px;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 10px;
   `

   const Tag = styled.div`
      border-radius: 10px;
      width: auto;
      min-width: 30px;
      margin: 5px;
      float:left;
      padding:0 5px 0 5px;
      font-size: 12px;
      transition: all 0.5s;
      cursor: pointer;
      &:hover {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 1px, rgb(51, 51, 51) 0px 0px 0px 1.3px;
      }
      font-weight: 500;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 10px;
      background-color: white;
     
   `

   const P =styled.div`
   p{
      font-size: 14px;
      font-weight: 630;
   }
   `