import UserRepository from "../repository/user-repository.js";

const checkAdmin = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const userRepository = new UserRepository();
    const user = await userRepository.findById(userId);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ type: "error", message: "Access denied" });
    }

    next();
  } catch (error) {
    res.status(500).json({ type: "error", message: "Internal server error" });
  }
};

export default checkAdmin;
