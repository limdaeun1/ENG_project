import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";

//스크립트 태그 인원수에 따라 모두 가져오기
export const getTag = createAsyncThunk(
    "script/getTag",
    async (people, thunkAPI) => {
      try {
        const data = await instance.get(`/chat/script/${people}`);
        return data.data.data
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );  

//선택한 태그의 스크립트리스트 불러오기
export const getScriptlist = createAsyncThunk(
    "script/getScriptlist",
    async (payload, thunkAPI) => {
      try {
        const data = await instance.get(`/chat/script/${payload.people}/${encodeURIComponent(payload.tag)}`);
        console.log(data.data.data)
        return data.data.data
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );  

export const script = createSlice({
 name: "script",
  initialState: { 
    isLogin: false,
    error: null,
     },
      reducers: { 
         },
         extraReducers: {
            [getTag.pending]: (state) => {
              state.isLoading = true; 
            },
            [getTag.fulfilled]: (state, action) => {
              state.isLoading = false; 
              state.scriptlist = action.payload;    
            },
            [getTag.rejected]: (state, action) => {
              state.isLoading = false; 
              state.error = action.payload; 
            },
            [getScriptlist.pending]: (state) => {
              state.isLoading = true; 
            },
            [getScriptlist.fulfilled]: (state, action) => {
              state.isLoading = false; 
              state.scriptlist2 = action.payload;    
            },
            [getScriptlist.rejected]: (state, action) => {
              state.isLoading = false; 
              state.error = action.payload; 
            },
        }
         
});



export default script.reducer;
