import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import LoginModal from '../modal/LoginModal';
import SignUpModal from "../modal/SignUpModal";
import '../styles/Footer.css';
import '../styles/LoginModal.css';


function Footer({ onMyPageClick,onMainClose }) {
    const [user, setUser] = useState({});
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const navigate = useNavigate();


    const handleShowLoginModal = () => {
        setShowLoginModal(true);
    };

    const handleClose = () => {
        setShowLoginModal(false);
    };

    const handleShowSignUpModal = () => {
        setShowSignUpModal(true);
    };

    const handleCloseSignUpModal = () => {
        setShowSignUpModal(false);
    };



    const handleLoginSuccess = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        onMainClose(); // MainClose 함수 호출
        setUser(user);
        setShowLoginModal(false);
        window.location.reload();
    };
    const handleLogout = async () => {
        localStorage.clear();
        setUser({});
        console.log(user); // 이 시점에서는 user 상태가 업데이트 되지 않음
        onMainClose();
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
                    <button onClick={handleShowLoginModal} className="Button-Login">로그인</button>
                    <button onClick={handleShowSignUpModal}>회원가입</button>
                </div>
            )}
            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} size="sm" style={{ height: '750px' }} className='Login-Modal' >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <LoginModal onLoginSuccess={handleLoginSuccess} onClose={() => setShowLoginModal(false)} />
                </Modal.Body>
            </Modal>
            <Modal show={showSignUpModal} onHide={handleCloseSignUpModal} size="lg" style={{  height: '800px' }}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body><SignUpModal /></Modal.Body>
            </Modal>
        </footer>
    );
}
export default Footer;
