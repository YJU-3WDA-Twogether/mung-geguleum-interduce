import React, { useEffect, useState } from 'react';
import Main from '../components/Main';
import Auth from '../components/Auth';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function Routers({ isLoggedIn, userObj, handleLogout,setUserObj }) {
    return (
        <Router>
            <Routes>
                {isLoggedIn ? (
                    <Route
                        path="/"
                        element={<Main isLoggedIn={isLoggedIn} userObj={userObj} handleLogout={handleLogout} setUserObj={setUserObj}/>}
                    />
                ) : (
                    <Route path="/" element={<Navigate to="/auth" />} />
                )}
                <Route path="/auth" element={<Auth setUserObj={setUserObj} />} />
            </Routes>
        </Router>
    );
}

export default Routers;
