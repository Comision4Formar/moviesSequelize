const express = require('express');
const router = express.Router();

const {index, list, show, create, store, edit, update,remove,search} = require('../controllers/moviesController')

router.get('/index',index);
router.get('/list',list);
router.get('/show/:id',show);
router.get('/search',search);
router.get('/create',create);
router.post('/create',store);
router.get('/edit/:id',edit);
router.put('/edit/:id',update);


module.exports = router;