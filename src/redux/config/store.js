import { configureStore , getDefaultMiddleware  } from "@reduxjs/toolkit";
import user from "../modules/user";
import chatroom from "../modules/chatroom";

const store = configureStore({
  reducer: {
    user,
    chatroom,},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false})
});

export default store;