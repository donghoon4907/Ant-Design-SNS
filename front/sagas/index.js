import { all, call } from "redux-saga/effects";
import user from "./user";
import post from "./post";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api";

export default function*() {
  yield all([call(user), call(post)]);
}
