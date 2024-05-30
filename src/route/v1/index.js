import express from "express";
import checkAuth from "../../middleware/checkAuth.js";
import {
  fetchCurrentUser,
  loginUser,
  registerUser,
  verifyOTP,
  resendOtp
} from "../../controller/user-controller.js";

const router = express.Router();

router.post("/register", registerUser); 
router.post("/login_with_phone", loginUser); 
router.post("/verify", verifyOTP); 
router.get("/me", checkAuth, fetchCurrentUser); 
router.post('/resend-otp', resendOtp);

export default router;
