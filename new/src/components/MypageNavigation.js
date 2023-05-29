import React from 'react';
import '../styles/MyPageNavigation.css';
function MypageNavigation({ onSelectMyPage }) {

    return (
        <div className="MyPageNavigation-Header">
        <nav className="MyPageNavigation-Button">
            <ul>
                <li>
                    <button onClick={() => onSelectMyPage('My')}>내활동</button>
                </li>
                <li>
                    <button onClick={() => onSelectMyPage('MyLog')}>내 기록</button>
                </li>
                <li>
                    <button onClick={() => onSelectMyPage('MyPostView')}>게시글 조회</button>
                </li>
                <li>
                    <button onClick={() => onSelectMyPage('MyModify')}>정보 수정</button>
                </li>
            </ul>
        </nav>
        </div>
    );
}

export default MypageNavigation;
