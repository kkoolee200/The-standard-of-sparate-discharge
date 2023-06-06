import React, { useState, useEffect } from 'react';
import './App.css';
import Top from './top';
import PageList from './pageList';
import axios from 'axios';

function Login() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    // login 버튼 클릭 이벤트
    const onClickLogin = () => {
        console.log('click login')
    }

    // 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
        axios.get('/user_inform/login')
            .then(res => console.log(res))
            .catch()
    },
        // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
        [])

    return (
        <>
            <hearder>
                <Top leftText="분리 배출의 정석" />
                <PageList />
            </hearder>
            <body>
                <div className='all_login'>
                    <h1>분리 배출의 정석</h1>
                    <div className='detail_login'>
                        <div className='id'>
                            <label htmlFor='input_id'>ID</label>
                            <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
                        </div>
                        <div className='pw'>
                            <label htmlFor='input_pw'>PW</label>
                            <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
                        </div>
                        <button type='button' onClick={onClickLogin}>Login</button>
                        
                        <button type='button'>회원가입</button>
                    </div>
                </div>
            </body>
        </>
    );
}

export default Login;