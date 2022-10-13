import styled from 'styled-components'
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Headers = () => {
  const navigate = useNavigate();
  // let dispatch = useDispatch();
  const userlogin = useSelector((state) => state.user);
  const logoutHandler = () => {
    // window.alert("로그아웃 하시겠습니까?");
    localStorage.removeItem("token"); //로그아웃 버튼 누르면 로컬스토리지의 토큰을 지운다.
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    navigate("/");
    window.location.reload(); //자동 새로고침을 위해 버튼을 누를때마다 리로드 해주도록 한다.
  };

  
  return (
    <Div>
      <Logo src = "https://ifh.cc/g/g8oOgd.png"  onClick={() => navigate("/")}></Logo>
      <Btnbox>
        <Btnboxsmall1>
        <Img>
        <img src="https://ifh.cc/g/5fWtMJ.png"></img>
        {/* https://ifh.cc/g/KYvFwj.png
        bigger.ver
        https://ifh.cc/g/5fWtMJ.png
        smaller.ver */}
        </Img>
        </Btnboxsmall1>
        <Btnboxsmall2>
              {userlogin.is_Login !== true ? ( //uselogin.is_Login 이 true가 아니면 로그인 페이지로 이동 + 로그인 버튼이 보이게 하고 true면 로그아웃 버튼이 보인다.  
        <Btn onClick={() => navigate("/login")}>Login</Btn>
              ) : (
                <Btn onClick={logoutHandler}> Log-out</Btn>
              )}
              {userlogin.is_Login ? (
                  <Btn1 onClick={() => navigate("/mypage")}>My page</Btn1>
            ) : (
              <Btn1
                onClick={() => {
                  alert("로그인이 필요한 서비스입니다.");
                  navigate("/login");
                }}
                > My page</Btn1>
            )}
            </Btnboxsmall2>

      </Btnbox>
    </Div>
  )
}

export default Headers

const Div = styled.div`
/* border: solid 1px; */
border: none;
  width: 100%;
 height: 140px;
 font-size: 14px;
  text-align: center;
  display: flex;
  justify-content: space-between;
`

const Logo = styled.img`
/* border: solid 1px; */
border: none;
  width: 10%;
  min-width: 150px;
  margin-left: 1%;
`

const Btn = styled.button`
  width: 30%;
  min-width: 70px;
  height: 27px;
  font-size: 0.8rem;
  /* 14px; */
  background-color: #4fc166;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: all 0.5s;
  margin-right: 10%;
  /* margin-top: 8px; */
  &:hover {
    background-color: #89f6ab;
  }
  font-weight: 540;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 10px;
`;

const Btn1 = styled.button`
  width: 30%;
  min-width: 70px;
  height: 27px;
  font-size: 0.8rem;
  /* 14px; */
  background-color: #4fc166;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: all 0.5s;
  /* margin-top: 8px; */
  &:hover {
    background-color: #89f6ab;
  }
  font-weight: 540;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 10px;
`;

const Img = styled.div`
border: none;
margin-left:60%;
    width: 35px;
    height: 15px;
    /* background-image: url('https://ifh.cc/g/L9Q8RN.png'); 
    background-size: cover; */
    background-position: center;
    z-index: 1;
    `

const Btnbox = styled.div`
display: block;
width: 20%;
min-width:230px;
height: 70px;
/* border: solid 1px; */
border: none;
margin-top: 70px;
`;

const Btnboxsmall1 = styled.div`
display: flex;
width: 100%;
height: 15px;
/* border: solid 1px red; */
border: none;
`;

const Btnboxsmall2 = styled.div`
display: flex;
width: 100%;
height: 52px;
/* border: solid 1px red; */
border: none;
`;