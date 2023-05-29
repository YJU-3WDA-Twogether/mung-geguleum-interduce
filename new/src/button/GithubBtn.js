import React from "react";

import styled from "../styles/Auth.module.css";
import { AiFillGithub } from "react-icons/ai";

export const GithubBtn = ({ newAccount }) => {

    return (
        <button  name="github" className={styled.authBtn}>
            <AiFillGithub />
            {newAccount ? "Github로 로그인 하기" : "Github로 가입하기"}
        </button>
    );
};