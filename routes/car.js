const express = require('express');
const { auth, isAdmin } = require('../middleware/auth');
const { createCar, editCar, deleteCar, fetchAllCars } = require('../controllers/Car');
const router = express.Router();

router.post('/createCar', auth, isAdmin, createCar);
router.put('/editCar', auth, isAdmin, editCar);
router.delete('/deleteCar', auth, isAdmin, deleteCar);
router.get('/getAllCars', auth, fetchAllCars);

module.exports = router;