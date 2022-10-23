import {TFormValues} from "../types/data";
import {initialState} from "../types/userTypes";
import { setCookie, deleteCookie, getCookie } from "../../utils/utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../utils/api";


export const sendUserData = createAsyncThunk(
    "user/sendUserData",
    (form:TFormValues) => api.sendUserDataToServer(form)
)
export const sendLoginData = createAsyncThunk(
    "user/sendLoginData",
    (form:TFormValues) => api.sendLoginRequestToServer(form)
)

export const sendLogoutData = createAsyncThunk(
    "user/sendLogoutData",
    () => api.sendLogoutRequestToServer()
)

export const sendEmailResetValue = createAsyncThunk(
    "user/sendEmailResetValue",
    (form:TFormValues) => api.sendForgoutPasswordRequest(form)
)

export const sendNewPassword = createAsyncThunk(
    "user/sendNewPassword",
    (form:TFormValues) => api.sendResetPasswordRequest(form)
)

export const sendUpdateUserData = createAsyncThunk(
    "user/sendUpdateUserData",
    (form:TFormValues) => api.sendUpdateProfileData(form)
)

export const sendUpdateToken = createAsyncThunk(
    "user/sendUpdateToken",
    () => api.updateToken()
)

export const getUserInfo = createAsyncThunk(
    "user/getUserInfo",
    () => api.getUserRequest()
)

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(sendUserData.pending, state => {
                state.userRequest = true;
            })
            .addCase(sendUserData.fulfilled, (state, action) => {
                const { accessToken, refreshToken, user } = action.payload;
                const authToken = accessToken.split("Bearer ")[1];
                setCookie("token", authToken);
                localStorage.setItem("refreshToken", refreshToken);
                state.userRequest = false;
                state.user = user;
            })
            .addCase(sendUserData.rejected, state => {
                state.userRequest = false;
            })
            .addCase(sendLoginData.pending, state => {
                state.loginRequest = true;
            })
            .addCase(sendLoginData.fulfilled, (state, action) => {
                const { accessToken, refreshToken, user } = action.payload;
                const authToken = accessToken.split("Bearer ")[1];
                setCookie("token", authToken);
                localStorage.setItem("refreshToken", refreshToken);
                state.user = user;
            })
            .addCase(sendLoginData.rejected, state => {
                state.loginRequest = false;
                state.loginFailed = true;
            })
            .addCase(sendLogoutData.pending, state => {
                state.logoutRequest = true;
            })
            .addCase(sendLogoutData.fulfilled, state => {
                localStorage.removeItem("refreshToken"); //проверить работает ли
                deleteCookie("token");
                state.logoutRequest = false;
                state.logoutSuccess = true;
                state.logoutFailed  = false;
                state.user = {name: "", email: ""};
            })
            .addCase(sendLogoutData.rejected, state => {
                state.logoutRequest = false;
                state.logoutSuccess = false;
                state.logoutFailed  = true;
            })
            .addCase(sendEmailResetValue.pending, state => {
                state.forgoutRequest = true;
                state.forgoutFailed = false;
            })
            .addCase(sendEmailResetValue.fulfilled, (state, action) => {
                state.forgoutRequest = false;
                state.forgoutSuccess = true;
                state.forgoutFailed = false;
            })
            .addCase(sendEmailResetValue.rejected, (state, action) => {
                //const {success} = action.payload
                state.forgoutRequest = false;
                state.forgoutSuccess = false;
                state.forgoutFailed = true;

            })
            .addCase(sendNewPassword.pending, state => {
                state.resetRequest = true;
                state.resetSuccess = false;
                state.resetFailed = false;
            })
            .addCase(sendNewPassword.fulfilled, state => {
                state.resetRequest = false;
                state.resetSuccess = true;
                state.resetFailed = false;
            })
            .addCase(sendNewPassword.rejected, state => {
                state.resetRequest = false;
                state.resetSuccess = false;
                state.resetFailed = true;
            })
            .addCase(sendUpdateUserData.pending, state => {
                state.userUpdateRequest = true;
                state.userUpdateFailed = false;
            })
            .addCase(sendUpdateUserData.fulfilled, (state, action) => {
                const { user } = action.payload;
                state.userUpdateRequest = false;
                state.userUpdateSuccess = true;
                state.user = user;
                state.userUpdateFailed = false;
            })
            .addCase(sendUpdateUserData.rejected, state => {
                state.userUpdateRequest = false;
                state.userUpdateSuccess = false;
                state.userUpdateFailed = true;
            })
            .addCase(sendUpdateToken.pending, state => {
                state.tokenRequest = true;
                state.tokenFailed = false;
            })
            .addCase(sendUpdateToken.fulfilled, (state, action) => {
                const { accessToken, refreshToken } = action.payload;
                const authToken = accessToken.split("Bearer ")[1];
                setCookie("token", authToken);
                localStorage.setItem("refreshToken", refreshToken);
                state.tokenRequest = false;
                state.tokenSuccess = true;
                state.tokenFailed = false;
            })
            .addCase(sendUpdateToken.rejected, state => {
                state.tokenRequest = false;
                state.tokenSuccess = false;
                state.tokenFailed = true;
            })
            .addCase(getUserInfo.pending, state => {
                state.userInfoRequest = true;
                state.userInfoFailed = false;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                const { user } = action.payload;
                state.userInfoSuccess = true;
                state.user = user;
                state.userInfoRequest = false;
                state.userInfoFailed = false;
            })
            .addCase(getUserInfo.rejected, state => {
                state.userInfoSuccess = false;
                state.userInfoRequest = false;
                state.userInfoFailed = true;
            })
    }
})

export default userSlice.reducer;