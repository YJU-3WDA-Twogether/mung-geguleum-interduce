import React, {useEffect, useState} from 'react';
import PostRemakeCreate from "../Components/PostRemakeCreate";

function RemakePage(){
    const [pageView, setPageView] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (!storedUser) {
            // setPageView(<PageView />);
            return;
        }
        setPageView(
            <>
                <PostRemakeCreate/>
                {/*<PageView />*/}
            </>
        );
    }, []);

    return <div>{pageView}</div>;
}

export default RemakePage;