import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MyLogModal.css';

const MyLogModal = ({ showPopup, setShowPopup }) => {
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const PAGE_SIZE = 5;
    const API_URL = process.env.REACT_APP_API_URL;

    const handleOutsideClick = (e) => {
        if (e.target.className === 'layer-popup show') {
            setShowPopup(false);
        }
    };
    const closeModal = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const params = {
            uno: user.uno,
        };
        fetchData(params);
    }, [user]);

    const fetchData = async (params) => {
        try {
            const response = await axios.get(`${API_URL}/log/getdownlist`, { params });
            setData(response.data.content);
            setTotalPages(Math.ceil(response.data.content.length / PAGE_SIZE));
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const pageData = data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
        <>
            <div className={`layer-popup ${showPopup ? 'show' : ''}`} onClick={handleOutsideClick}>
                <div className="layer-popup show">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ borderRadius: '10px 10px' }}>
                            <table border={1}>
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>다운로드한 게시글</th>
                                    <th>받은 사람</th>
                                    <th>다운한 시간</th>
                                </tr>
                                </thead>
                                <tbody>
                                {pageData.map((item, index) => (
                                    <tr key={item.lno}>
                                        <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                                        <td>{item.ptitle}</td>
                                        <td>{item.unickname}</td>
                                        <td>{item.regDate}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="pagination">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        className={`page-button ${page === currentPage ? 'active' : ''}`}
                                        onClick={() => handlePageClick(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className="close-button" onClick={closeModal}>
                        X
                    </button>
                </div>
            </div>
        </>
    );
};

export default MyLogModal;
