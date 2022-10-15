import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";


    export const postTranslate = createAsyncThunk(
        "/chat/message/translation",
        async (payload, thunkAPI) => {
          try {
            const data = await instance.post(`/chat/message/translation`, payload, {
              headers: {

              },
            });
            if (data.data.success === false) alert(data.data.error.message);


            return thunkAPI.fulfillWithValue(data.data.data.translatedText);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
        }
      );


export const translate = createSlice({
    name: "translate",
    initialState:{},
    reducers: {},

    extraReducers: {
        [postTranslate.pending]: (state) => {
            state.isLoading = true; 
          },
          [postTranslate.fulfilled]: (state, action) => {
              console.log(state)
          console.log(action.payload)
            state.isLoading = false; 
            state.translate = action.payload;    
          },
          [postTranslate.rejected]: (state, action) => {
            state.isLoading = false; 
            state.error = action.payload; 
          },
    }
  });


export default translate.reducer;