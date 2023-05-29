import React, { useEffect, useState } from 'react';
import styled from "./styles/App.module.css";
import Routers from './routes/Routers';

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserObj(JSON.parse(storedUser));
        }
        setInit(true);
    }, []);

    const handleLogout = async () => {
        localStorage.clear();
        setUserObj(null);
    };

    return (
        <>
            {init ? (
                <Routers isLoggedIn={Boolean(userObj)} userObj={userObj} handleLogout={handleLogout} setUserObj={setUserObj}/>
            ) : (
                <div className={styled.render__loading}>
                   로딩
                </div>
            )}
        </>
    );
}

export default App;
