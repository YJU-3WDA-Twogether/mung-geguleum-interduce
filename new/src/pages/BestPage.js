import React, { useState } from 'react';
import '../styles/PageModal.css';
import PostView from "../components/PageView";
import {TopCategory} from "../topCatgory/TopCategory";
import {HiOutlineSparkles} from "react-icons/hi";


const BestPage = ({handlePostClick }) => {
    const handleClick  = (uno) => {
        handlePostClick(uno);
        console.log('Post clicked:', uno);
    };

    return (
        <>
            <TopCategory
                home={"home"}
                text={"베스트"}
                iconName={<HiOutlineSparkles />}
            />
            <PostView handlePostClick={handleClick } />
        </>
    );
};
export default BestPage;
