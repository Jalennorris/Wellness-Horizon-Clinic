import express from 'express';
import appointment from '../controllers/appointmentController.js'

const router = express.Router();

// Route to get all appointments
router.get('/', appointment.getAllAppointments);

// Route to get an appointment by its ID
router.get('/:id', appointment.getByAppointmentId);

// Route to create a new appointment
router.post('/create', appointment.createAppointment);

// Route to update an appointment by its ID
router.put('/update/:id', appointment.updateAppointment);

// Route to get all appointments for a specific user
router.get('/user/:id', appointment.getAppointmentsByUser);

export default router;
