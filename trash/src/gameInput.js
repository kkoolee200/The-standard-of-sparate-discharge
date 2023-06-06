import React, { useState } from 'react';
import './App.css';

function Input(props) {
    const [selectedValue, setSelectedValue] = useState(null); // 사용자가 선택한 라디오 버튼의 value
    const [currentPage, setCurrentPage] = useState(props.clasNum);

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        props.handleAnswer(e.target.value, props.clasNum);
    };


    const isSelected = (value) => {
        return selectedValue === value && currentPage === props.clasNum;
    };

    return (
        <div>
            <input
                type="radio"
                value={props.value}
                name={props.groupName}
                checked={isSelected(props.value)}
                onChange={handleChange}
            />

            <label>{props.name}</label>
        </div>
    );
}

export default Input;