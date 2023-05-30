import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { IoCloseSharp, IoImageOutline } from "react-icons/io5";
import pfile from "../image/Profile.jpg";
import styled from "../styles/PostCreate.module.css";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'pure-react-carousel/dist/react-carousel.es.css';


const API_URL = process.env.REACT_APP_API_URL;

const PostCreate = ({pageNum}) => {

    const [formData, setFormData] = useState({
        title: '',
        content: '',    
        fileList: [],
        audioList: [],
        videoList: [],
    });
    const [user, setUser] = useState({});
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            console.log(JSON.parse(storedUser))
        }
    }, []);

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
        e.target.value = null;
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
    const [select, setSelect] = useState("");
    return (
        <>
            <div
                className={`${styled.factoryForm} ${styled.modalBorder}`}
            >
                <div className={styled.factoryInput__container}>
                    <div className={styled.nweet__profile}>
                            <img
                                src={pfile} /* 이미지 주소 추가 */
                                alt="profileImg"
                                className={styled.profile__image}
                            />
                    </div>
                    <form  className={styled.factoryInput} onSubmit={handleSubmit} encType="multipart/form-data">
                        <div
                            className={`${styled.factoryForm__content} ${
                                select === "text" && styled.focus
                            }`}
                        >
                            <input
                                spellCheck="false"
                                className={styled.factoryInput__title}
                                type="text"
                                name="title"
                                placeholder="제목"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            />
                            <textarea
                                spellCheck="false"
                                className={styled.factoryInput__input}
                                name="content"
                                placeholder="무슨 일이 일어나고 있나요?"
                                value={formData.content}
                                onFocus={() => setSelect("text")}
                                onBlur={() => setSelect("")}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                maxLength={280}
                            ></textarea>
                            {
                                (formData.fileList.length > 0 || formData.audioList.length > 0 || formData.videoList.length > 0) &&
                                <div className={styled.factoryForm__attachment}>
                                    <div className={styled.factoryForm__Image} >
                                        <Carousel showThumbs={false}>
                                            {
                                                [
                                                    ...formData.fileList.map((file, index) => ({ type: 'image', file, index })),
                                                    ...formData.audioList.map((file, index) => ({ type: 'audio', file, index })),
                                                    ...formData.videoList.map((file, index) => ({ type: 'video', file, index })),
                                                ].map(({ type, file, index }) => (
                                                    <div key={index} className={styled.factoryForm__mediaContainer} style={{marginBottom : 5}}>
                                                        {type === 'image' && <img src={URL.createObjectURL(file.file)} />}
                                                        {type === 'audio' && <audio src={URL.createObjectURL(file.file)} controls />}
                                                        {type === 'video' && <video src={URL.createObjectURL(file.file)} controls />}
                                                        <div
                                                            className={styled.factoryForm__clear}
                                                            onClick={() => handleFileDelete(type, index)}>
                                                            <IoCloseSharp />
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </Carousel>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={styled.factoryInput__add}>
                            <div className={styled.factoryInput__iconBox}>
                                <label
                                    htmlFor="attach-file"
                                    className={styled.factoryInput__label}
                                >
                                    <div className={styled.factoryInput__icon}>
                                        <IoImageOutline />
                                    </div>
                                </label>
                                <input
                                    id="attach-file" type="file" accept="image/*, audio/*, video/*" onChange={handleFileChange}
                                />
                            </div>
                            <input
                                type="submit"
                                value="작성하기"
                                className={styled.factoryInput__arrow}
                                disabled={formData.content === "" && formData.title === ""}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PostCreate;

