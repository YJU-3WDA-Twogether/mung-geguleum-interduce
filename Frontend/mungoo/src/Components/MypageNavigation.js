import React from 'react';

function MypageNavigation({ onSelectMyPage }) {

    return (
        <nav>
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
    );
}

export default MypageNavigation;
