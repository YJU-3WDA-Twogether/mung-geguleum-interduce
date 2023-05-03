import React from 'react';
import BestPage from "../pages/BestPage";
import MusicPage from "../pages/MusicPage";
import StoriesPage from "../pages/StoriesPage";
import RemakePage from "../pages/RemakePage";
function PostController({ PostName }) {
    let page;

    switch (PostName) {
        case 'Best':
            page = <BestPage />;
            break;
        case 'Music':
            page = <MusicPage />;
            break;
        case 'Stories':
            page = <StoriesPage />;
            break;
        case 'Remake':
            page = <RemakePage />;
            break;
        default:
            page = <BestPage />;
            break;
    }
    return page;
}

export default PostController;