import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import RemakeTegModal from "../modal/RemakeTegModal";
import '../styles/RemakeCreate.css';
const API_URL = process.env.REACT_APP_API_URL;

// 작성후 초기화 시키기
const PostRemakeCreate = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        fileList: [],
        audioList: [],
        videoList: [],
    });
    const [category, setCategory] = useState();
    const [remakeTag, setRemakeTag] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 20MB
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

    // 재창작 태그를 선택하는 버튼 클릭시 모달 창 열기
    const handleRemakeTagClick = (e) => {
        e.preventDefault();
        setShowPopup(true);
    };

    const handleSelectPosts = (posts) => {
        console.log(posts); // 선택된 데이터를 콘솔에 출력
        setRemakeTag(posts);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append('uno', user.uno); // uno 추가
            data.append('title', formData.title);
            data.append('content', formData.content);
            data.append('bno', 4);

            // 재창작 태그 선택한 경우 데이터에 추가
            if (remakeTag) {
                remakeTag.forEach(tag => {
                    data.append('tag', tag.lno);
                    console.log(tag.lno)
                });
            }

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
            console.log('formData:', formData);
            console.log('category:', category);
            console.log('remakeTag:', remakeTag);
            console.log('data:', data);

            console.log(response.data);
            alert('게시글이 성공적으로 작성되었습니다.');
        } catch (error) {
            console.error(error);
            alert('게시글 작성 중 오류가 발생했습니다.');
        }
    };
    return (
        <div className="Remake create-container">
            <h2>재창작</h2>
            <form  encType="multipart/form-data" onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="제목"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    />
                </div>
                {/* 재창작 태그 선택 버튼 */}
                <button type="button" className="btn-open" onClick={handleRemakeTagClick}>
                    재창작 태그
                </button>
                <RemakeTegModal showPopup={showPopup} setShowPopup={setShowPopup} onSelectPosts={handleSelectPosts} />
                {/* ... */}
                <div>
                        <textarea
                            name="content"
                            placeholder="내용"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            rows="10"
                            cols="30"
                        ></textarea>
                </div>
                <div>
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
                            <button type="button" onClick={() => handleFileDelete(type, index)}>X</button>
                        </div>
                    ))}
                </div>
                <button type="submit">작성하기</button>
            </form>
        </div>
    );
};

export default PostRemakeCreate;
