import React from 'react';
import './App.css';

function Top(props) {
    return (
        <ul className='top'>
            <ul className='left'>
                {props.leftText}
            </ul>
            
            <ul className='right'>
                <ul>로그인</ul>
                <ul>마이 페이지</ul>
            </ul>
        </ul>
    );
}

export default Top;