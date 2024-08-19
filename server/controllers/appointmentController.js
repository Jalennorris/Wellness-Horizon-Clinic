import pool from '../db/index.js';
import { createErrorResponse,createBadRequestResponse} from '../utils/errorUtils.js';
import cache from '../utils/cacheUtils.js';

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

            // Invalidate the cache after creating a new appointment
            cache.del('appointments');
            cache.del('user:' + user_id);


            res.set('Cache-Control', 'no-store');  // Disabling cache for create operations

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
            const cachedAppointment = cache.get(cacheKey);

            let appointment;
            if (cachedAppointment) {
                console.log('Returning cached appointment data');
                appointment = cachedAppointment;
            } else {
                const query = 'SELECT * FROM appointments WHERE id = $1';
                const { rows: appointments } = await pool.query(query, [id]);
                if (appointments.length === 0) {
                    return res.status(404).json(createBadRequestResponse(`Appointment with ID ${id} not found.`));
                }
                appointment = appointments[0];
                cache.set(cacheKey, appointment); // Cache the appointment data
            }
            //set Etag for condital requests
            const etag = JSON.stringify(appointment)
            res.set('ETag', etag);
            // Check if the resource has not been modified

            if(req.headers['if-none-match'] === etag){
                return res.status(304).end() // Not modified
            }

            res.set('Cache-Control', 'public, max-age=3600');// Cache for 1 hour


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

            // Invalidate the cache after updating the appointment
            cache.del(`appointment:${id}`);
            cache.del('appointments');
            cache.del('user:' + updatedAppointment[0].user_id);
            res.set('Cache-Control', 'no-store');  // Disabling cache for update operations

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
            const cachedAppointments = cache.get(cacheKey);

            let appointments;
            if (cachedAppointments) {
                console.log('Returning cached appointments data');
                appointments = cachedAppointments;
            } else {
                const query = 'SELECT * FROM appointments';
                const { rows: allAppointments } = await pool.query(query);
                appointments = allAppointments;
                cache.set(cacheKey, appointments); // Cache the appointments data
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
            const cachedAppointmentsByUser = cache.get(cacheKey);

            let appointmentsByUser;
            if (cachedAppointmentsByUser) {
                console.log('Returning cached appointments for user');
                appointmentsByUser = cachedAppointmentsByUser;
            } else {
                const query = 'SELECT * FROM appointments WHERE user_id = $1';
                const { rows: appointments } = await pool.query(query, [id]);
                if (appointments.length === 0) {
                    return res.status(404).json(createBadRequestResponse(`There are no appointments for user with ID ${id}.`));
                }
                appointmentsByUser = appointments;
                cache.set(cacheKey, appointmentsByUser); // Cache the appointments by user data

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
