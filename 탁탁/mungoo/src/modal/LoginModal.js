import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginModal.css'
const API_URL = process.env.REACT_APP_API_URL;
const LoginModal = ({ onClose, onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        uid: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/user/login`, formData);
            localStorage.setItem('user', JSON.stringify(response.data));
            onLoginSuccess(response.data);
            alert('로그인에 성공하였습니다.');
            onClose();
        } catch (error) {
            console.error(error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    };
    return (
        <div className="login-container">
            <h2 className="login-h2">로그인 후 이용해주세요</h2>
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
            <div className="Login-SignButton">
                <button type="submit">회원가입</button>
            </div>
            <div className="Naver-Login">
                <button>네이버 로그인</button>
            </div>
            <div className="Kakao-Login">
                <button>카카오 로그인</button>
            </div>
        </div>
    );
};

export default LoginModal;