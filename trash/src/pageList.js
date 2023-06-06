import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function PageList() {
    const navigate = useNavigate();

    const goToNecessity = (event) => {
        event.preventDefault();
        navigate("/necessityPage");
    }

    const goToMethod = (event) => {
        event.preventDefault();
        navigate("/methodPage");
    }

    const goToSearch = (event) => {
        event.preventDefault();
        navigate("/searchPage");
    }

    const goToGame = (event) => {
        event.preventDefault();
        navigate("/gamePage");
    }

    const goToMap = (event) => {
        event.preventDefault();
        navigate("/mapPage");
    }

    return (
        <body>
            <div className="pages">
                <ul className='detailPages'>
                    <li><a href="#" className='necessity' onClick={goToNecessity}>필요성</a>
                        <ul className='under_necessity'>
                            <li><a href="#" onClick={goToNecessity}>분리 배출의 필요성</a></li>
                        </ul>
                    </li>

                    <li><a href="#" className='method' onClick={goToMethod}>분리 배출 방법</a>
                        <ul className='under_method'>
                            <li><a href="#" id='classification' onClick={goToMethod}>쓰레기별 분류</a></li>
                            <li><a href="#" id='search' onClick={goToSearch}>쓰레기별 분류 검색</a></li>
                            <li><a href="#" id='game' onClick={goToGame}>쓰레기별 분류 맞추기 게임</a></li>
                        </ul>
                    </li>


                    <li><a href="#" className='map' onClick={goToMap}>지도</a>
                        <ul className='location'>
                            <li><a href="#" onClick={goToMap}>수거함 위치</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </body>
    );
}

export default PageList;
