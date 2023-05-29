import React, { useState } from 'react';
import MyPage from "../pages/MyPage";
import MyLog from "../pages/MyLog";
import MyPostView from "../pages/MyPostView";

function MyController({ MyName, handlePostClick,selectedPostUno}) {

    let page;

    switch (MyName) {
        case 'My':
            page = <MyPage handlePostClick={handlePostClick} selectedPostUno={selectedPostUno} />;
            break;
        case 'MyLog':
            page = <MyLog selectedPostUno={selectedPostUno}/>;
            break;
        case 'MyPostView':
            page = <MyPostView />;
            break;
    }

    console.log('selectedPostUno:', selectedPostUno); // Add this line

    return page;
}

export default MyController;
