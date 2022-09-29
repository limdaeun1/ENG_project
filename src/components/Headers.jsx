import styled from 'styled-components'
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Headers = () => {
  const navigate = useNavigate();
  // let dispatch = useDispatch();
  const userlogin = useSelector((state) => state.user);
  const logoutHandler = () => {
    window.alert("로그아웃 하시겠습니까?");
    localStorage.removeItem("token"); //로그아웃 버튼 누르면 로컬스토리지의 토큰을 지운다.
    localStorage.removeItem("name");
    navigate("/");
    window.location.reload(); //자동 새로고침을 위해 버튼을 누를때마다 리로드 해주도록 한다.
  };

  
  return (
    <Div>
      <Logo src = "https://ifh.cc/g/g8oOgd.png"  onClick={() => navigate("/")}></Logo>
      <Btnbox>
              {userlogin.is_Login !== true ? ( //uselogin.is_Login 이 true가 아니면 로그인 페이지로 이동 + 로그인 버튼이 보이게 하고 true면 로그아웃 버튼이 보인다.  
        <Btn onClick={() => navigate("/login")}>Login</Btn>
              ) : (
                <Btn onClick={logoutHandler}> Log-out</Btn>
              )}
              {userlogin.is_Login ? (
                  <Btn onClick={() => navigate("/mypage")}>My page</Btn>
            ) : (
              <Btn
                onClick={() => {
                  alert("로그인이 필요한 서비스입니다.");
                  navigate("/login");
                }}
                > My page</Btn>
            )}
      </Btnbox>
    </Div>
  )
}

export default Headers

const Div = styled.div`
border: none;
  width: 100%;
 height: 100%;
 font-size: 14px;
  text-align: center;
  display: flex;
  justify-content: space-between;
`

const Logo = styled.img`
border: none;
  width: 10%;
  min-width: 100px;
  height: 10%;
  margin-left: 1%;
`

const Btn = styled.button`
  width: 50%;
  min-width: 60px;
  height: 45%;
  min-height: 45%;
  font-size: 1rem;
  /* 14px; */
  background-color: #39964c;
  border: none;
  border-radius: 7px;
  color: white;
  cursor: pointer;
  transition: all 0.5s;
  margin-right: 10%;
  margin-top: 10%;
  &:hover {
    background-color: #89f6ab;
  }
`;

const Btnbox = styled.div`
display: flex;
width: 20%;
min-width:190px;
border: none;
margin-top: 5%;
`;