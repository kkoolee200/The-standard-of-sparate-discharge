import React, { useState, useEffect } from 'react';
import './App.css';
import Top from './top';
import PageList from './pageList';
import DetailPages from './detailPages';
import Input from './gameInput';
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core';

function Game(props) {
    const [data, setData] = useState([]); // 요청 결과
    const [currentPage, setCurrentPage] = useState(0); //현재 페이지(5개 랜덤값 받아오는 것 때문에)
    const [open, setOpen] = useState(false); //팝업창 여닫기
    const [answerResult, setAnswerResult] = useState(null); //정답 여부
    const [selectedValue, setSelectedValue] = useState(null); // 라디오 버튼의 선택 값

    //DB 채우기 요청
    useEffect(() => {
        fetch('http://localhost:3000/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tableData: [
                    {
                        filePath: 'data/item.xlsx',
                        modelName: 'Item',
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
                // /game 요청, 랜덤 행 5개(name, clas, clas_num 받아오기)
                fetch('http://localhost:3000/game')
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('서버에서 올바른 응답을 받지 못했습니다.');
                        }
                        return response.json();
                    })
                    .then((result) => {
                        console.log('요청 결과', result);
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

    //정답 체크
    const handleAnswer = (selectedValue, clasNum) => {
        if (clasNum === selectedValue) {
            console.log("clasNum " + clasNum);
            console.log("selectedValue " + selectedValue);
            setAnswerResult('correct');
            // setSelectedValue(null);
        } else {
            console.log("clasNum " + clasNum);
            console.log("selectedValue " + selectedValue);
            setAnswerResult('incorrect');
            // setSelectedValue(null);
        }
        setOpen(true);
    };

    //다음 버튼 눌렀을 때
    const handleNext = () => {
        //마지막 페이지 아님
        if (currentPage < data.length - 1) {
            setSelectedValue(null); // 라디오 버튼 선택 초기화
            setCurrentPage((prevPage) => prevPage + 1); //페이지수 +1 = 다음 페이지로
            setAnswerResult(null); // 정답 여부 다시 초기화(null)
            setOpen(false); // 팝업창 닫기
            console.log(selectedValue);
            // Input.value = selectedValue;
            console.log("value null은 " + Input.value);
        } else {
            setOpen(true); //팝업창 열기
        }
    };

    //다시 시작
    const handleRestart = () => {
        fetch('http://localhost:3000/game')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('서버에서 올바른 응답을 받지 못했습니다.');
                }
                return response.json();
            })
            .then((result) => {
                console.log('요청 결과', result);
                if (Array.isArray(result) && result.length > 0) {
                    setData(result);
                } else {
                    setData([]);
                }
            })
            .catch((error) => console.error(error));

        setCurrentPage(0);
        setAnswerResult(null);
        setOpen(false);
    };

    //팝업창 닫기
    const closeDialog = () => {
        setOpen(false);
    };

    return (
        <div className="main_necessity">
            <header>
                <Top leftText="분리 배출의 정석" />
                <PageList />
                <DetailPages underTitle="분리 배출 방법" totalTitle="분리 배출 방법 > 쓰레기별 분류 맞추기 게임" />
            </header>
            <body>
                {/* 넘어온 데이터가 존재 */}
                {data.length > 0 && currentPage < data.length && (
                    <div className="game">
                        <div>{data[currentPage].name}</div>
                        <div><Input value="1.0" name="종이류" groupName="recycling" clasNum={data[currentPage].clas_num} handleAnswer={handleAnswer}/></div>
                        <div><Input value="2.0" name="비닐류" groupName="recycling" clasNum={data[currentPage].clas_num} handleAnswer={handleAnswer}/></div>
                        <div><Input value="3.0" name="캔류" groupName="recycling" clasNum={data[currentPage].clas_num} handleAnswer={handleAnswer}/></div>
                        <div><Input value="4.0" name="병류" groupName="recycling" clasNum={data[currentPage].clas_num} handleAnswer={handleAnswer}/></div>
                        <div><Input value="5.0" name="스티로폼" groupName="recycling" clasNum={data[currentPage].clas_num} handleAnswer={handleAnswer}/></div>
                        <div><Input value="6.1" name="투명 페트병" groupName="recycling" clasNum={data[currentPage].clas_num} handleAnswer={handleAnswer}/></div>
                        <div><Input value="6.2" name="일반 플라스틱" groupName="recycling" clasNum={data[currentPage].clas_num} handleAnswer={handleAnswer}/></div>
                        <div><Input value="7.0" name="고쳘류" groupName="recycling" clasNum={data[currentPage].clas_num} handleAnswer={handleAnswer}/></div>
                        <div><Input value="8.0" name="형광등" groupName="recycling" clasNum={data[currentPage].clas_num} handleAnswer={handleAnswer}/></div>
                        <div><Input value="9.0" name="건전지" groupName="recycling" clasNum={data[currentPage].clas_num} handleAnswer={handleAnswer}/></div>
                        <div><Input value="10.0" name="타이어" groupName="recycling" clasNum={data[currentPage].clas_num} handleAnswer={handleAnswer}/></div>
                        <div><Input value="11.0" name="윤활유" groupName="recycling" clasNum={data[currentPage].clas_num} handleAnswer={handleAnswer}/></div>
                        <div><Input value="12.0" name="의류" groupName="recycling" clasNum={data[currentPage].clas_num} handleAnswer={handleAnswer}/></div>
                        <div><Input value="13.0" name="일반쓰레기" groupName="recycling" clasNum={data[currentPage].clas_num} handleAnswer={handleAnswer}/></div>
                        <div><Input value="14.0" name="특수규격 마대" groupName="recycling" clasNum={data[currentPage].clas_num} handleAnswer={handleAnswer}/></div>
                        <div><Input value="15.1" name="대형 폐가전제품" groupName="recycling" clasNum={data[currentPage].clas_num} handleAnswer={handleAnswer}/></div>
                        <div><Input value="15.2" name="소형 폐가전제품" groupName="recycling" clasNum={data[currentPage].clas_num} handleAnswer={handleAnswer}/></div>

                        <button onClick={handleNext}>다음</button>

                        {/* 팝업창 */}
                        <Dialog open={open} onClose={closeDialog}>
                            {/* 마지막 페이지일때 */}
                            {currentPage === data.length - 1 ? (
                                <div>
                                    <DialogTitle>다시하기</DialogTitle>
                                    <DialogContent>
                                        <div>더 이상 플레이할 쓰레기가 없습니다. 게임을 다시 시작하시겠습니까?</div>
                                    </DialogContent>

                                    {/* 다시하기 - 초기화 */}
                                    <Button onClick={handleRestart} color="primary">
                                        다시하기
                                    </Button>
                                    {/* 그냥 팝업창 닫기 */}
                                    <Button onClick={closeDialog} color="primary">
                                        닫기
                                    </Button>
                                </div>
                            ) : (
                                // 마지막 페이지가 아님
                                <div>
                                    {open && (
                                        <div>
                                            {/* 정답 여부에 따라서 팝업창 */}
                                            <DialogTitle>{answerResult === 'correct' ? '정답' : '오답'}</DialogTitle>
                                            <DialogContent>
                                                <div>
                                                    {/* 정답일 때 팝업창 */}
                                                    {answerResult === 'correct' ? (
                                                        <div>
                                                            {data[currentPage].name}는 {data[currentPage].clas}가 맞습니다!!
                                                        </div>
                                                    ) : (
                                                        // 오답일때 팝업창
                                                        <div>
                                                            {data[currentPage].name}는 {data[currentPage].clas}로 분류됩니다.
                                                        </div>
                                                    )}
                                                </div>
                                            </DialogContent>

                                            {/* 다음 버튼*/}
                                            <Button onClick={handleNext} color="primary">
                                                다음
                                            </Button>
                                            {/* 팝업창 닫기 */}
                                            <Button onClick={closeDialog} color="primary">
                                                닫기
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Dialog>
                    </div>
                )}
            </body>
        </div>
    );
}

export default Game;