const express = require('express');
const verifyRole = require('../middleware/verify');
const whitelist = require('../middleware/whitelist');
const { menu, getMenuById, addMenu, editMenu, deleteMenu, disableMenu, getDrinks, getDrinkById, addDrink, editDrink, deleteDrink, disableDrink, allmenu, getAllMenuById, getAllDrinks, getAllDrinkById } = require('../controllers/menuController');

const router = express.Router();

router.get('/menu', menu);

router.get('/menu/:id', getMenuById);

router.get('/allmenu', whitelist, verifyRole('admin'), allmenu);

router.get('/allmenu/:id', whitelist, verifyRole('admin'), getAllMenuById);

router.post('/addmenu', whitelist, verifyRole('admin'), addMenu);

router.put('/editmenu/:id', whitelist, verifyRole('admin'), editMenu);

router.delete('/deletemenu/:id', whitelist, verifyRole('admin'), deleteMenu);

router.patch('/disablemenu/:id', whitelist, verifyRole('admin'), disableMenu);

router.get('/drink', getAllDrinks);

router.get('/drink/:id', getAllDrinkById);

router.get('/alldrink', whitelist, verifyRole('admin'), getDrinks);

router.get('/alldrink/:id', whitelist, verifyRole('admin'), getDrinkById);

router.post('/adddrink', whitelist, verifyRole('admin'), addDrink);

router.put('/editDrink/:id', whitelist, verifyRole('admin'), editDrink);

router.delete('/deleteDrink/:id', whitelist, verifyRole('admin'), deleteDrink);

router.patch('/disableDrink/:id', whitelist, verifyRole('admin'), disableDrink);

module.exports = router;