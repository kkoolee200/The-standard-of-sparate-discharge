const express = require('express');
const { Method } = require('../models');

const router = express.Router();
router.get('/', async (req, res, next) => {
  console.log("method 실행은 됌")
  try {
    const methods = await Method.findAll({
      attributes: ['clas', 'method']
    });

    if (methods) {
      res.json(methods);
      console.log(methods);
    }
    
    else res.status(404).json({ success: false, message: 'There is no method' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
