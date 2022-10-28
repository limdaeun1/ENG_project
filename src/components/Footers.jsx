import React from 'react';
import styled from "styled-components";
import GitHub from "../img/GitHub.png";
import instagram from "../img/instagram.png";
import discord from "../img/discord.png";

const Footer = () => {

    return (
        <FooterWrap>
            <LogoNCopyRight>
                <CopyRight>Copyright @2022 ENGFLUENCER.All rights reserved.</CopyRight>
                <InfoBtnWrap>
                    <InfoBtn>저작권표기</InfoBtn>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeFAflIpcLJwVxI0Yy6oIjft-70ZmZiTpq3v9NY_1j83B8Y_A/viewform?usp=sf_link">
                    <InfoBtn title="만족도 평가 바로가기">만족도평가</InfoBtn></a>
                </InfoBtnWrap>
            </LogoNCopyRight>
            <InfoWrap>
                <RoleWrap>
                  <InfoCateWrap>
                      <ContactText>engfluencergangwon@gmail.com</ContactText>
                      <SnsWrap>
                          <Contact >
                            <a href="https://www.instagram.com/engfluencer_official">
                              <ContactInsta src={instagram} title="Eng-Fluencer 공식 인스타그램 바로가기"></ContactInsta></a>
                          </Contact>
                          <Contact>
                            <a href="https://github.com/Eng-Fluencer">
                              <ContactGit src={GitHub} title="Eng-Fluencer GitHub 바로가기"></ContactGit></a>
                          </Contact>
                          <Contact >
                            <a href="https://discord.gg/dG8WHNwX">
                              <Contactdiscord src={discord} title="Eng-Fluencer Discord 바로가기"></Contactdiscord></a>
                          </Contact>
                      </SnsWrap>
                  </InfoCateWrap>
                  <RoleCateWrap>
                      <RoleTitle>Developer</RoleTitle>
                      <FEBEWrap>
                          <NameText>BE<br/>정민우ㅤ  임소윤ㅤ  정동섭</NameText>
                      </FEBEWrap>
                      <FEBEWrap>
                          <NameText>FE<br/>이예솔ㅤ  임다은ㅤ  김보미</NameText>
                      </FEBEWrap>                    
                  </RoleCateWrap>
            </RoleWrap>
         </InfoWrap>
        </FooterWrap>
    );
};

const FooterWrap = styled.div`
    height : 190px;
    min-width : 900px;
    width :100%;
    background-color : #363a3e;
    display : flex;
    margin-top: 70px;
    padding:10px;
    justify-content: center;
    padding-top: 15px;
`
const LogoNCopyRight = styled.div`
`

const CopyRight = styled.p`
    font-size : 14px;
    font-family: "PretendardRegular";
    width:100%;
    max-width:320px;
    min-width:170px;
    color : #FFFFFF;
    margin-top : 15px;
    margin-bottom: 0px;
    border: none;
`

const InfoBtnWrap = styled.div`
    display : flex;
    gap : 13px;
    margin-top : 70px;
`
const InfoBtn = styled.p`
    font-size : 14px;
    border : none;
    background-color : transparent;
    color : white;
    text-align : left;
    cursor:pointer;
    &:hover {
    transform: scale(1.05);
    transition: all 0.2s linear;
  }
`

const InfoWrap = styled.div`
width:90%;
margin-left:10%;
    max-width : 700px;
    min-width: 500px;
    color : #FFFFFF;
    border:none;
`

const RoleWrap = styled.div`
    display:flex;
`

const InfoCateWrap = styled.div`
    display : grid;
    width : 214px;
    min-width:300px;
`
const RoleCateWrap = styled.div`
    display:grid;
    width : 50%;
    min-width : 165px;
`
const RoleTitle = styled.p`
    color : #FFFFFF;
    font-size : 16px;
    margin-bottom : 13px;
`

const FEBEWrap = styled.div`
    display : flex;
    min-width: 250px;
    gap : 13px;
`
const NameText = styled.p`
    color : #FFFFFF;
    font-size : 14px;
    /* margin-bottom : 8px; */
    margin-right : 20;
    font-family: "PretendardRegular";
`
const ContactText = styled.p`
    color : #FFFFFF;
    font-size : 15px;
    margin-bottom : 8px;
    font-family: "PretendardRegular";
`
const SnsWrap = styled.div`
    width : 120px;
    display :flex;
`
const Contact = styled.div`
    color : #FFFFFF;
    font-size : 16px;
    margin-bottom : -25px;
    margin-right : 12px;
    &:hover{
        cursor : pointer;

    }
    padding: 5px;
`
const ContactInsta = styled.img`
   width : 30px;
    height: 30px;
    margin-bottom: -2px;
    &:hover {
    transform: scale(1.1);
    transition: all 0.2s linear;
  }
`
const ContactGit = styled.img`
   width : 30px;
    height: 30px;
    &:hover {
    transform: scale(1.1);
    transition: all 0.2s linear;
  }
`
const Contactdiscord = styled.img`
   width : 35px;
  height: 35px;
  margin-top: -1px;
  margin-left: -2px;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s linear;
  }
`

export default Footer;