import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../styles/MyPageBtn.module.css";

const MyPageBtn = ({num, text , selected}) => {
    const [size, setSize] = useState(null);

    return (
        <div
            className={`${style.container} ${size && style.sizeContainer}`}
        >
            <div
                className={`${style.btnBox} ${selected === num && style.selectedBox}`}
            >
                <p>{text}</p>
            </div>
        </div>
    );
};

export default MyPageBtn;