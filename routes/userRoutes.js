const express = require('express') ;
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/register' , userController.register_get);
router.get('/registerError' , userController.register_get_err);
router.post('/register' , userController.register_post);

module.exports = router;
