const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, role } = req.body;
        
        if(!name || !email || !password || !confirmPassword || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const alreadyExist = await User.findOne({email});
        if(alreadyExist) {
            return res.status(400).json({
                success: false,
                message: "User is already registered, please sign in"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h"
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user, 
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist, please sign up first",
            });
        }

        if(await bcrypt.compare(password, user.password)) {
            const payload = {
                id: user._id,
                email: user.email,
                role: user.role,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h"
            });

            return res.status(200).json({
                success: true,
                message: "Logged in successfully",
                user,
                token,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
        });
    }
};