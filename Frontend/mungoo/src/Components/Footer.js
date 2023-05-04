import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import LoginModal from '../modal/LoginModal';
import JoinModal from '../modal/JoinModal';

function Footer({ onMyPageClick,onMainClose }) {
    const [user, setUser] = useState({});
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();

    const handleShowLoginModal = () => {
        setShowLoginModal(true);
    };

    const handleLoginSuccess = (user) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        onMainClose(); // MainClose 함수 호출
        setUser(user);
        setShowLoginModal(false);
    };
    const handleLogout = () => {
        sessionStorage.removeItem('user');
        setUser({});
        onMainClose(); // MainClose 함수 호출
    };
    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/');
        }
    }, [navigate]);

    return (
        <footer>
            {user && user.uid ? (
                <div>
                    <div>
                        <img alt="썸내일" />
                        <p>{user.uid} 님</p>
                    </div>
                    <div>
                        <button onClick={onMyPageClick}>마이페이지</button>
                        <button onClick={handleLogout}>로그아웃</button>
                    </div>
                </div>
            ) : (
                <div>
                    <button onClick={onMyPageClick}>마이페이지</button>
                    <button onClick={handleShowLoginModal} className="Button-Login">
                        로그인
                    </button>
                    <button> 회원가입 </button>
                </div>
            )}

            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <LoginModal onLoginSuccess={handleLoginSuccess} onClose={() => setShowLoginModal(false)} />
                </Modal.Body>
            </Modal>
        </footer>
    );
}
export default Footer;
