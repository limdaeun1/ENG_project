import styled from "styled-components";

const CSCamSet= () => {

    return (
      <>
      <CamSmallBox1>
              <Camsmall01></Camsmall01>
              <Camsmall02></Camsmall02>
              <Camsmall03></Camsmall03>
            </CamSmallBox1>
            <CamSmallBox2>
              <Camsmall01></Camsmall01>
              <Camsmall02></Camsmall02>
              <Camsmall03></Camsmall03>
            </CamSmallBox2>
      </>
       );
    };
    
    export default CSCamSet;

    const CamSmallBox1=styled.div`
display:flex;
border: none;
border-radius: 20px;
height: 240px;
`;

const CamSmallBox2=styled.div`
display:flex;
border: none;
border-radius: 20px;
height: 240px;
margin-top: 10px;
`;

const Camsmall01=styled.div`
border: solid 1px green;
background: #D9D9D9;
border-radius: 20px;
width: 350px;
box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;

const Camsmall02=styled.div`
border: solid 1px green;
background: #D9D9D9;
border-radius: 20px;
width: 350px;
margin-left: 10px;
box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;

const Camsmall03=styled.div`
border: solid 1px green;
background: #D9D9D9;
border-radius: 20px;
width: 350px;
margin-left: 10px;
box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;