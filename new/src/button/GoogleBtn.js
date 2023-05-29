import React from "react";

import { FcGoogle } from "react-icons/fc";
import styled from "../styles/Auth.module.css";

export const GoogleBtn = ({ newAccount }) => {

    return (
        <button name="google" className={styled.authBtn}>
            <FcGoogle />
            {newAccount ? "Google로 로그인 하기" : "Google로 가입하기"}
        </button>
    );
};