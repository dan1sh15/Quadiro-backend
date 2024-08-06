const Car = require("../models/Car");

exports.createCar = async (req, res) => {
    try {
        const { carName, manufacturingYear, price } = req.body;
        if(!carName || !manufacturingYear || !price) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        } 

        const car = await Car.create({
            carName,
            manufacturingYear,
            price
        });

        if(!car) {
            return res.status(400).json({
                success: false,
                message: "Car details cannot be added"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Car details saved successfully",
            data: car
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.editCar = async (req, res) => {
    try {
        
        const { carName, manufacturingYear, price } = req.body;
        const id = req.header('carId');

        if(!id || !carName || !manufacturingYear || !price) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const findCar = await Car.findById(id);

        if(!findCar) {
            return res.status(400).json({
                success: false,
                message: "Car details do not exist",
            });
        }

        const newCar = await Car.findByIdAndUpdate(id, {
            carName,
            manufacturingYear,
            price
        }, {new: true});

        return res.status(200).json({
            success: true,
            message: "Car details updated successfully",
            data: newCar,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        
        const id = req.header('carId');
        if(!id) {
            return res.status(400).json({
                success: false,
                message: "Something went wrong!"
            });
        }

        const findCar = await Car.findById(id);

        if(!findCar) {
            return res.status(400).json({
                success: false,
                message: "Car details not found",
            });
        }

        await Car.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Car details deleted successfully",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.fetchAllCars = async (req, res) => {
    try {
        const cars = await Car.find();

        return res.status(200).json({
            success: true,
            message: "Details fetched successfully",
            data: cars
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};