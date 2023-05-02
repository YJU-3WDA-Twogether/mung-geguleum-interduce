import React from 'react';

function MypageNavigation({ onSelectMyPage }) {

    return (
        <nav>
            <ul>
                <li>
                    <button onClick={() => onSelectMyPage('My')}>내활동</button>
                </li>
                <li>
                    <button onClick={() => onSelectMyPage('Mylog')}>내 기록</button>
                </li>
                <li>
                    <button onClick={() => onSelectMyPage('Mypost')}>게시글 조회</button>
                </li>
                <li>
                    <button onClick={() => onSelectMyPage('Myud')}>정보 수정</button>
                </li>

            </ul>
        </nav>
    );
}

export default MypageNavigation;
