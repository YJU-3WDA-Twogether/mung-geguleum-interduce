import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../styles/PostCreate.css';
const API_URL = process.env.REACT_APP_API_URL;


const PostCreate = ({pageNum}) => {
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        fileList: [],
        audioList: [],
        videoList: [],
    });
    const [category, setCategory] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            // 로그인하지 않았다면 로그인 페이지로 이동
            navigate('/');
            return;
        }
        setUser(JSON.parse(storedUser));
    }, [navigate]);

    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            const extension = file.name.split('.').pop();
            const fileType = (() => {
                switch (extension) {
                    case 'png':
                    case 'jpg':
                    case 'jpeg':
                    case 'gif':
                        return 'fileList';
                    case 'mp3':
                    case 'wav':
                    case 'ogg':
                        return 'audioList';
                    case 'mp4':
                    case 'avi':
                    case 'mkv':
                        return 'videoList';
                    default:
                        return null;
                }
            })();
            if (fileType === null) {
                alert('지원하지 않는 파일 형식입니다.');
            } else if (formData[fileType].reduce((acc, { file }) => acc + file.size, 0) + file.size > MAX_FILE_SIZE) {
                alert(`파일 크기는 ${MAX_FILE_SIZE / 1024 / 1024}MB 이내로 업로드할 수 있습니다.`);
            } else {
                setFormData((prevState) => ({
                    ...prevState,
                    [fileType]: [...prevState[fileType], { file }],
                }));
            }
        });
    };

    const handleFileDelete = (type, index) => {
        let newFiles;
        if (type === 'image') {
            newFiles = [...formData.fileList];
            newFiles.splice(index, 1);
            setFormData(prevState => ({
                ...prevState,
                fileList: newFiles,
            }));
        } else if (type === 'audio') {
            newFiles = [...formData.audioList];
            newFiles.splice(index, 1);
            setFormData(prevState => ({
                ...prevState,
                audioList: newFiles,
            }));
        } else if (type === 'video') {
            newFiles = [...formData.videoList];
            newFiles.splice(index, 1);
            setFormData(prevState => ({
                ...prevState,
                videoList: newFiles,
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append('uno', user.uno); // uno 추가
            data.append('title', formData.title);
            data.append('content', formData.content);
            data.append('bno', pageNum);

            const fileList = [
                ...formData.fileList.map(({ file }) => ({ file, type: 'image' })),
                ...formData.audioList.map(({ file }) => ({ file, type: 'audio' })),
                ...formData.videoList.map(({ file }) => ({ file, type: 'video' })),
            ];

            fileList.forEach(({ file, type }) => {
                data.append('file', file);
                console.log(file)
            });

            const response = await axios.post(`${API_URL}/post/create`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('게시글이 성공적으로 작성되었습니다.');
            setFormData({
                title: '',
                content: '',
                fileList: [],
                audioList: [],
                videoList: [],
            });
        } catch (error) {
            console.error(error);
            alert('게시글 작성 중 오류가 발생했습니다.');
        }
    };
    return (
        <div className="Post-form">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="Post-title">
                    <input
                        type="text"
                        name="title"
                        placeholder="제목"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    />
                </div>
                <div className="Post-input">
                <textarea
                    name="content"
                    placeholder="내용"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    rows="10"
                    cols="30"
                ></textarea>
                </div>
                <div className="Post-File">
                    <input type="file" accept="image/*, audio/*, video/*" onChange={handleFileChange} />
                </div>
                <div>
                    {[
                        ...formData.fileList.map((file, index) => ({ type: 'image', file, index })),
                        ...formData.audioList.map((file, index) => ({ type: 'audio', file, index })),
                        ...formData.videoList.map((file, index) => ({ type: 'video', file, index })),
                    ].map(({ type, file, index }) => (
                        <div key={index}>
                            {type === 'image' && <img src={URL.createObjectURL(file.file)} />}
                            {type === 'audio' && <audio src={URL.createObjectURL(file.file)} controls />}
                            {type === 'video' && <video src={URL.createObjectURL(file.file)} controls />}
                            <button onClick={() => handleFileDelete(type, index)}>X</button>
                        </div>
                    ))}
                </div>
                <div>
                <button type="submit" >작성하기</button>
                </div>
            </form>
        </div>
    );
};

export default PostCreate;

