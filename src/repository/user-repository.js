// repository/user.repository.js
import User from "../models/user.js";

class UserRepository {
    async findOne(filter) {
        try {
            return await User.findOne(filter);
        } catch (error) {
            throw new Error(`Error finding user: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            throw new Error(`Error finding user by ID: ${error.message}`);
        }
    }

    async create(data) {
        try {
            const user = new User(data);
            return await user.save();
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    async save(user) {
        try {
            return await user.save();
        } catch (error) {
            throw new Error(`Error saving user: ${error.message}`);
        }
    }
    async deleteById(id) {
        try {
            return await User.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}

export default UserRepository;

