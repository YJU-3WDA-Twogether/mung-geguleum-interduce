import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageModal from "../modal/PageModal";
import '../styles/PostView.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Accordion from 'react-bootstrap/Accordion';
import D3 from "../pages/D3"


const API_URL = process.env.REACT_APP_API_URL;

const PrevArrow = (props) => {
    const { onClick, currentSlide } = props;
    return (
        <button className="slick-arrow slick-prev" onClick={onClick} style={{ zIndex: 1, display: currentSlide === 0 ? 'none' : 'block' , backgroundColor:"black"}}>
            Prev
        </button>
    );
};
const NextArrow = (props) => {
    const { onClick, currentSlide, slideCount } = props;
    return (
        <button className="slick-arrow slick-next" onClick={onClick} style={{ zIndex: 1, display: currentSlide === slideCount - 1 ? 'none' : 'block',backgroundColor:"black" }}>
            Next
        </button>
    );
};


const PostView = () => {
    const [posts, setPosts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [user, setUser] = useState({});


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const handleButtonClick = () => {
        window.open('/d3.html', '_blank', 'width=800,height=600');
    }


    const downloadFile = (file) => {
        const params = {
            uno: user.uno,
            pno: file.pno,
        };

        axios.get(`${API_URL}/file/download/${file.fno}`, { params, responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.download = file.fname;
                link.click();
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${API_URL}/post/getlist`);
                console.log(response.data.content);
                setPosts(response.data.content);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPosts();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    return (
        <>
        <div className="feed">
            {posts.map((post) => (
                <div className="feed-pos" key={post.id}>
                    <div className="feed-header">
                        <h3>{post.title}</h3>
                        <p>{post.uid} 님의 게시글</p>
                    </div>
                    <div className="feed-content">
                        <p>{post.content}</p>
                        {post.file.length > 0 && (
                            <Slider {...settings} draggable={false}>
                                {post.file.map((file) => (
                                    <div key={file.fno}>
                                        {file.fname.match(/.(jpg|jpeg|png|gif)$/i) ? (
                                            <div className="img-wrap">
                                                <img src={`${API_URL}/file/read/${file.fno}`} alt="file" style={{width:600, height:650}}/>
                                                <button onClick={() => downloadFile(file)}>다운로드</button>
                                            </div>
                                        ) : file.fname.match(/.(mp4|webm)$/i) ? (
                                            <div className="video-wrap">
                                                <video controls style={{width:550, height:550}}>
                                                    <source src={`${API_URL}/file/read/${file.fno}`} type={`video/${file.fname.split('.').pop()}`} />
                                                    Your browser does not support the video tag.
                                                </video>
                                                <button onClick={() => downloadFile(file)}>다운로드</button>
                                            </div>
                                        ) : file.fname.match(/.(mp3|wav)$/i) ? (
                                            <div className="audio-wrap">
                                                <audio controls>
                                                    <source src={`${API_URL}/file/read/${file.fno}`} type={`audio/${file.fname.split('.').pop()}`} />
                                                    Your browser does not support the audio tag.
                                                </audio>
                                                <button onClick={() => downloadFile(file)}>다운로드</button>
                                            </div>
                                        ) : (
                                            <div className="file-wrap">
                                                <a href={`${API_URL}/file/read/${file.fno}`} target="_blank" rel="noopener noreferrer">
                                                    {file.fname}
                                                </a>
                                                <button onClick={() => downloadFile(file)}>다운로드</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </Slider>
                        )}
                    </div>
                    <div className="feed-footer">
                        <button>좋아요</button>
                        <button>로그</button>
                        <button>댓글</button>
                        <button>다운로드</button>
                        <Accordion defaultActiveKey={[]} alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>...</Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                        <li>신고하기</li>
                                        <li><button className="btn-open" onClick={() => setShowPopup(true)}>그래프 조회하기</button>
                                            <PageModal showPopup={showPopup} setShowPopup={setShowPopup} /></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}
export default PostView;