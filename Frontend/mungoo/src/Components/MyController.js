import React from 'react';
import MyPage from "../pages/MyPage";
import MyLog from "../pages/MyLog";
import MyPostView from "../pages/MyPostView";
import MyModify from "../pages/MyModify";
function MyController({ MyName }) {

    let page;

    switch (MyName) {
        case 'MyController':
            page = <MyPage />;
            break;
        case 'MyLog':
            page = <MyLog />;
            break;
        case 'MyPostView':
            page = <MyPostView />;
            break;
        case 'MyModify':
            page = <MyModify />;
            break;
        default:
            page = <MyPage />;
            break;
    }
    return page;
}
export default MyController;