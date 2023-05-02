import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Post from '../Components/Post';
import Footer from '../Components/Footer';
import My from "../Components/My";
import MainNavigation from "./MainNavigation";
import MypageNavigation from "../Components/MypageNavigation";
function Main() {

    const [selectedPost, setSelectedPost] = useState('Best');
    const [selectedMyPage, setSelectedMyPage] = useState("My");
    const [isMyPage, setIsMyPage] = useState(false);
    const handleSelectPost = (postName) => { // 게시판 네비게이션 이동 값 받아오기
        setSelectedPost(postName);
        setIsMyPage(false);
    };

    const onSelectMyPage = (MyName) => { // 마이페이지 네비게이션 이동 값 받아오기
        setSelectedMyPage(MyName);
    };
    const handleMyPageClick = () => { // 마이페이지 네비게이션 활성
        setIsMyPage(true);
    };

    const MainClose = () => { // 메인으로 가는 버튼
        setSelectedPost('Best');
        setIsMyPage(false);
    };

    let content;
    let header;

    if (isMyPage) { // 마이페이지
        content = <My MyName={selectedMyPage} />;
        header = <MypageNavigation onSelectMyPage={onSelectMyPage}/>
    } else if (selectedPost) { // 게시판
        content = <Post PostName={selectedPost} />;
        header = <MainNavigation onSelectPost={handleSelectPost}/>
    }

    return (
        <div style={{ display: 'flex' }}>
            <div style={{width:450}}>
                <button onClick={MainClose}>메인으로 가는 버튼 만들기</button>
                {header}
            </div>
            <div style={{width:1400}}>
                {content}
            </div>
            <div style={{width:450}}>
                <Footer onMyPageClick={handleMyPageClick} />
            </div>
        </div>
    );
}

export default Main;