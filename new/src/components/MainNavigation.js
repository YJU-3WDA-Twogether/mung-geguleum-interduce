import React, {useEffect, useRef, useState} from 'react';
import styled from '../styles/MainNavigation.module.css'
import { BsFire,BsPersonFill } from "react-icons/bs";
import { SiApplemusic} from "react-icons/si";
import { VscGitPullRequestCreate} from "react-icons/vsc";
import { TfiWrite} from "react-icons/tfi";
import {FiMoreHorizontal} from "react-icons/fi";
import pfile from "../image/Profile.jpg";

import UserEtcBtn from "../button/UserEtcBtn";
import {useNweetEctModalClick} from "../hooks/useNweetEctModalClick";
import {useNavigate} from "react-router-dom";

function MainNavigation({ onSelectPost, MainClose }) {
    const userEtcRef = useRef();
    const navigate  = useNavigate();

    const [user, setUser] = useState({});


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const { nweetEtc: userEtc, setNweetEtc: setUserEtc } =
        useNweetEctModalClick(userEtcRef);
    const toggleUserEtc = () => {
        setUserEtc((prev) => !prev);
    };
    const onLogOutClick = () => {
        const ok = window.confirm("로그아웃 하시겠어요?");
        if (ok) {
            localStorage.clear();
            setUser({});
            navigate("/auth");
        }
    };
    return (
        <>
            <section className={styled.container}>
            <div className={styled.wrapper}>
                <div className={styled.leftBar__category}>
                    <div className={styled.leftBar__logobox}>
                        <div className={styled.leftBar__logo}>
                            <img
                                src={process.env.PUBLIC_URL + '/MainLogo.png'}
                                alt="로고 이미지"
                                className="Logo-Image"
                                style={{ width: '100px', height: 'auto', marginLeft: '10px' }}
                                onClick={MainClose}
                            />
                        </div>
                    </div>
                    <nav className={styled.leftBar__container}>
                        <ul>
                            <li>
                                <div className={styled.leftBar__list} onClick={() => onSelectPost('Best')}>
                                    <BsFire style={{color : "#6667ab"}}/>
                                    <span>
                                       <b>베스트 모음</b>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className={styled.leftBar__list} onClick={() => onSelectPost('Music')}>
                                    <SiApplemusic  style={{color : "#6667ab"}}/>
                                    <span>
                                       <b>음악</b>
                                    </span>
                                </div>

                            </li>
                            <li>
                                <div className={styled.leftBar__list} onClick={() => onSelectPost('Remake')}>
                                    <VscGitPullRequestCreate style={{color : "#6667ab"}}/>
                                    <span >
                                       <b>재창작</b>
                                    </span>
                                </div>

                            </li>
                            <li>
                                <div className={styled.leftBar__list} onClick={() => onSelectPost('Stories')}>
                                    <TfiWrite style={{color : "#6667ab"}}/>
                                    <span>
                                       <b>놀이터</b>
                                    </span>
                                </div>
                            </li>

                            <li>
                                <div className={styled.leftBar__list} onClick={() => onSelectPost('My')}>
                                    <BsPersonFill  style={{color : "#6667ab"}}/>
                                    <span>
                                       <b>마이페이지</b>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div style={{ position: "relative" }} ref={userEtcRef}>
                    {userEtc && (
                        <UserEtcBtn
                            onLogOutClick={onLogOutClick}
                            creatorInfo={1}
                        />
                    )}
                    <section className={styled.leftBar__user}>
                        <div className={styled.leftBar__userInfo} onClick={toggleUserEtc}>
                            <div className={styled.userInfo__profile}>
                                <img
                                    src={pfile}
                                    alt="profileImg"
                                    className={styled.profile__image}
                                />
                            </div>
                            <div className={styled.userInfo__name}>
                                <p>{user.nickname}</p>
                                <p>@{user.uid}</p>
                            </div>
                            <div className={styled.userInfo__etc}>
                                <FiMoreHorizontal/>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            </section>
        </>
    );
}

export default MainNavigation;
