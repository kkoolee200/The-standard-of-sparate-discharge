const express = require('express');
const { Item } = require('../models');

const router = express.Router();
router.get('/', async (req, res, next) => {
  console.log("search 실행은 됌")
  try {
    const searchItem = req.query.searchTerm;
    const search = await Item.findOne({
        where: {name: searchItem},
        attributes: ['name', 'clas', 'method', 'etc']
    });

    if (search) {
      res.json(search);
      console.log(search);
    }
    
    else res.status(404).json({ success: false, message: 'There is no items' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
