const express = require('express');
const router = express.Router();
const fs = require('fs');
const xlsx = require('xlsx');
const models = require('../models'); // 모든 모델을 포함한 객체 가져오기

router.post('/', async (req, res) => {
  console.log("convert 실행은 됩니다");
  try {
    const { tableData } = req.body; // req.body에서 tableData를 구조 분해(Destructure)하여 가져옵니다.

    for (const { filePath, modelName } of tableData) {
      console.log(filePath);
      console.log(modelName);

      const model = models[modelName]; // 해당 모델을 가져옵니다.
      console.log('확인: ', model);

      // 엑셀 파일 읽기
      const file = xlsx.readFile(filePath);
      const sheets = file.SheetNames;
      const firstSheet = file.Sheets[sheets[0]];
      const jsonData = xlsx.utils.sheet_to_json(firstSheet);
      console.log(jsonData);

      // 기존 데이터 삭제
      await model.destroy({ truncate: true });

      // json 데이터 DB에 저장
      for (const data of jsonData) {
        const newData = {};
        for (const columnName in data) {
          if (model.rawAttributes[columnName]) {
            newData[columnName] = data[columnName];
          }
        }
        console.log('데이터 확인', newData);

        await model.create(newData);
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
});

module.exports = router;
