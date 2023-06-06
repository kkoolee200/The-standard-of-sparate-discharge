const express = require('express');
const { Item } = require('../models');

const router = express.Router();

const selectIndex = async () => {
  let randomIndexArray = [];
  const itemCount = await Item.count(); // Item 테이블의 총 행 수

  while (randomIndexArray.length < 5) {
    const randomNum = Math.floor(Math.random() * itemCount); // 0부터 itemCount - 1 사이의 랜덤한 숫자
    if (!randomIndexArray.includes(randomNum)) { //랜덤 수가 랜덤수 모아둔 배열에 없을 경우
      randomIndexArray.push(randomNum); //랜덤 수 배열에 랜덤 수 넣기
    }
  }
  console.log(randomIndexArray)
  return randomIndexArray;
};

router.get('/', async (req, res, next) => {
  console.log("game 실행은 됌");
  try {
    const randomIndexArray = await selectIndex();
    const games = await Item.findAll({
    // 5가지 랜덤한 수에 해당하는 no를 가진 행의 해당 열값만 찾기
      where: { no: randomIndexArray },
      attributes: ['name', 'clas', 'clas_num']
    });

    if (games.length > 0) {
      res.json(games);
      console.log(games);
    } else {
      res.status(404).json({ success: false, message: 'There are no items' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
