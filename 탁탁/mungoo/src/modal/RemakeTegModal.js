import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/RemakeModal.css';

const RemakeTegModal = ({ showPopup, setShowPopup, onSelectPosts }) => {
    // ...
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const PAGE_SIZE = 5;
    const API_URL = process.env.REACT_APP_API_URL;
    const [selectedPosts, setSelectedPosts] = useState([]);

    const handleOutsideClick = (e) => {
        if (e.target.className === 'layer-popup show') {
            setShowPopup(false);
        }
    };

    const closeModal = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
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
            const response = await axios.get(`${API_URL}/log/gettaglist`, { params });
            setData(response.data.content);
            setTotalPages(Math.ceil(response.data.content.length / PAGE_SIZE));
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };
    const handleSelectPost = (post) => {
        const index = selectedPosts.indexOf(post);
        let updatedPosts;
        if (index === -1) {
            updatedPosts = [...selectedPosts, post];
        } else {
            updatedPosts = [...selectedPosts.slice(0, index), ...selectedPosts.slice(index + 1)];
        }
        setSelectedPosts(updatedPosts);
        onSelectPosts(updatedPosts);
    };

    const pageData = data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
        <>
            <div className={`Remake layer-popup ${showPopup ? 'show' : ''}`} onClick={handleOutsideClick}>
                <div className="Remake layer-popup show">
                    <div className="Remake modal-dialog">
                        <div className="Remake modal-content" style={{ borderRadius: '10px 10px' }}>
                            <table border={1}>
                                <tbody>
                                {pageData.map((item, index) => (
                                    <tr key={item.lno}>
                                        <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                                        <td>{item.ptitle}</td>
                                        <td>{item.unickname}</td>
                                        <td>{item.regDate}</td>
                                        <td>
                                            <input type="checkbox" checked={selectedPosts.indexOf(item) !== -1} onChange={() => handleSelectPost(item)} />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="Remake pagination">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button type="button"
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
                    <button type="button" className="close-button" onClick={closeModal}>
                        X
                    </button>
                </div>
            </div>
        </>
    );
};

export default RemakeTegModal;