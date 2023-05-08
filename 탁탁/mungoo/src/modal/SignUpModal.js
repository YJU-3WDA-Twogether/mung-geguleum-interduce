import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate를 import 합니다.
import '../styles/Sign.css';
const API_URL = process.env.REACT_APP_API_URL;

const SignUpModal = () => {


    const [formData, setFormData] = useState({
        uid: '',
        uname: '',
        password: '',
        password2: '',
        email: '',
        nickname:'',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password2) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/user/create`,formData);
            console.log(response.data);

            if (response.data === true) {
                alert('회원가입이 완료되었습니다.');
                navigate('/'); // 회원가입 성공 후 로그인 페이지로 이동합니다.
            } else if (response.data === false) {
                alert('회원가입 중 오류가 발생했습니다.');
            } else {
                alert('알 수 없는 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error(error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="signup-container">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit} className="Signform">
                <div className="SignInput">
                    <input
                        type="text"
                        name="uid"
                        placeholder="아이디"
                        value={formData.uid}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="uname"
                        placeholder="이름"
                        value={formData.uname}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password2"
                        placeholder="비밀번호 확인"
                        value={formData.password2}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="이메일"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="nickname"
                        placeholder="닉네임"
                        value={formData.nickname}
                        onChange={handleChange}
                    />
                </div>
                <div className="SignButton">
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default SignUpModal;
