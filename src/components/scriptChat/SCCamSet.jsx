import styled from "styled-components";

const SCCamSet= () => {

    return (
      <>

<CamBox>
            <CamBig></CamBig>
            <CamSmallBox>
              <Camsmall01></Camsmall01>
              <Camsmall02></Camsmall02>
              <Camsmall03></Camsmall03>
            </CamSmallBox>
          </CamBox>
      </>
  );
};

export default SCCamSet;

const CamBox=styled.div`
border: none;
margin-left: 60px;
height: 670px;
width: 950px;
margin-top: 100px;
`;

const CamBig=styled.div`
border: solid 1px green;
background: #D9D9D9;
border-radius: 20px;
margin-left: 215px;
width: 500px;
height: 325px;
box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;

const CamSmallBox=styled.div`
display:flex;
border: solid none;
border-radius: 20px;
height: 270px;
margin-top: 40px;
`;

const Camsmall01=styled.div`
border: solid 1px green;
background: #D9D9D9;
border-radius: 20px;
width: 300px;
box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;

const Camsmall02=styled.div`
border: solid 1px green;
background: #D9D9D9;
border-radius: 20px;
width: 300px;
margin-left: 25px;
box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;

const Camsmall03=styled.div`
border: solid 1px green;
background: #D9D9D9;
border-radius: 20px;
width: 300px;
margin-left: 25px;
box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;