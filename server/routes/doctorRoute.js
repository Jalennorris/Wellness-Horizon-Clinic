import express from 'express';
import doctor from '../controllers/doctosController.js'

express.Router();
const router = express.Router();

// Route to get all doctors
router.get('/', doctor.getAllDoctors);

// Route to get a doctor by its ID
router.get('/:id', doctor.getDoctorbyId);   

// Route to create a new doctor
router.post('/create', doctor.createDoctor);

// Route to update a doctor by its ID
router.put('/update/:id', doctor.updateDoctor);

// Route to delete a doctor by its ID
router.delete('/delete/:id', doctor.deleteDoctor);

export default router;