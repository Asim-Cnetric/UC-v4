const Auth = require("./auth");
const User = require("../models/userModel");

class UserServices {
    //Get User from ID
    static async getUserById(id){
        const user = await User.findById(id).select('-password');
        return user;
    }

    //Get User by Username
    static async getUserbyUsername(username){
        const user = await User.findOne({username: username});
        return user;
    }

    //Create New User
    static async createUser(payload){
        const { full_name, username, email, password, phone_number, is_active } = payload;
        const salt = Auth.generateSalt();
        const hashedPassword = Auth.generateHash(salt, password);

        const user = new User({
            full_name,
            username,
            email,
            password: hashedPassword,
            phone_number,
            is_active: is_active || true 
        });

        const newUser = await user.save().select('-password');
        const tokenExpiry = process.env.JWT_EXPIRES_IN_USER || "1h";
        const token = AuthService.generateToken(newUser, tokenExpiry);

        return { newUser, token };
    }

    static async getUserToken(payload) {
        const { username, password } = payload;
        const user = await this.getUserbyUsername(username);
    
        if (!user) throw new Error("User not found");
        const userPassword = user.password;
    
        const isValidPassword = Auth.validatePassword(password, userPassword);
        if (!isValidPassword) throw new Error("Invalid credentials");
        const tokenExpiry = process.env.JWT_EXPIRES_IN_USER || "1h";
    
        return AuthService.generateToken(user._id, tokenExpiry);
    }

    static async updateUser(payload, id){
        const update = payload;

        if(update.password){
            const salt = Auth.generateSalt();
            update.password = Auth.generateHash(salt, password);
        };
        const updatedUser = await User.findByIdAndUpdate(id, update, { new: true, runValidators: true }).select('-password');
        return updatedUser;
    }

    static async deleteUser(id){
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
    }
}

module.exports = UserServices;