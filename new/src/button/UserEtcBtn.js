import { BiCheck } from "react-icons/bi";
import { IoMdExit } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";
import pfile from "../image/Profile.jpg";
import styled from "../styles/UserEtcBtn.module.css";
import {useEffect, useState} from "react";

const UserEtcBtn = ({ creatorInfo, userEtc, onLogOutClick }) => {

    const [user, setUser] = useState({});
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log(JSON.parse(storedUser))
        }
    }, []);

    return (
        <div className={styled.container__box}>
            <div className={styled.container}>
                <div className={`${styled.btn} ${styled.updateBtn}`}>
                    <div className={styled.leftBar__userInfo}>
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
                            <BiCheck />
                        </div>
                    </div>
                </div>
                <div
                    className={`${styled.btn} ${styled.deleteBtn}`}
                    onClick={onLogOutClick}
                >
                    <div className={styled.userInfo__etc}>
                        <IoMdExit />
                    </div>
                    <p>로그아웃</p>
                </div>
            </div>
            <div className={styled.box__triangle}>
                <GoTriangleDown />
            </div>
        </div>
    );
};

export default UserEtcBtn;