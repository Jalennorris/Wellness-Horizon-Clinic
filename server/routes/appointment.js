import express from 'express';
import appointmentController from '../controllers/appointmentController';

const router = express.Router();

// Route to get all appointments
router.get('/', appointmentController.getAllAppointments);

// Route to get an appointment by its ID
router.get('/:id', appointmentController.getByAppointmentId);

// Route to create a new appointment
router.post('/create', appointmentController.createAppointment); // Added leading slash

// Route to update an appointment by its ID
router.put('/update/:id', appointmentController.updateAppointment); // Fixed typo and added leading slash

// Route to get all appointments for a specific user
router.get('/user/:id', appointmentController.getAppointmentsByUser); // Fixed route path

export default router;
