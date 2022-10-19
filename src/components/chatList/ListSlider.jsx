import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Slide() {

    const sliders = [1,2,3,4]
  return (
    <Container>
      <StyledSlider {...settings}>
            <CardBox>
              <CardImg alt="인기 서비스" src="https://cdn.pixabay.com/photo/2018/12/06/16/12/birds-3860034__480.jpg"/>
            </CardBox>
            <CardBox>
              <CardImg alt="인기 서비스" src="https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252__480.jpg"/>
            </CardBox>
            <CardBox>
              <CardImg alt="사이트 설정 확인" src="https://ifh.cc/g/YSy0Pz.png"/>
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
  margin:2% 0 13% 0 ;
  /* background-color: red; */

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

  /* .slick-prev:before, .slick-next:before{ //얘는 양옆 버튼. 커스텀 해줘야 보임
    	font-family: 'slick';
        font-size: 30px;
        line-height: 1;
        opacity: .75;
        color: #c2bebe99;
        -webkit-font-smoothing: antialiased;
    } */
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
