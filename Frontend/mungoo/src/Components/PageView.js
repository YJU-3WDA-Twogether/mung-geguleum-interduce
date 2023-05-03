import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/PostView.css'

import { useNavigate } from "react-router-dom";
import PageModal from "../modal/PageModal";
const API_URL = process.env.REACT_APP_API_URL;
const PostView = () => {

    const [posts, setPosts] = useState([
        {
            id: 1,
            content: "첫 번째 포스트입니다.",
            attachments: [
                {
                    type: "image/png",
                    url: "https://via.placeholder.com/150",
                },
                {
                    type: "image/png",
                    url: "https://via.placeholder.com/150",
                },
                {
                    type: "image/png",
                    url: "https://via.placeholder.com/150",
                },
            ],
        },
        {
            id: 2,
            content: "두 번째 포스트입니다.",
            attachments: [
                {
                    type: "video/mp4",
                    url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_20mb.mp4",
                },
                {
                    type: "video/mp4",
                    url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_20mb.mp4",
                },
                {
                    type: "audio/mpeg",
                    url: "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3",
                },
            ],
        },
    ]);
        const [showPopup, setShowPopup] = useState(false);

        useEffect(() => {
        const fetchPosts = async () => {
        try {
            const response = await axios.get('http://172.26.27.157:9094/post/getlist');
            console.log(response.data.content);
            setPosts(response.data.content);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPosts();
        }, []);

        const handleOutsideClick = (e) => {
        const layerPopup = document.querySelector('.layer-popup');
        if (!layerPopup.contains(e.target)) {
        setShowPopup(false);
        }
        };

        return (
        <>
            {posts.map((post) => (
                <div className="postView-content" key={post.id}>
                    <div>
                        <div>
                            <img />
                            박영진 2023:05:42
                        </div>
                        {post.content}
                    </div>
                    {post.attachments && (
                        <Carousel showThumbs={false} showArrows >
                            {post.attachments.map((attachment, i) =>
                                attachment.type.startsWith("image") ? (
                                    <div className="twit-img-container" key={i}>
                                        <img
                                            className="twit-img"
                                            src={attachment.url}
                                            alt="첨부된 이미지"
                                            style={{
                                                maxWidth: "700px",
                                                maxHeight: "700px",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </div>
                                ) : attachment.type.startsWith("video") ? (
                                    <video key={i} className="twit-video" controls>
                                        <source src={attachment.url} type={attachment.type} />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : attachment.type.startsWith("audio") ? (
                                    <audio key={i} className="twit-audio" controls>
                                        <source src={attachment.url} type={attachment.type} />
                                        Your browser does not support the audio tag.
                                    </audio>
                                ) : null
                            )}
                        </Carousel>
                    )}

                    <button className="btn-open" onClick={() => setShowPopup(true)}>댓글</button>
                    <PageModal showPopup={showPopup} setShowPopup={setShowPopup} />
                </div>

            ))}
        </>
    );
};

export default PostView;
