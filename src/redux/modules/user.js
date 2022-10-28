import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

const initialState = {
  };

export const user = createSlice({
   name: "user",
    initialState: { 
      isLogin: false,
       error: null,
       },
        reducers: { 
          //로그인상태확인 리듀서
           loginCheck: (state) => { 
            //app.js에서 뭔가 실행 될 때마다 항상 로컬스토리지에 토큰이 있나 없나 보고 state의 isLogin상태 바꿔줌
            state.is_Login = true;
           },
           },
           });

  //카카오 로그인     //엑스트라리듀서 안씀
export const getKakao = createAsyncThunk(
  "user/getKakao",
  async (code, thunkAPI) => {
    //주소창의 code 뽑아낸걸 payload로 받음
    try {
      const data = await instance.get(`/login/kakao?code=${code}`); //서버주소+코드정보(?서버주소?) 로 get요청을 보내면 response에 토큰을 받을수있다. 코드르 보내주면서 동시에 토큰을 받아옴.
      const ACCESS_TOKEN1 = data.headers.authorization.substring(10,97);
      const ACCESS_TOKEN2 = data.headers.authorization.substring(97,105);
      const ACCESS_TOKEN3 = data.headers.authorization.substring(105);
      localStorage.setItem(process.env.REACT_APP_TOKEN_A, ACCESS_TOKEN1 )
      localStorage.setItem(process.env.REACT_APP_TOKEN_B, ACCESS_TOKEN2 )
      localStorage.setItem(process.env.REACT_APP_TOKEN_C, ACCESS_TOKEN3)
      const ACCESS_TOKEN4 = Math.random().toString(36).substring(2) 
      const ACCESS_TOKEN5 = Math.random().toString(36).substring(2) 
      const ACCESS_TOKEN6 = Math.random().toString(36).substring(2) 
      localStorage.setItem(process.env.REACT_APP_TOKEN_D, ACCESS_TOKEN4)
      localStorage.setItem(process.env.REACT_APP_TOKEN_E, ACCESS_TOKEN5)
      localStorage.setItem(process.env.REACT_APP_TOKEN_F, ACCESS_TOKEN6)
      
      const user = data.data.data.memberName
      localStorage.setItem("name", user )
      const userId = data.data.data.memberId
      localStorage.setItem("userId",userId)
      const userImg = data.data.data.memberImg
      localStorage.setItem("userImg",userImg)
      window.location.assign("/"); //토큰 저장하면 자동으로 메인화면으로 이동
      return data;



    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


  //네이버 로그인     //엑스트라리듀서 안씀
  export const getNaver = createAsyncThunk(
    "user/getKakao",
    async (code, thunkAPI) => {
      //주소창의 code 뽑아낸걸 payload로 받음
      try {
        const data = await instance.get(`/login/naver?code=${code}&state=123`); //서버주소+코드정보(?서버주소?) 로 get요청을 보내면 response에 토큰을 받을수있다. 코드르 보내주면서 동시에 토큰을 받아옴.
        console.log(data);
        const ACCESS_TOKEN1 = data.headers.authorization.substring(10,97);
        const ACCESS_TOKEN2 = data.headers.authorization.substring(97,105);
        const ACCESS_TOKEN3 = data.headers.authorization.substring(105);
        localStorage.setItem(process.env.REACT_APP_TOKEN_A, ACCESS_TOKEN1 )
        localStorage.setItem(process.env.REACT_APP_TOKEN_B, ACCESS_TOKEN2 )
        localStorage.setItem(process.env.REACT_APP_TOKEN_C, ACCESS_TOKEN3)
        const ACCESS_TOKEN4 = Math.random().toString(36).substring(2) 
        const ACCESS_TOKEN5 = Math.random().toString(36).substring(2) 
        const ACCESS_TOKEN6 = Math.random().toString(36).substring(2) 
        localStorage.setItem(process.env.REACT_APP_TOKEN_D, ACCESS_TOKEN4)
        localStorage.setItem(process.env.REACT_APP_TOKEN_E, ACCESS_TOKEN5)
        localStorage.setItem(process.env.REACT_APP_TOKEN_F, ACCESS_TOKEN6)

        const user = data.data.data.memberName
        localStorage.setItem("name", user )
        const userId = data.data.data.memberId
        localStorage.setItem("userId",userId)
        const userImg = data.data.data.memberImg
        localStorage.setItem("userImg",userImg)
        window.location.assign("/"); 
        return data;
  
  
  
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export default user.reducer;
export const { loginCheck } = user.actions;