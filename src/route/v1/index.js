import express from "express";
import checkAuth from "../../middleware/checkAuth.js";
import {
  fetchCurrentUser,
  loginUser,
  registerUser,
  verifyOTP,
  resendOtp,
  deleteUserWithPharmacy
} from "../../controller/user-controller.js";
import { updatePharmacyDetails, getPharmacyDetails, getAllPendingRequests, approvePharmacyDetails } from '../../controllers/verifyPharmacy-controller.js';
import { authenticateUser, authenticateAdmin } from '../middleware/checkAdmin.js';


const router = express.Router();

router.post("/register", registerUser); 
router.post("/login_with_phone", loginUser); 
router.post("/verify", verifyOTP); 
router.get("/me", checkAuth, fetchCurrentUser); 
router.post('/resend-otp', resendOtp);
router.delete("/:userId", checkAuth, checkAdmin, deleteUserWithPharmacy);

router.put('/update-pharmacy-details', authenticateUser, updatePharmacyDetails);
router.get('/pharmacy-details', authenticateUser, getPharmacyDetails);
router.get('/admin/pending-requests', authenticateAdmin, getAllPendingRequests);
router.put('/admin/approve-pharmacy/:id', authenticateAdmin, approvePharmacyDetails);

export default router;
