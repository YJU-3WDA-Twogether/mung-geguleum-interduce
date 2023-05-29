import React from 'react';
import '../styles/PageModal.css';
import D3 from "../pages/D3";

const PageModal = ({ showPopup, setShowPopup }) => { // 상태값과 함수 전달받음
    const handleOutsideClick = (e) => {
        if (e.target.className === 'layer-popup show') {
            setShowPopup(false);
        }
    };

    const closeModal = () => {
        setShowPopup(false);
    };

    return (
        <>
            <div className={`layer-popup ${showPopup ? 'show' : ''}`} onClick={handleOutsideClick}>
                <div className="layer-popup show">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ borderRadius: '10px 0 0 10px'}}>
                            <D3 />
                        </div>
                    </div>
                    <button className="close-button" onClick={closeModal}> X </button>
                </div>
            </div>
        </>
    );
};

export default PageModal;
