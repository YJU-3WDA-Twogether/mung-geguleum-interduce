import React, { useState ,useEffect} from 'react';
import PostController from './PostController';
import MainNavigation from "./MainNavigation";

import styled from "../styles/App.module.css";
function Main({isLoggedIn,userObj,handleLogout}) {
    const [selectedPost, setSelectedPost] = useState('Best');
    const [selectedMyPage, setSelectedMyPage] = useState("My");
    const [isMyPage, setIsMyPage] = useState(false);
    const [selectedPostUno, setSelectedPostUno] = useState(null); // 게시글의 uno 값

    const handleSelectPost = (postName) => {
        setSelectedPost(postName);
        setIsMyPage(false);
    };

    const onSelectMyPage = (myName) => {
        setSelectedMyPage(myName);
    };

    const handleMyPageClick = () => {
        setIsMyPage(true);
    };

    const handlePostClick = (uno) => {
        setIsMyPage(true);
        setSelectedPostUno(uno);
    };

    const MainClose = () => {
        setSelectedPost('Best');
        setIsMyPage(false);
        setSelectedPostUno(null); // 게시글의 uno 값 초기화
    };


    return (
        <div className={styled.container}>
            <>
                <MainNavigation onSelectPost={handleSelectPost} />
            </>

            <div className={styled.center__container}>
                <PostController
                    PostName={selectedPost}
                    handlePostClick={handlePostClick} // handlePostClick 함수 전달
                    selectedPostUno={selectedPostUno} // selectedPostUno 값을 전달
                    MainClose={MainClose}
                />
            </div>
            <div>
               <div> </div>
            </div>
        </div>
    );
}

export default Main;
