import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";


//마이페이지 정보 가져오기(메모)
export const getMypage = createAsyncThunk(
    "mypage/getMypage",
    async (_, thunkAPI) => {
      try {
        const data = await instance.get("/auth/mypage/info");
        return data.data.data
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );



export const mypage = createSlice({
    name: "mypage",
    initialState: { 
    isLogin: false,
    error: null,
    },
    reducers: { 
     },

    extraReducers: {
    [getMypage.pending]: (state) => {
        state.isLoading = true; 
    },
    [getMypage.fulfilled]: (state, action) => {
        state.isLoading = false; 
        state.mypagelist = action.payload;    
    },
    [getMypage.rejected]: (state, action) => {
        state.isLoading = false; 
        state.error = action.payload; 
    },
}
});



export default mypage.reducer;
