import styled from "styled-components";

const CSChat= () => {

    return (
      <>
      <ChatBox>
                <Chat>
                    <Who>이름</Who>
                    <What>내용</What>
                         </Chat>
            </ChatBox>
            <SendBox>
                <InputBox></InputBox>
                <SendBut>전송</SendBut>
            </SendBox>
      </>
       );
    };
    
    export default CSChat;

const ChatBox=styled.div`
border: solid 1px green;
height: 240px;
width: 1250px;
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
height: 40px;
width: 1200px;
margin-left: 50px;
margin-top: 10px;
`;

const Who=styled.div`
border: none;
width: 100px;
text-align : center;
font-weight: bold;
font-size: small;
align-items: center;
justify-content: center;
line-height: 35px;
border-radius: 20px;
background: #8ce99a;
`;

const What=styled.div`
border: solid 1px gray;
width: 1100px;
margin-left: 20px;
line-height: 35px;
border-radius: 20px;
/* //내부 스크롤 */
/* overflow: scroll;
overflow-x: hidden; */
background: white;
font-size: small;
`;


const SendBox=styled.div`
border: none;
margin-top: 20px;
height: 30px;
width: 1200px;
display: flex;
border-radius: 20px;
align-items: center;
 justify-content: center;
 margin-left: 50px;
`;

const InputBox=styled.input`
border: solid 1px green ;
width: 1200px;
height: 40px;
border-radius: 20px;
`;

const SendBut=styled.div`
width: 150px;
border: none;
background : #69DB7C;
height: 40px;
border-radius: 20px;
margin-left: 50px;
text-align : center;
line-height: 30px;
font-weight: bold;
font-size: middle;
line-height: 40px;
&:hover {
    background-color: #89f6ab;
  }
`;