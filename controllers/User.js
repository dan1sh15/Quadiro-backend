const User = require('../models/User');

exports.getUser = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            messge: "Internal server error"
        });
    }
};