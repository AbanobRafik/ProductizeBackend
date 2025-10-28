import UserModel from "../Model/UserModel.js";

export const showAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (users.length === 0) {
      res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      res.status(400).json({ message: "This user is not found" });
    }
    res.status(201).json(user);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(400).json({ message: "No user to delete" });
    }
    res.status(201).json({ message: `user with ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "No user to update" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
