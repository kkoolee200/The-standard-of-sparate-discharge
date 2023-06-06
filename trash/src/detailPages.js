import React from 'react';
import './App.css';
import Background from './img/nature-3294632_1920.jpg'

function DetailPages(props) {
    return (
        <div className='detail'>
            <img src = {Background} className="img"/>
            <a className='detail_text'>
                <ul>{props.underTitle}</ul>
                <ul>{props.totalTitle}</ul>
            </a>
        </div>
    );
}

export default DetailPages;