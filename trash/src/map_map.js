import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Top from './top';
import PageList from './pageList';
import DetailPages from './detailPages';
import medicineMarker from './img/medicine.png';
import clothMarker from './img/cloth.png';
import batteryMarker from './img/battery.png';

const Map = (props) => {
  const mapContainer = useRef(null);
  const { kakao } = window;
  const [userPosition, setUserPosition] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const mapOptions = {
    center: userPosition,
    level: 4,
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const userPosition = new kakao.maps.LatLng(userLat, userLng);
          setUserPosition(userPosition);
          console.log('현재 위치', userPosition);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation API가 지원되지 않습니다.');
    }
  }, []);

  useEffect(() => {
    const tableData = [
      { filePath: 'data/battery_light.xlsx', modelName: 'Battery' },
      { filePath: 'data/cloth.xlsx', modelName: 'Cloth' },
      { filePath: 'data/medicine.xlsx', modelName: 'Medi' },
    ];

    fetch('http://localhost:3000/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tableData }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버에서 올바른 응답을 받지 못했습니다.');
        }
        return response.json();
      })
      .then((result) => {
        console.log('convert 요청 결과', result);
        if (result.success) {
          fetch('http://localhost:3000/map')
            .then((response) => {
              if (!response.ok) {
                throw new Error('서버에서 올바른 응답을 받지 못했습니다.');
              }
              return response.json();
            })
            .then((result) => {
              console.log('map 요청 결과', result);
              if (result.clothes && result.batteries && result.medis) {
                console.log('clothes 요청 결과', result.clothes);
                console.log('batteries 요청 결과', result.batteries);
                console.log('medis 요청 결과', result.medis);
                setData([...result.clothes, ...result.batteries, ...result.medis]);
              } else {
                setData([]);
              }
              setIsLoading(false);
            })
            .catch((error) => {
              console.error(error);
              setIsLoading(false);
            });
        } else {
          console.error('convert 요청 실패');
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoading && data.length > 0 && userPosition) {
      const map = new kakao.maps.Map(mapContainer.current, mapOptions);

      data.forEach((item) => {
        let markerImage;
        let title;

        if (item.modelName === 'Cloth') {
          markerImage = clothMarker;
          title = '의류 수거함';
        } else if (item.modelName === 'Medi') {
          markerImage = medicineMarker;
          title = '폐의약품 수거함';
        } else if (item.modelName === 'Battery') {
          markerImage = batteryMarker;
          title = '폐건전지/형광등 수거함';
        }

        const position = new kakao.maps.LatLng(item.lat, item.lon);
        const imageSize = new kakao.maps.Size(30, 30);
        const markerImageObj = new kakao.maps.MarkerImage(markerImage, imageSize);

        const marker = new kakao.maps.Marker({
          position: position,
          map: map,
          image: markerImageObj,
        });

        // const customOverlayContent = `<div class="customoverlay">
        //                                 <span>${title}</span>
        //                               </div>`;
        const customOverlay = new kakao.maps.CustomOverlay({
          position: position
          // content: customOverlayContent,
        });

        customOverlay.setMap(map);
      });
    }
  }, [data, userPosition, mapOptions, isLoading]);

  return (
    <div className="main_map">
      <header>
        <Top leftText="분리 배출의 정석" />
        <PageList />
        <DetailPages underTitle="지도" totalTitle="지도 > 수거함 위치" />
      </header>
      <div>
        <h2>수거함 위치</h2>
        <div
          id="map"
          ref={mapContainer}
          style={{ width: '80%', height: '80vh', display: 'block' }}
        ></div>
      </div>
    </div>
  );
};

export default Map;
