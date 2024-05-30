import PharmacyService from "../services/verifyPharmacy-service.js";

const pharmacyService = new PharmacyService();

export const updatePharmacyDetails = async (req, res, next) => {
  try {
    console.log("Received request to update pharmacy details:", req.body);
    const userId = req.user._id; // assuming user ID is stored in req.user
    const updatedPharmacy = await pharmacyService.updatePharmacyDetails(userId, req.body);
    console.log("Pharmacy details updated successfully:", updatedPharmacy);
    res.status(200).json({
      type: "success",
      message: "Pharmacy details updated successfully, awaiting approval",
      data: updatedPharmacy,
    });
  } catch (error) {
    console.error("Error updating pharmacy details:", error);
    next(error);
  }
};

export const getPharmacyDetails = async (req, res, next) => {
  try {
    console.log("Received request to get pharmacy details:", req.user);
    const userId = req.user._id;
    const pharmacy = await pharmacyService.getPharmacyDetails(userId);
    console.log("Pharmacy details fetched successfully:", pharmacy);
    res.status(200).json({
      type: "success",
      message: "Fetched pharmacy details successfully",
      data: pharmacy,
    });
  } catch (error) {
    console.error("Error fetching pharmacy details:", error);
    next(error);
  }
};

// Admin routes
export const getAllPendingRequests = async (req, res, next) => {
  try {
    console.log("Received request to get all pending requests");
    const pendingRequests = await pharmacyService.getAllPendingRequests();
    console.log("Pending requests fetched successfully:", pendingRequests);
    res.status(200).json({
      type: "success",
      message: "Fetched all pending requests successfully",
      data: pendingRequests,
    });
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    next(error);
  }
};

export const approvePharmacyDetails = async (req, res, next) => {
  try {
    console.log("Received request to approve pharmacy details:", req.params.id);
    const approvedPharmacy = await pharmacyService.approvePharmacyDetails(req.params.id);
    console.log("Pharmacy details approved successfully:", approvedPharmacy);
    res.status(200).json({
      type: "success",
      message: "Pharmacy details approved successfully",
      data: approvedPharmacy,
    });
  } catch (error) {
    console.error("Error approving pharmacy details:", error);
    next(error);
  }
};