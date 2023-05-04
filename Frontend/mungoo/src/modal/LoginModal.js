import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginModal.css'
const API_URL = process.env.REACT_APP_API_URL;
const LoginModal = ({ showPopup, setShowPopup, onLoginSuccess }) => {

    const [formData, setFormData] = useState({
        uid: '',
        password: '',
    });

    const handleOutsideClick = (e) => {
        if (e.target.className === 'layer-popup show') {
            setShowPopup(false);
        }
    };

    const closeModal = () => {
        setShowPopup(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/user/login`, formData);
            sessionStorage.setItem('user', JSON.stringify(response.data));
            onLoginSuccess(response.data);
            console.log(JSON.parse(sessionStorage.getItem('user')));

            alert('로그인에 성공하였습니다.');
            closeModal();
        } catch (error) {
            console.error(error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    };


    return (
        <>
            <div className={`layer-popup ${showPopup ? 'show' : ''}`} onClick={handleOutsideClick}>
                <div className="layer-popup show">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ borderRadius: '10px 0 0 10px'}}>
                            <div className="login-container">
                                <h2>로그인</h2>
                                <form onSubmit={handleSubmit} className="Loginform">
                                    <div className="LoginInput">
                                        <input
                                            className="LoginInput"
                                            type="text"
                                            name="uid"
                                            placeholder="아이디"
                                            value={formData.uid}
                                            onChange={handleChange}
                                        />
                                        <input
                                            className="LoginInput"
                                            type="password"
                                            name="password"
                                            placeholder="비밀번호"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="LoginButton">
                                        <button type="submit">로그인</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <button className="close-button" onClick={closeModal}> X </button>
                </div>
            </div>
        </>
    );
};

export default LoginModal;