const User = require("../model/User");

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      // Tìm tất cả user có trong database
      const user = await User.find();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    try {
      // v1/users/:id
      const user = await User.findById(req.params.id);
      return res.status(200).json("Deleted successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = userController;
