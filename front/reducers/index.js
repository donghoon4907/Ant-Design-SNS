import { combineReducers } from "redux";
import user from "./user";
import post from "./post";

export default combineReducers({ user, post });

/**
 * Immer pattern
 *
 * 1. concat => single data: push / multiple datas: forEach and push
 * 2. filter => filter or splice
 */
