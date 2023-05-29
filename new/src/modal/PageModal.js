import React,{useEffect,useState} from 'react';
import '../styles/PageModal.css';
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const PageModal = ({ showPopup, setShowPopup, postId}) => { // 상태값과 함수 전달받음

    const [postData, setPostData] = useState(null);
    const handleOutsideClick = (e) => {
        if (e.target.className === 'layer-popup show') {
            setShowPopup(false);
        }
    };

    const closeModal = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        const postread = async () => {
            try {
                const response = await axios.get(`${API_URL}/post/read/${postId}`);
                const data = response.data;
                setPostData(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching node data:', error);
            }
        };

        if (postId) {
            postread();
        } else {
            setPostData(null);
        }
    }, [postId]);
    return (
        <>
            <div className={`layer-popup ${showPopup ? 'show' : ''}`} onClick={handleOutsideClick}>
                <div className="layer-popup show">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ borderRadius: '10px 0 0 10px'}}>
                            {postData && (
                                <>
                                    {postData.file.map((item, index) => (
                                        <div key={index}>
                                            {item.fsname.match(/.(jpg|jpeg|png|gif)$/i) ? (
                                                <div className="img-wrap">
                                                    <img src={`${API_URL}/file/read/${item.fno}`} alt="file" style={{ width: 600, height: 650 }} />
                                                </div>
                                            ) : item.fsname.match(/.(mp4|webm)$/i) ? (
                                                <div className="video-wrap">
                                                    <video controls style={{ width: 550, height: 550 }}>
                                                        <source src={`${API_URL}/file/read/${item.fno}`} type={`video/${item.fsname.split('.').pop()}`} />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                </div>
                                            ) : item.fsname.match(/.(mp3|wav)$/i) ? (
                                                <div className="audio-wrap">
                                                    <audio controls>
                                                        <source src={`${API_URL}/file/read/${item.fno}`} type={`audio/${item.fsname.split('.').pop()}`} />
                                                        Your browser does not support the audio tag.
                                                    </audio>
                                                </div>
                                            ) : (
                                                <div className="file-wrap">
                                                    <a href={`${API_URL}/file/read/${item.fno}`} target="_blank" rel="noopener noreferrer">
                                                        {item.fsname}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        <div className="modal-content" style={{ borderRadius: '0 10px 10px 0'}}>
                            댓글 부분
                        </div>
                    </div>
                    <button className="close-button" onClick={closeModal}> X </button>
                </div>
            </div>
        </>
    );
};

export default PageModal;