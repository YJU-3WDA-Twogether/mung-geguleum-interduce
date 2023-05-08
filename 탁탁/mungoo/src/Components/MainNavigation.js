import React from 'react';
import '../styles/MainNavigation.css'
function MainNavigation({ onSelectPost }) {

    return (
        <div className="Navigation-Header">
        <nav className="Navigation-Button">
            <ul>
                <li>
                    <button onClick={() => onSelectPost('Best')}>베스트 모음</button>
                </li>
                <li>
                    <button onClick={() => onSelectPost('Music')}>음악</button>
                </li>
                <li>
                    <button onClick={() => onSelectPost('Remake')}>재창작</button>
                </li>
                <li>
                    <button onClick={() => onSelectPost('Stories')}>놀이터</button>
                </li>
            </ul>
        </nav>
        </div>
    );
}

export default MainNavigation;
