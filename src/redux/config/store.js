import { configureStore , getDefaultMiddleware  } from "@reduxjs/toolkit";
import user from "../modules/user";
import chatroom from "../modules/chatroom";
import mypage from "../modules/mypage";
import script from "../modules/script";
import  translate from "../modules/translate";

const store = configureStore({
  reducer: {
    user,
    chatroom,
    mypage,
    script,
    translate,},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false})
});

export default store;