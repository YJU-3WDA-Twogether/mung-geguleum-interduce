import React, {useState,useEffect} from 'react';
import PageCreate from "../Components/PostCreate";
import PageView from "../Components/PageView";
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
                <PageCreate pageNum={3}/>
                {/*<PageView />*/}
            </>
        );
    }, []);

    return <div>{pageView}</div>;
}
export default StoriesPage;