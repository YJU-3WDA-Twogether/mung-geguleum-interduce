import { useNavigate } from "react-router-dom";
import styled from "../styles/TopCategory.module.css";

export const TopCategory = ({
                                creatorInfo,
                                iconName,
                                iconName2,
                                text,
                                home,
                                myNweets,
                                onLogOutClick,
                                MainClose,
                            }) => {
    const navigate  = useNavigate();

    return (
        <>
            {home === "home" ? (
                <div className={styled.main__category}>
                    <div className={styled.main_text}>
                        <h2>{text}</h2>
                    </div>
                    <div className={styled.effect_icon}> 알람 모달 추가 {iconName}</div>
                </div>
            ) : (
                <div className={styled.minor__category}>
                    <div className={styled.minor__icon} onClick={MainClose}>
                        {iconName}
                    </div>
                    <div className={styled.userInfo}>
                        <p className={styled.category__name}>{text}</p>
                    </div>
                    {iconName2 && (
                        <div className={styled.minor__iconExit} onClick={onLogOutClick}>
                            {iconName2}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};