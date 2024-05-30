import PharmacyRepository from "../repository/verifyPharmacy-repository.js";

class PharmacyService {
  constructor() {
    this.pharmacyRepository = new PharmacyRepository();
  }

  async createNewPharmacy(pharmacyData) {
    try {
      return await pharmacyRepository.createPharmacy(pharmacyData);
    } catch (error) {
      throw error;
    }
  }
  async updatePharmacyDetails(userId, data) {
    const pharmacy = await this.pharmacyRepository.findById(userId);
    if (!pharmacy) {
      throw { status: 404, message: 'Pharmacy details not found' };
    }

    const updatedPharmacy = await this.pharmacyRepository.updateById(userId, data);

    // Set the status to 'pending' indicating that the pharmacy request is pending approval
    updatedPharmacy.status = 'pending';
    await updatedPharmacy.save();

    return updatedPharmacy;
}


  async getPharmacyDetails(userId) {
    const pharmacy = await this.pharmacyRepository.findById(userId);
    if (!pharmacy) {
      throw { status: 404, message: 'Pharmacy details not found' };
    }
    return pharmacy;
  }

  async getAllPendingRequests() {
    return await this.pharmacyRepository.findAll({ isApproved: false });
  }

  async approvePharmacyDetails(id) {
    return await this.pharmacyRepository.updateById(id, { status: 'approved' });
}


}

export default PharmacyService;
