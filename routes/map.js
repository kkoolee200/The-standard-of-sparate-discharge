const express = require('express');
const { Cloth } = require('../models');
const { Medi } = require('../models');
const { Battery } = require('../models');
const { sequelize } = require('../models'); // sequelize import 추가

const router = express.Router();
router.get('/', async (req, res, next) => {
    console.log("map 실행은 됌");
    try {
        const clothes = await Cloth.findAll({
            attributes: [
                'lat',
                'lon',
                [sequelize.literal("'Cloth'"), 'modelName'] // 가상 열 추가
            ]
        });
        const batteries = await Battery.findAll({
            attributes: [
                'lat',
                'lon',
                [sequelize.literal("'Battery'"), 'modelName'] // 가상 열 추가
            ]
        });
        const medis = await Medi.findAll({
            attributes: [
                'lat',
                'lon',
                [sequelize.literal("'Medi'"), 'modelName'] // 가상 열 추가
            ]
        });

        if (clothes && batteries && medis) {
            res.json({ clothes, batteries, medis });
            console.log(clothes, batteries, medis);
        } else {
            res.status(404).json({ success: false, message: 'There is no map' });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
