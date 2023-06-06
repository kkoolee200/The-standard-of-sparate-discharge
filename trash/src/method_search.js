import './App.css';
import Top from './top';
import PageList from './pageList';
import DetailPages from './detailPages';

import * as React from 'react';
import { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import { useState, useRef, useCallback } from 'react';

function Search(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState(null);
    const inputRef = useRef < HTMLInputElement | null > (null);
    const [open, setOpen] = useState(false);

    // 관련 엑셀 파일 저장하는 요청
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
            .then(response => response.json())
            .catch(error => console.error(error));
    }, []);

    // 검색 버튼 눌렀을 때, 검색어 보내고 결과 받아오는 요청
    const onSearchButtonClick = () => {
        fetch(`/search?searchTerm=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                setResult(data);
                setOpen(true);
            })
            .catch(error => console.error(error));
    };

    // 이미지 파일 선택
    const onUploadImageButtonClick = useCallback(() => {
        if (!inputRef.current) {
            return;
        }
        inputRef.current.click();
    }, []);

    // 선택한 이미지 보내기
    const onUploadImage = useCallback((e) => {
        if (!e.target.files) {
            return;
        }

        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        //선택된 이미지 POST하기
        // fetch('http://localhost:3000/images', {
        //     method: 'POST',
        //     body: formData,
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        // })
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        //     .catch(error => console.error(error));
    }, []);

    //팝업창 닫기
    const closeDialog = () => {
        setOpen(false);
    };

    return (
        <div className="main_necessity">
            <header>
                <Top leftText="분리 배출의 정석" />
                <PageList />
                <DetailPages underTitle="분리 배출 방법" totalTitle="분리 배출 방법 > 쓰레기별 분류 검색" />
            </header>
            <body>
                <div className="search_text">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <Button onClick={onSearchButtonClick}>검색</Button>
                    <Dialog open={open} onClose={closeDialog}>
                        <DialogTitle>검색 결과</DialogTitle>
                        <DialogContent>
                            {result && (
                                <div>
                                    검색어: {searchTerm}
                                    <br />
                                    검색 결과: {result.name}
                                    <br />
                                    분류: {result.clas}
                                    <br />
                                    분리 배출 방법: {result.method}
                                    <br />
                                    기타: {result.etc}
                                </div>
                            )}
                        </DialogContent>
                        <Button onClick={closeDialog} color="primary">
                            닫기
                        </Button>
                    </Dialog>
                </div>
                <div className="search_image">
                    <input
                        type="file"
                        accept="image/*"
                        name="petImg"
                        onChange={onUploadImage}
                        className='imgInput'
                    />
                    <Button onClick={onUploadImageButtonClick}>이미지 업로드</Button>
                </div>
            </body>
        </div>
    );
}

export default Search;