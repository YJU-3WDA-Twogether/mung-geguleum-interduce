import React from 'react';

function MainNavigation({ onSelectPost }) {

    return (
        <nav>
            <ul>
                <li>
                    <button onClick={() => onSelectPost('Best')}>베스트</button>
                </li>
                <li>
                    <button onClick={() => onSelectPost('Stories')}>사연</button>
                </li>
                <li>
                    <button onClick={() => onSelectPost('Music')}>노래</button>
                </li>
                <li>
                    <button onClick={() => onSelectPost('Remake')}>재창작</button>
                </li>

            </ul>
        </nav>
    );
}

export default MainNavigation;
