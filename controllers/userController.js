const UserServices = require("../services/user");

class UserController{
  //Register new User
  static async registerUser(req, res){
    try{
      const { full_name, username, email, password, phone_number, is_active } = req.body;
      const newUser = await UserServices.createUser({
        full_name,
        username,
        email,
        password,
        phone_number,
        is_active
      });

      return res.status(201).json({
        message: "User created successfully",
        token: newUser.token,
        user: newUser.newUser,
      });
    } catch (error) {
      if (error.code === 11000) {
        // Handle duplicate email or username or phone number error
        return res
          .status(409)
          .json({ message: "Email or Username or Phone Number already exists" });
      }
      return res
        .status(500)
        .json({ message: "Error registering user", error: error.message });
    }
  }

  //User login
  static async userLogin(req, res){
    try{
      const { username, password } = req.body;
      const userToken = await UserServices.getUserToken({ username, password });

      return res.status(200).json({ message: "Login successful", userToken });
    } catch (error) {
      if (
        error.message === "User not found" ||
        error.message === "Invalid credentials"
      ) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      return res
        .status(500)
        .json({ message: "Error logging in", error: error.message });
    }
  }

  //Get User details
  static async getUserDetails(req, res){
    try{
      const user_id = req.userId;
      const user = await UserServices.getUserById(user_id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching user data", error: error.message });
    }
  }

  //Update User
  static async updateUser(req, res){
    try{
      const updates = req.body;

      const updatedUser = await UserServices.updateUser(updates, req.userId);

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating user data', error: error.message });
    }
  }

  //Delete User
  static async deleteUser(req, res){
    try{
      const deletedUser = await UserServices.deleteUser(req.userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ msg: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user data', error: error.message });
    }
  }
}

module.exports = UserController
