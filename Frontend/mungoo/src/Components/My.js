import React from 'react';
import MyPage from "../pages/MyPage";
import MyLog from "../pages/MyLog";
function My({ MyName }) {

    let page;

    switch (MyName) {
        case 'My':
            page = <MyPage />;
            break;
        case 'Mylog':
            page = <MyLog />;
            break;
        default:
            page = <MyPage />;
            break;
    }
    return page;
}
export default My;