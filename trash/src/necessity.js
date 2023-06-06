import React from 'react';
import './App.css';
import Top from './top'
import PageList from './pageList'
import DetailPages from './detailPages'
import Video from './video';

function Necessity(props) {
    return (
        <div className="main_necessity">
            <hearder>
                <Top leftText="분리 배출의 정석" />
                <PageList />
                <DetailPages underTitle="분리 배출의 필요성" totalTitle="분리 배출의 정석 > 필요성" />
            </hearder>
            <section className='section_necessity'>
                {/* 이미지, 영상 url은 다 DB에 저장 페이지 불러올 때 한번에 불러옴 */}
                <div className='environmentalVideo'>
                    <h2>[분리 배출의 심각성 영상으로 알아보기]</h2>
                    <h3><a href='https://www.youtube.com/watch?v=R0emsxjTkdw'>[타일러의 지구를 지키는 20가지 제안] 잘 버리는 것이 중요한 이유(올바른 분리배출) I KBS 201027 방송
                    </a></h3>
                    <div><Video /></div>
                </div>

                <div className='environmentalArticle'>
                    <h2>[분리 배출의 심각성 기사로 알아보기]</h2>
                    <h3><a href='https://www.si.re.kr/node/66275'>코로나로 플라스틱 쓰레기 얼마나 늘었을까?</a></h3>
                    <h4>자세한 내용은 위의 기사 제목을 클릭하여 확인하세요!!</h4>
                    <img id="necessityImg" src="https://www.si.re.kr/sites/default/files/cardnews22_5.jpg"></img>
                </div>
            </section>

        </div>
    );
}

export default Necessity;