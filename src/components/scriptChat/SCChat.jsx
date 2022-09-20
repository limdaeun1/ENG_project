import styled from "styled-components";

const SCChat= () => {

    return (
    <>
    <CamChatBox>
            <ChatBox>
                <Chat>
                    <Who>이름</Who>
                    <What>내 용</What>
                         </Chat>
            </ChatBox>
            <SendBox>
                  <InputBox></InputBox>
                <SendBut>전송</SendBut>
            </SendBox>
            </CamChatBox>

    </>
    ); 
  };

  export default SCChat;

  const CamChatBox=styled.div`
  border: solid 1px green;
  height: 300px;
  width: 420px;
  margin-top: 30px;
  display: block;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  `;

const ChatBox=styled.div`
border: solid 1px green;
height: 220px;
width: 370px;
display: block;
overflow: scroll;
overflow-x: hidden;
display: block;
border-radius: 20px;
margin-top: 10px;
margin-left: 25px;
background: #ebfbee;
`;

const Chat=styled.div`
display: flex;
border: none;
height: 30px;
width: 370px;
margin-left: 10px;
margin-top: 10px;
`;

const Who=styled.div`
border: none;
width: 50px;
text-align : center;
font-weight: bold;
font-size: small;
align-items: center;
justify-content: center;
line-height: 30px;
border-radius: 20px;
background: #8ce99a;
`;

const What=styled.div`
border: solid 1px gray;
width: 300px;
margin-left: 5px;
line-height: 25px;
border-radius: 20px;
/* 내부 스크롤 */
/* overflow: scroll;
overflow-x: hidden; */
background: white;
font-size: small;
`;


const SendBox=styled.div`
border: none;
margin-top: 20px;
height: 30px;
width: 370px;
display: flex;
border-radius: 20px;
align-items: center;
 justify-content: center;
 margin-left: 25px;
`;

const InputBox=styled.input`
border: solid 1px green ;
width: 290px;
height: 30px;
border-radius: 20px;
`;

const SendBut=styled.div`
width: 50px;
border: none;
background : #69DB7C;
height: 30px;
border-radius: 20px;
margin-left: 15px;
font-size: small;
align-items: center;
 justify-content: center;
 text-align : center;
line-height: 27px;
&:hover {
    background-color: #89f6ab;
  }
`;