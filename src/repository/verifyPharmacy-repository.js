import Pharmacy from "../models/verifyPharmacy.js";

class PharmacyRepository {
    async create(data) {
        try {
            const pharmacy = new Pharmacy(data);
            return await pharmacy.save();
        } catch (error) {
            throw new Error(`Error creating pharmacy: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            return await Pharmacy.findById(id);
        } catch (error) {
            throw new Error(`Error finding pharmacy by ID: ${error.message}`);
        }
    }

    async updateById(id, data) {
        try {
            return await Pharmacy.findByIdAndUpdate(id, { ...data, status: 'pending' }, { new: true });
        } catch (error) {
            throw new Error(`Error updating pharmacy: ${error.message}`);
        }
    }
    

    async findAll(filter) {
        try {
            return await Pharmacy.find(filter);
        } catch (error) {
            throw new Error(`Error finding pharmacies: ${error.message}`);
        }
    }
   
}

export default PharmacyRepository;
