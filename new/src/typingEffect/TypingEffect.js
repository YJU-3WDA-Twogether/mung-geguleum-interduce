import React, { useEffect, useState } from 'react';

const TypingEffect = () => {
    const [text, setText] = useState('');
    const words = '창작';
    const typingDelay = 320;
    const resetDelay = 3000; // 초기화 딜레이 시간 (5초)

    useEffect(() => {
        let currentIndex = 0;
        let isResetting = false;

        const typingInterval = setInterval(() => {
            if (isResetting) {
                setText((prevText) => prevText.slice(0, -1)); // 마지막 글자 제거
            } else {
                setText((prevText) => prevText + words[currentIndex]);
                currentIndex++;
                if (currentIndex === words.length) {
                    isResetting = true;
                    currentIndex = 0;
                    setTimeout(() => {
                        isResetting = false;
                    }, resetDelay);
                }
            }
        }, typingDelay);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <>
            <span style={{ color: '#6667ab' }}>{text}</span>
            <span> 자유롭게</span>
        </>
    );
};

export default TypingEffect;
