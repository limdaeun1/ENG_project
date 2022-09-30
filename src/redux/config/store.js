import { configureStore , getDefaultMiddleware  } from "@reduxjs/toolkit";
import user from "../modules/user";
import chatroom from "../modules/chatroom";
import mypage from "../modules/mypage";

const store = configureStore({
  reducer: {
    user,
    chatroom,
    mypage,},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false})
});

export default store;