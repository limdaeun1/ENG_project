import styled from "styled-components";

const SCScript= () => {

   const random = "#" + Math.round(Math.random()* 0xffffff).toString(16);
   const aa = ["일상","놀러가기","연애","맛집","미드","가족","연설","짝사랑","영화","맛집탐방","기념일","회사생활"] 

       return (
      <>
      <ScriptBox>
         <P><p>✔️ 인원별로 선택</p></P>
      <Box>
         <People>2인</People>
         <People>3인</People>
         <People>4인</People>
      </Box>
      <Box2>
      <p>✔️ 태그별로 선택</p>
      {aa.map((time,i) => (
         <Tag >#{time}</Tag>
         ))}
      </Box2>
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
      background-color: #5daf76;
      transition: all 0.5s;
      cursor: pointer;
      &:hover {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 1px, rgb(51, 51, 51) 0px 0px 0px 1.3px;
      }
      font-weight: 500;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 10px;
   `

   const P =styled.div`
   p{
      font-size: 14px;
      font-weight: 630;
   }
   `