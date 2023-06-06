import React, { useState, useEffect } from 'react';
import './App.css';
import Top from './top';
import PageList from './pageList';
import DetailPages from './detailPages';

function Method(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        // /convert 경로로 POST 요청을 보내는 코드
        fetch('http://localhost:3000/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tableData: [
                    {
                        filePath: 'data/method.xlsx',
                        modelName: 'Method',
                    },
                ],
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('서버에서 올바른 응답을 받지 못했습니다.');
                }
                return response.json();
            })
            .then(() => {
                // DB에 있는 clas, method 모든 값 결과로 반환하는 API 실행 요청
                fetch('http://localhost:3000/method')
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('서버에서 올바른 응답을 받지 못했습니다.');
                        }
                        return response.json();
                    })
                    .then((result) => {
                        console.log('요청 결과', result);
                        // 여기서 setState를 통해 데이터를 업데이트
                        if (Array.isArray(result) && result.length > 0) {
                            setData(result);
                        } else {
                            setData([]);
                        }
                    })
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="main_necessity">
            <header>
                <Top leftText="분리 배출의 정석" />
                <PageList />
                <DetailPages underTitle="분리 배출 방법" totalTitle="분리 배출 방법 > 쓰레기별 분류" />
            </header>
            <div>
                {/* 데이터가 존재할 때에만 렌더링 */}
                {data.length > 0 &&
                    data.map((item, index) => {
                        console.log('데이터', data);
                        console.log(item.clas, item.method);
                        return (
                            <div key={index}>
                                <div>분류: {item.clas}</div>
                                <div>방법: {item.method}</div>
                                <br />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default Method;
