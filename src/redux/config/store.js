import { configureStore } from "@reduxjs/toolkit";
import user from "../modules/user";
import chatroom from "../modules/chatroom";

const store = configureStore({
  reducer: {
    user,
    chatroom,},
});

export default store;