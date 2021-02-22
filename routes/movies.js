const express = require('express');
const router = express.Router();

const {index, list, show, create, store, edit, update,remove,search} = require('../controllers/moviesController')

router.get('/index',index);
router.get('/list',list)


module.exports = router;