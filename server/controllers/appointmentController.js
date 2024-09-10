import pool from '../db/index.js';
import { createErrorResponse, createBadRequestResponse } from '../utils/errorUtils.js';
import cacheUtils from '../utils/cacheUtils.js';

export default {
    createAppointment: async (req, res) => {
        try {
            const { user_id, doctor_id, specialization, date, time, description, notes } = req.body;
    
            // Ensure all required fields are present
            if (!user_id || !doctor_id || !specialization || !date || !time) {
                return res.status(400).json(createBadRequestResponse('All fields (user_id, doctor_id, specialization, date, time) are required to complete the appointment.'));
            }
    
            // Insert the appointment into the database
            const appointmentQuery = `
                INSERT INTO appointments (user_id, doctor_id, specialization, date, time, description, notes) 
                VALUES ($1, $2, $3, $4, $5, $6, $7) 
                RETURNING *`;
            const { rows: newAppointment } = await pool.query(appointmentQuery, [user_id, doctor_id, specialization, date, time, description, notes]);
    
            // Invalidate cache after creating a new appointment
            await cacheUtils.delCache('appointments');
            await cacheUtils.delCache('user:' + user_id);
    
            // Disable caching for creation operations
            res.set('Cache-Control', 'no-store');
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

            // Check cache first
            const cacheKey = `appointment:${id}`;
            let appointment = await cacheUtils.getCache(cacheKey);

            if (!appointment) {
                console.log('Cache miss, querying database');
                const query = 'SELECT * FROM appointments WHERE id = $1';
                const { rows: appointments } = await pool.query(query, [id]);
                if (appointments.length === 0) {
                    return res.status(404).json(createBadRequestResponse(`Appointment with ID ${id} not found.`));
                }
                appointment = appointments[0];
                await cacheUtils.setCache(cacheKey, appointment); // Cache the appointment data
            } else {
                console.log('Returning cached appointment data');
            }

            // Set ETag for conditional requests
            const etag = JSON.stringify(appointment);
            res.set('ETag', etag);

            // Check if the resource has not been modified
            if (req.headers['if-none-match'] === etag) {
                return res.status(304).end(); // Not modified
            }

            res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
            return res.status(200).json({
                appointment,
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

            // Invalidate cache after updating the appointment
            await cacheUtils.delCache(`appointment:${id}`);
            await cacheUtils.delCache('appointments');
            await cacheUtils.delCache('user:' + updatedAppointment[0].user_id);

            res.set('Cache-Control', 'no-store');  // Disable caching for update operations
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
            // Check cache first
            const cacheKey = 'appointments';
            let appointments = await cacheUtils.getCache(cacheKey);

            if (!appointments) {
                console.log('Cache miss, querying database');
                const query = 'SELECT * FROM appointments';
                const { rows: allAppointments } = await pool.query(query);
                appointments = allAppointments;
                await cacheUtils.setCache(cacheKey, appointments); // Cache the appointments data
            } else {
                console.log('Returning cached appointments data');
            }

            res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
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
    
            // Check cache first
            const cacheKey = `user:${id}:appointments`;
            let appointmentsByUser = await cacheUtils.getCache(cacheKey);
    
            if (!appointmentsByUser) {
                console.log('Cache miss, querying database');
                const query = 'SELECT * FROM appointments WHERE user_id = $1';
                const { rows: appointments } = await pool.query(query, [id]);
    
                // Log appointments for debugging
                console.log(`Appointments from DB for user ${id}:`, appointments);
    
                if (appointments.length === 0) {
                    return res.status(404).json(createBadRequestResponse(`There are no appointments for user with ID ${id}.`));
                }
    
                appointmentsByUser = appointments;
                await cacheUtils.setCache(cacheKey, appointmentsByUser); // Cache the appointments by user data
            } else {
                console.log('Returning cached appointments for user');
            }
    
            res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
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