import React, { useState ,useEffect} from 'react';
import styled from "../styles/Auth.module.css";
import authBg from "../image/background.jpg";
import authlg from "../image/MainLogo.png";
import AuthForm from ".//AuthForm";
import {GoogleBtn} from "../button/GoogleBtn";
import {GithubBtn} from "../button/GithubBtn";
import TypingEffect from "../typingEffect/TypingEffect";
function Auth({setUserObj}) {
    const [newAccount, setNewAccount] = useState(true);

    const toggleAccount = () => setNewAccount(!newAccount);

    return (
        <div className={styled.container}>
            <div className={styled.authImage}>
                <img src={authBg} alt="auth bg" />
            </div>
            <div className={styled.auth}>
                <div className={styled.nwitter__logo}>
                    <img src={authlg} alt="lg" />
                </div>
                <div className={styled.nwitter__notice}>
                    {/*<TypingEffect />*/}
                    <span style={{ color: '#6667ab' }}>창작을 </span>
                    <span> 자유롭게</span>
                </div>
                {newAccount ? (
                    <div className={styled.nwitter__info}>
                        <span>9Room 로그인하기</span>
                    </div>
                ) : (
                    <div className={styled.nwitter__info}>
                        <span>오늘 9Room에 가입하세요.</span>
                    </div>
                )}
                <AuthForm newAccount={newAccount} setUserObj={setUserObj}/>
                <div className={styled.authBtns}>
                    <GoogleBtn newAccount={newAccount} />
                    <GithubBtn newAccount={newAccount} />
                </div>
                {newAccount ? (
                    <div className={styled.auth__notice}>
                        <span>계정이 없으신가요?</span>
                        <div>
              <span onClick={toggleAccount} className={styled.authSwitch}>
                가입
              </span>
                            <span>하기</span>
                        </div>
                    </div>
                ) : (
                    <div className={styled.auth__notice}>
                        <span>이미 9Room에 가입하셨나요?</span>
                        <div>
              <span onClick={toggleAccount} className={styled.authSwitch}>
                로그인
              </span>
                            <span>하기</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Auth;