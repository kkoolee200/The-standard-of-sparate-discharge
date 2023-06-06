const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const { sequelize } = require('./models');
const convertRouter = require('./routes/convert');
const methodRouter = require('./routes/method');
const searchRouter = require('./routes/search');
const gameRouter = require('./routes/game');
const mapRouter = require('./routes/map');

// 서버 측 로깅과 로그 파일 생성
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

sequelize
  .sync({ force: false })
  .then(() => console.log('데이터베이스 연결 성공'))
  .catch(err => console.error(err));

// body-parser 미들웨어 사용
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'trash/build')));

// 변환 라우터
app.use('/convert', convertRouter);
app.use('/method', methodRouter);
app.use('/search', searchRouter);
app.use('/game', gameRouter);
app.use('/map', mapRouter);

// 리액트 앱 제공을 위한 catch-all 라우트
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/trash/build/index.html'));
});

// 서버 시작
app.listen(3000, () => {
  console.log('3000포트에서 대기중');
});
