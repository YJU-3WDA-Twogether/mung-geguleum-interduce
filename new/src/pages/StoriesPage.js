import React, {useState,useEffect} from 'react';
import PageCreate from "../components/PostCreate";
import PageView from "../components/PageView";
import {TopCategory} from "../topCatgory/TopCategory";
import {HiOutlineSparkles} from "react-icons/hi";
function StoriesPage() {
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
                    text={"놀이터"}
                    iconName={<HiOutlineSparkles />}
                />
                <PageCreate pageNum={3}/>
                <PageView/>
            </>
        );
    }, []);

    return <div>{pageView}</div>;
}
export default StoriesPage;