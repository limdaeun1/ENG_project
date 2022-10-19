import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import test11 from "../../img/test11.png";
import test22 from "../../img/test22.png";

function Slide() {

  return (
    <Container>
      <StyledSlider {...settings}>
            <CardBox>
              <CardImg alt="사이트 설정 확인" src="https://ifh.cc/g/YSy0Pz.png"/>
            </CardBox>
            <CardBox>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeFAflIpcLJwVxI0Yy6oIjft-70ZmZiTpq3v9NY_1j83B8Y_A/viewform?usp=sf_link">
              <CardImg alt="설문조사 이벤트" src={test22} title="리뷰 작성하러 가기"/></a>
            </CardBox>
            <CardBox>
            <CardImg alt="사용 방법" src={test11}/>
            </CardBox>
      </StyledSlider>
    </Container>
  );
}

export default Slide;

// 슬라이드 설정
const settings = {
  dots: true,  // 슬라이드 밑에 점 보이게
  infinite: true,  // 무한으로 반복
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,  // 넘어가는 속도
  slidesToShow: 1,  // 4장씩 보이게
  slidesToScroll: 1,  // 1장씩 뒤로 넘어가게
  centerMode: true,
  centerPadding: '0px',  // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
};


const Container = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  margin:2% auto 13% auto;
`;

// 슬라이드 CSS
const StyledSlider = styled(Slider)`
  .slick-list {
    max-width: 800px;
    /* min-width: 300px; */
    width:95%;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  .slick-slide div {
    cursor: pointer;
  }

  .slick-dots {
    bottom: -50px;
  }

  .slick-track {
    overflow-x: hidden;
  }
`;

const CardBox = styled.div`
  cursor: pointer;
`;

const CardImg = styled.img`
  max-width: 1500px;
  min-width: 300px;
  width: 100%;
  height: 200px;
  object-fit: cover;
`;
