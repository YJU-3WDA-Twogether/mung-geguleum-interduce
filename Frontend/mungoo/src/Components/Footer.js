import React from 'react';
function Footer({ onMyPageClick }) {
    return (
        <footer>

            <button onClick={onMyPageClick}>마이페이지</button>
        </footer>
    );
}

export default Footer;