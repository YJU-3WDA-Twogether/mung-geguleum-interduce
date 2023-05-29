import React, {useEffect, useState} from 'react';
import PostRemakeCreate from "../components/PostRemakeCreate";
import {TopCategory} from "../topCatgory/TopCategory";
import {HiOutlineSparkles} from "react-icons/hi";

function RemakePage(){
    const [pageView, setPageView] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            // setPageView(<PageView />);
            return;
        }
        setPageView(
            <>
                <TopCategory
                    home={"home"}
                    text={"재창작"}
                    iconName={<HiOutlineSparkles />}
                />
                <PostRemakeCreate/>
                {/*<PageView />*/}
            </>
        );
    }, []);

    return <div>{pageView}</div>;
}

export default RemakePage;