## 👋 What is Eng-Fluencer?
![KakaoTalk_20221024_143936653](https://user-images.githubusercontent.com/110237141/197495226-a7cc49fa-10f3-4154-a6e9-c8b519dc59da.png)



<div>
 Eng-Fluencer는 영어공부를 위한 화상채팅 사이트입니다!
  <br>
 Eng-Fluencer와 함께 재밌는 영어 스터디를 시작해보세요!
</div>

#### [잉플루언서 바로가기](https://engfluencer.co.kr)
#### [팀 잉플루언서 노션](https://funky-orchid-464.notion.site/EngFluencer-f8d17d3ef6b24ed3bd3e32690b48ec6e)
#### [팀 잉플루언서 발표영상](https://youtu.be/eI4iiOFWUNg)

## 메인기능

#### 🎥화상통화
openVidu 라이브러리를 사용하여 실시간 화상 통화가 가능하도록 구현하여 캠스터디를 구성했습니다.
#### ✉채팅
sockjs와 stomp를 사용하여 실시간 채팅이 가능하도록 구현했습니다.
#### 📑스크립트
서버에서 스크립트를 받아와서 리덕스로 저장하여 화면에서 확인이 가능하도록 제작했습니다. 원하는 태그를 클릭하면 해당 스크립트가 출력됩니다.
#### 📜메모장
캠스터디를 진행하며 공부한 내용을 작성할 수 있도록 메모장 기능을 구현했습니다. 작성한 메모장은 마이페이지에서 확인이 가능합니다.



## 부가기능

#### ⏰타이머
본인의 공부시간을 기록할 수 있도록 타이머 기능을 구현했습니다. 공부시간은 마이페이지에서 확인가능합니다.
#### 🐦번역
스크립트 채팅방에서 한/영 번역 기능을 이용할 수 있습니다.
#### 🥊악성유저 제어
웹소켓을 통해 실시간으로 van타입 유저를 받아서 강제퇴장 및 재입장 불가능하도록 구현했습니다.
#### 👨‍👩‍👦‍👦참가자 목록 제공
웹소켓을 통해 입퇴장시 참가자 목록을 받아서 실시간으로 참가한 유저의 목록과 참가자 수를 확인할 수 있습니다
#### 👑방장권한
악성유저 강제 퇴장 및 방장 권한 위임의 기능을 추가하여 스터디 참가 유저 관리를 용이하게 했습니다.




## 🖥둘러보기

#### 메인화면&로그인
![메인-로그인](https://user-images.githubusercontent.com/102493302/197492051-83e78570-a9bf-4953-ac20-f28a118120c6.gif)


#### 방 생성하기
![방생성](https://user-images.githubusercontent.com/102493302/197492795-0043d3a5-110b-4893-ad06-f95b7404a793.gif)


#### 입장 전 권한 확인
![권한](https://user-images.githubusercontent.com/102493302/197492854-43399b76-7674-40d4-8ef7-af971b7cff2a.gif)


#### 채팅&공지
![채팅 공지](https://user-images.githubusercontent.com/102493302/197493115-acb69735-ab95-4f5f-823b-c0e4a9ed521f.gif)


#### 신고&방장위임&강제퇴장
![신고방장위임](https://user-images.githubusercontent.com/102493302/197492988-aba7184e-9f3b-410b-a2c3-67b62517bb5c.gif)


#### 스크립트 방 기능
![스크립트기능](https://user-images.githubusercontent.com/102493302/197493063-260286aa-0ea1-43ed-9045-ee598a34f614.gif)


#### 캠스터디방 둘러보기 &마이 페이지
![캠스터디방](https://user-images.githubusercontent.com/102493302/197492916-2ca7b6a0-a69f-42bd-9510-1e7bf3d851aa.gif)


## 🛠 Service Architecture 🛠
![아키텍쳐](https://user-images.githubusercontent.com/110237141/197495182-d14ae951-ebd2-4fe3-8305-4ff2fc8bd37f.png)


## 🔥트러블 슈팅

#### 🔥 비정상적인 접속종료 유저를 구별하는 방법(Custom Ping-Pong)
- **문제 정의**
    - 특정 상황에서 유저가 방에 남아있는 경우 발생
- **사실 확인**
    - 나가기, 뒤로가기가 아닌 브라우저 강제종료 등의 방법으로 접속 종료 시
    실제로는 접속이 종료됬지만 서버에서는 파악이 불가능
    - 이로 인하여 추후 재접속시 방 생성, 입장이 불가능한 오류 발생
- **해결 방안**
    1.  `window.onbeforeunload` 를 사용하여 검증
    2. 실시간으로 유저 접속상태를 검증 
- **문제 해결**

    Re.1 `window.onbeforeunload` 사용 시 새로고침, 페이지이동, 브라우저 종료시에 disconnect
    함수를 작동시키는데 새로고침시에만 disconnect함수가 호출되지 않도록 하는것이 불가능따라서 실시간 유저 접속상태 검증(Ping-Pong)을 구현하기로 결정
    
    Re.2 **Custom Ping-Pong**
    (채팅방 입,퇴장시 서버DB에 저장하여 관리중)  
    1. [FE] : 유저 입장시 3초 간격으로 서버에 WebSocket Request (Type : 8)
    2. [BE] : 받은 WebSocket의 시간은 Member Entity에 저장, 현재시간과 비교하여 알고리즘동작
        1. DB에 저장되어있고 정상적으로 WebSocket Request가 이루어진 유저 : **정상 유저**
        2. DB에 저장되어있지만 WebSocket Request가 없는 유저 : **비정상적인 접속종료 유저**
        Member Entity의 Ping 시간 초기화 후, DB에 입장 정보 삭제
        3. DB에 없지만 WebSocket Request가 있는 유저 : **비정상적인 접근 유저**
        강제 퇴장처리 요청
    3. [FE] : Type: 8 로 전달받은 Response 실행(Case : 2-c)     
         Response에 담긴 Id가 Local Storage에 저장된 접속중인 유저의 Id와 동일할경우   
         Redirect를 통한 퇴장처리



#### 🔥 Refresh-Token의 대안책
- **문제 정의**
    - 스터디진행시간이 토큰 유효기간보다 길 경우에도 만료없이 지속적인 채팅이 가능하도록 유지해야된다고 판단
- **사실 확인**
    - Access-Token이 탈취당할시 발생하는 피해를 최소화하기 위해 주로 Access-Token의 만료기간을 짧게하고 만료기간을 길게한 Refresh-Token을 발급
    - 그러나 상용화된 스터디 서비스를 참고하였을때, 접속시간이 24시간을 넘는 경우도 많음, 따라서 Refresh-Token이외의 대안책이 필요하다고 판단
- **해결 방안**
    1. 만약 Refresh-Token을 사용한다면 채팅방 입장시마다 만료, 퇴장시 재발급 하는 방법
    2. Access-Token만을 활용, 대신 Local Storage에 저장시 암호화(Kakao Developers 참고)
- **문제 해결**

    Re.1 비정상적인 접속 종료 및 만료되었을때에 탈취와 같은 요인들로 인하여 비효율적이라고 판단
    
    Re.2 Kakao Developers의 경우 Subject + Token으로 구성된 JWT 발급 중(이중 암호화)
    그러나, 현재 토큰에 들어있는 정보를 기반으로 인증을 진행하기때문에 다른 방법을 고려
    
    Access-Token 발급시 FE에서 토큰을 3개로 분할, 이후 허수 값을 포함한 5개 정도의 값을 Local Storage에 저장,  서버에 요청을 보낼시 env에 처리된 3개의 값만 추출하여 재 조합후 헤더에 담아 전송, 만약 잘못된 조합으로 서버에 요청을 보낼시 탈취와 같은 문제라고 판단
    


#### 🔥 유저 신고기능
- **문제 정의**
    - 화상채팅과 일반채팅을 사용하기 때문에 **악성 유저**에대한 고려는 필수적이라고 판단
- **사실 확인**
    - 현재 상용중인 타 서비스들은 주로 **채팅신고/유저신고** 방식으로 운영중
- **해결 방안**
    1. 채팅신고 :  문제가되는 채팅을 직접적으로 fork 하여 관리자에게 전달하는 방법
    2. 유저신고 : 문제가되는 유저를 신고한뒤 관리자가 로그를통해 해당 유저에대한 문제점을 확인하는 방법
- **문제 해결**

    Re.1 **채팅신고** : 
    해당 채팅을 신고하여도 관리자 입장에서는 전반적인 채팅 맥락을 반드시 확인해야한다고 판단하였고, 채팅이 많이 진행되는경우 해당 채팅을 찾아 신고하는것이 UX적으로 **비효율적**이라고 판단
    
    Re.2 **유저신고** :
    신고된 유저에 대한 제제를 위해선 저장된 채팅 전체를 확인해야하므로 
    **[어느방에서, 누가, 대략적인 신고받은시간]** 을 서버에 전달하여 관리자가 최종적으로 확인하는 구조 고려
    **단, 관리자가 직접 제제하는 정책이다보니 제제 규정을 수립해야할 필요성이 있다고 판단**



## 👍Member
### Back  


<p>정민우 👑 </p>
<p>임소윤</p>
<p>정동섭</p>


### Front 

<p>임다은</p>
<p>이예솔</p>
<p>김보미</p>





### Front
<div style ={{display:"flex"}}>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
<img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=React Router&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/>
<img src="https://img.shields.io/badge/styled-components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat-square&logo=Amazon EC2&logoColor=black"/>

### Communication
<div style ={{display:"flex"}}>
<img src="https://img.shields.io/badge/Kakao-FFCD00?style=flat-square&logo=Kakao&logoColor=black"/>
  <img src="https://img.shields.io/badge/Sokcjs-black?style=flat-square&logo=Sokcjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Stomp-black?style=flat-square&logo=Stomp&logoColor=white"/>
  <img src="https://img.shields.io/badge/Rest:APi-007ACC?style=flat-square&logo=Rest:APi&logoColor=white"/>
  <img src="https://img.shields.io/badge/HTTP-2C5BB4?style=flat-square&logo=HTTP&logoColor=white"/>
</div>


### Back
<div style ={{display:"flex"}}>

<img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat-square&logo=Amazon EC2&logoColor=black"/>
<img src="https://img.shields.io/badge/java-FF7800?style=flat-square&logo=java&logoColor=whtie"/>
<img src="https://img.shields.io/badge/Gson-grey?style=flat-square&logo=Gson&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=Spring&logoColor=white"/>
<img src="https://img.shields.io/badge/JSON Web Tokens-000000?style=flat-square&logo=JSON Web Tokens&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/>
<img src="https://img.shields.io/badge/OpenVidu-grey?style=flat-square&logo=OpenVidu&logoColor=white"/>
<img src="https://img.shields.io/badge/Let's Encrypt-003A70?style=flat-square&logo=Let's Encrypt&logoColor=white"/>
<img src="https://img.shields.io/badge/H2-3b5bdb?style=flat-square&logo=H2&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
</div>
<!--

**Here are some ideas to get you started:**

🙋‍♀️ A short introduction - what is your organization all about?
🌈 Contribution guidelines - how can the community get involved?
👩‍💻 Useful resources - where can the community find your docs? Is there anything else the community should know?
🍿 Fun facts - what does your team eat for breakfast?
🧙 Remember, you can do mighty things with the power of [Markdown](https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
-->
