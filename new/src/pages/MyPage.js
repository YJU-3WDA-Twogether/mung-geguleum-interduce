import React, {useCallback, useEffect, useState} from 'react';
import styled from "../styles/Mypage.module.css";
import pfile from "../image/Profile.jpg";
import bgfile from "../image/background.jpg";
import {BsCalendar3}  from "react-icons/bs";
import MyPageBtn from "../button/MyPageBtn";
import MyLog from "./MyLog";
import MyPostView from "./MyPostView";
import {IoArrowBackOutline} from "react-icons/io5";
import {IoMdExit} from "react-icons/io";
import {TopCategory} from "../topCatgory/TopCategory";
function MyPage({ handlePostClick, selectedPostUno ,MainClose}) {

    const [user, setUser] = useState({});
    const [selected, setSelected] = useState(1);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log(JSON.parse(storedUser))
        }
    }, []);

    const handleClick = (n) => {
        setSelected(n); // Update the selected value
        console.log(selected)
    };

    return (
        <section className={styled.container}>
            <div className={styled.main__container}>

                <TopCategory
                    text={'유저아이디'}
                    iconName={<IoArrowBackOutline />}
                    iconName2={<IoMdExit />}
                    MainClose={MainClose}
                />
                <div className={styled.setUserInfo}>
                    <div className={styled.backImage}>
                        <img src={bgfile} alt="배경사진" />
                    </div>

                    <div className={styled.profile}>
                        <div className={styled.profile__edit}>
                            <div className={styled.profile__image}>
                                <img src={pfile} alt="프로필 이미지" />
                            </div>
                            <div className={styled.profile__editBtn}>
                                프로필 수정
                            </div>
                            {user.uno === selectedPostUno ? (
                                <div className={styled.profile__editBtn}>
                                    프로필 수정
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className={styled.profile__info}>
                            <div className={styled.userInfo}>
                                <p>{user.nickname}</p>
                                <p>@{user.uid}</p>
                            </div>
                            <div className={styled.profile__desc}>
                                <p>안녕하세요</p>
                            </div>
                            <div className={styled.profile__createdAt}>
                                <BsCalendar3 />
                                <p>가입일 :</p>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className={styled.categoryList}>
                    <MyPageBtn
                        num={1}
                        text={"내 활동"}
                        selected={selected}
                        onClick={() => handleClick(1)}
                    />
                    <MyPageBtn
                        num={2}
                        text={"내 기록"}
                        selected={selected}
                        onClick={() => handleClick(2)}
                    />
                    <MyPageBtn
                        num={3}
                        text={"내 게시글"}
                        selected={selected}
                        onClick={() => handleClick(3)}
                    />
                </nav>
                {selected === 1 && <MyLog selectedPostUno={selectedPostUno} />}
                {selected === 2 && <MyPostView />}
                {selected === 3 && <MyPostView />}
            </div>
        </section>
    );
}
export default MyPage;