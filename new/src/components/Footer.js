import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

function Footer({ onMyPageClick,onMainClose ,handleLogout}) {
    const [user, setUser] = useState({});
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const navigate = useNavigate();



    const handleLoginSuccess = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        onMainClose();
        setUser(user);
        setShowLoginModal(false);
        window.location.reload();
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <footer>
            {user && user.uid ? (
                <div className="LoginPage-Header">
                    <div>
                        <img src={process.env.PUBLIC_URL + '/Profile.jpg'} alt="로고 이미지" className="Logo-Image" style={{ width: "50px", height: "auto", marginLeft:"30px" ,color:"#ffffff"}}/>
                        <p>{user.uid} 님</p>
                    </div>
                    <div className="LoginPage-Button">
                        <button onClick={onMyPageClick}>마이페이지</button>
                        <button onClick={handleLogout}>로그아웃</button>
                    </div>
                </div>
            ) : (
                <div className="LoginHeader-SignHeader">

                </div>
            )}

        </footer>
    );
}
export default Footer;
