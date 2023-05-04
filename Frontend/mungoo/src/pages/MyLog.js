import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/MyLog.css';

const API_URL = process.env.REACT_APP_API_URL;
//  추후 예정
/*
*   달력 css
*   버그 수정
*       - 달력 달마다 조회
* */
function MyLog() {
    const [value, setValue] = useState(new Date());
    const [year, setYear] = useState(value.getFullYear());
    const [month, setMonth] = useState(value.getMonth() + 1);
    const [result, setResult] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const selectedData = result[selectedDate];

    const [user, setUser] = useState({});

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const displayMonth = String(month).padStart(2, '0'); // 월을 두 자리 숫자로 만듦
    const displayDate = `${year}-${displayMonth}`; // yyyy-mm 형식으로 조합

    useEffect(() => {
        const params = {
            uno: user.uno,
            date: displayDate,
        };
        console.log(params)
        fetchData(params);
    }, [displayDate, user]);

    const fetchData = async (params) => {
        try {
            const response = await axios.get(`${API_URL}/log/getlist`, { params });
            const data = response.data.content;

            const newResult = {};

            data.forEach((item) => {
                const datetimeString = item.regDate;
                const dateObj = new Date(datetimeString);
                const dateString = dateObj.toISOString().slice(0, 10);

                if (!newResult[dateString]) {
                    newResult[dateString] = [];
                }
                newResult[dateString].push({
                    title: item.ptitle,
                    nickname: item.punickname,
                    status: item.lsname,
                });
            });
            setResult(newResult);
        } catch (error) {
            console.error(error);
            setResult({});
        }
    };

    const tileContent = ({ date, view }) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const dateStr = new Date(year, month, day + 1).toISOString().slice(0, 10);
        if (view === 'month' && result[dateStr]) {
            return <div className="dot"></div>;
        }
        return null;
    };

    const onChange = (newValue) => {
        setValue(newValue);
        setYear(newValue.getFullYear());
        setMonth(newValue.getMonth() + 1);
        setSelectedDate(new Date(value.getFullYear(), value.getMonth(), value.getDate()+1).toISOString().slice(0, 10));
    };

    useEffect(() => {
        setYear(value.getFullYear());
        setMonth(value.getMonth() + 1);
        setSelectedDate(new Date(value.getFullYear(), value.getMonth(), value.getDate() +1).toISOString().slice(0, 10));
    }, [value]);

    return (
        <div>
            <Calendar onChange={onChange} value={value} calendarType="US" tileContent={tileContent} locale="ko-KR" />


            <p>선택한 날짜: {value.toLocaleDateString()}</p>
            <p>현재 월: {year}년 {displayMonth}월</p>
            {Array.isArray(selectedData) && selectedData.length > 0 ? (
                <table border={1}>
                    <thead>
                    <tr>
                        <th>제목</th>
                        <th>닉네임</th>
                        <th>상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>{item.nickname}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>해당 날짜에 데이터가 없습니다.</p>
            )}
        </div>
    );
}

export default MyLog;
