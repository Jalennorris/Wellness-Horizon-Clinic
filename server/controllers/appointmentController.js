import pool from '../db/index';
import { createBadRequestResponse, createErrorResponse } from '../utils/errorUtils';

export default {
    createAppointment: async (req, res) => {
        try {
            const { user_id, date, time, duration, description } = req.body;
            if (!user_id || !date || !time || !duration) {
                return res.status(400).json(createBadRequestResponse('All fields are required to complete the appointment.'));
            }
            const appointmentQuery = `
                INSERT INTO appointments (user_id, date, time, duration, description) 
                VALUES ($1, $2, $3, $4, $5) 
                RETURNING *`;
            const { rows: newAppointment } = await pool.query(appointmentQuery, [user_id, date, time, duration, description]);
            return res.status(201).json({
                appointment: newAppointment[0],
                status: true,
                message: "Appointment has been created successfully."
            });
        } catch (error) {
            console.error('Error creating appointment:', error);
            return res.status(500).json(createErrorResponse('Internal server error when creating appointment.'));
        }
    },

    getByAppointmentId: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json(createBadRequestResponse('The ID is needed to get the appointment.'));
            }
            const query = 'SELECT * FROM appointments WHERE id = $1';
            const { rows: appointment } = await pool.query(query, [id]);
            if (appointment.length === 0) {
                return res.status(404).json(createBadRequestResponse(`Appointment with ID ${id} not found.`));
            }
            return res.status(200).json({
                appointment: appointment[0],
                message: `Appointment ${id} was found.`,
            });
        } catch (error) {
            console.error('Error finding appointment by ID:', error);
            return res.status(500).json(createErrorResponse('Internal server error when getting the appointment by ID.'));
        }
    },

    updateAppointment: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json(createBadRequestResponse('The ID is needed to update the appointment.'));
            }
            const { date, time, duration, description } = req.body;
            const updateQuery = `
                UPDATE appointments 
                SET date = $1, time = $2, duration = $3, description = $4 
                WHERE id = $5 
                RETURNING *`;
            const { rows: updatedAppointment } = await pool.query(updateQuery, [date, time, duration, description, id]);
            if (updatedAppointment.length === 0) {
                return res.status(404).json(createBadRequestResponse(`Appointment with ID ${id} not found.`));
            }
            return res.status(200).json({
                appointment: updatedAppointment[0],
                status: true,
                message: "Appointment has been updated successfully."
            });
        } catch (error) {
            console.error('Error updating appointment by ID:', error);
            return res.status(500).json(createErrorResponse('Internal server error when updating the appointment.'));
        }
    },

    getAllAppointments: async (req, res) => {
        try {
            const query = 'SELECT * FROM appointments';
            const { rows: appointments } = await pool.query(query);
            return res.status(200).json({
                appointments,
                message: "All appointments retrieved successfully."
            });
        } catch (error) {
            console.error('Error retrieving all appointments:', error);
            return res.status(500).json(createErrorResponse('Internal server error when retrieving all appointments.'));
        }
    },
    getAppointmentsByUser: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json(createBadRequestResponse('The ID is needed to get the appointments by user.'));
            }
            const query = 'SELECT * FROM appointments WHERE user_id = $1';
            const { rows: appointmentsByUser } = await pool.query(query, [id]);
            if (appointmentsByUser.length === 0) {
                return res.status(404).json(createBadRequestResponse(`There are no appointments for user with ID ${id}.`));
            }
            return res.status(200).json({
                appointments: appointmentsByUser,
                message: `Here are the appointments for user with ID ${id}.`
            });
        } catch (error) {
            console.error(`Error retrieving appointments for user with ID ${id}:`, error);
            return res.status(500).json(createErrorResponse(`Internal server error when retrieving appointments for user with ID ${id}.`));
        }
    }
    
};
