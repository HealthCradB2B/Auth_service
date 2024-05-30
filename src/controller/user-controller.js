import UserService from "../services/user-service.js";

const userService = new UserService();

export const registerUser = async (req, res, next) => {
  try {
    console.log("Received request to register user:", req.body);
    const user = await userService.createNewUser(req.body);
    await userService.sendOTP(user.phone);
    console.log("User registered successfully:", user);
    res.status(200).json({
      type: "success",
      message: "Account created, OTP sent to mobile number",
      data: { userId: user._id },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    console.log("Received request to login user:", req.body);
    const user = await userService.loginWithPhoneOtp(req.body.phone);
    console.log("User logged in successfully:", user);
    res.status(201).json({
      type: "success",
      message: "OTP sent to your registered phone number",
      data: { userId: user.user._id },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    console.log("Received request to verify OTP:", req.body);
    const result = await userService.verifyPhoneOtp(req.body);
    console.log("OTP verified successfully:", result);
    res.status(201).json({
      type: "success",
      message: "OTP verified successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    next(error);
  }
};

export const fetchCurrentUser = async (req, res, next) => {
  try {
    console.log("Received request to fetch current user:", req.user);
    const user = await userService.fetchCurrentUser(req.user);
    console.log("Current user fetched successfully:", user);
    res.status(200).json({
      type: "success",
      message: "Fetched current user successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    next(error);
  }
};

export const resendOtp = async (req, res, next) => {
  try {
      console.log("Received request to resend OTP:", req.body);
      const { phone } = req.body;
      const otp = await userService.sendOTP(phone);
      console.log("OTP resent successfully:", otp);
      res.status(200).json({
          type: "success",
          message: "OTP resent to your registered phone number",
          data: { otp }
      });
  } catch (error) {
      console.error("Error resending OTP:", error);
      next(error);
  }
};

export const deleteUserWithPharmacy = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deletedUser = await userService.deleteUserById(userId);
    res.status(200).json({
      type: "success",
      message: "User and associated pharmacy details deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    next(error);
  }
};