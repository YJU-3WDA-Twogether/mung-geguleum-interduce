import React from 'react';
import BestPage from "../pages/BestPage";
import MusicPage from "../pages/MusicPage";
import StoriesPage from "../pages/StoriesPage";
import RemakePage from "../pages/RemakePage";
import MyPage from "../pages/MyPage";

function PostController({ PostName, handlePostClick,selectedPostUno,MainClose }) {
    let page;

    switch (PostName) {
        case 'Best':
            page = <BestPage handlePostClick={handlePostClick} />;
            break;
        case 'Music':
            page = <MusicPage handlePostClick={handlePostClick} />;
            break;
        case 'Stories':
            page = <StoriesPage handlePostClick={handlePostClick} />;
            break;
        case 'Remake':
            page = <RemakePage handlePostClick={handlePostClick} />;
            break;
        case 'My':
            page = <MyPage handlePostClick={handlePostClick} selectedPostUno={selectedPostUno} MainClose={MainClose}/>;
            break;
    }

    return page;
}

export default PostController;
