import React, { useState } from 'react';
import axios from 'axios';
import '../styles/PageModal.css';
import PageModal from '../modal/PageModal';
import PageCreate from '../Components/PostCreate'
import PostView from "../Components/PageView";

const API_URL = process.env.REACT_APP_API_URL;

const BestPage = () => {



    return (
        <>
            <PostView/>
        </>
    );
};

export default BestPage;
