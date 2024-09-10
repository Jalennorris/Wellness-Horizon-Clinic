import pool from "../db/index.js"
import { createBadRequestResponse } from "../utils/errorUtils.js";




export default {


    getAllDoctors: async (req, res) => {
        try {
            const query = 'SELECT * FROM doctors';
            const { rows } = await pool.query(query);
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching doctos:', error);
            res.status(500).json(createBadRequestResponse('Failed to fetch doctos'));
        }


    },

    createDoctor: async (req, res) => {
        try {
            const { name, specialization, availability } = req.body;

            if (!name || !specialization || !availability) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const query = 'INSERT INTO doctors (name, specialization, availability) VALUES ($1, $2, $3) RETURNING *';
            const values = [name, specialization, availability];
            const { rows } = await pool.query(query, values);
            res.status(201).json({
                doctor: rows[0],
                status: true,
                message: "Doctor has been created successfully.",


        });
        } catch (error) {
            console.error('Error creating doctor:', error);
            res.status(500).json(createBadRequestResponse('Failed to create doctor'));
        }
    },

    getDoctorbyId: async (req, res) => {
        try {
            const { id } = req.params;
            const query = 'SELECT * FROM doctors WHERE id = $1';
            const { rows } = await pool.query(query, [id]);
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Doctor not found' });
            }
            res.status(200).json(rows[0]);
        } catch (error) {
            console.error('Error fetching doctor:', error);
            res.status(500).json(createBadRequestResponse('Failed to fetch doctor'));
        }
    },

    updateDoctor: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, specialization, availability } = req.body;
            const query = 'UPDATE doctors SET name = $1, specialization = $2, availability = $3 WHERE id = $4 RETURNING *';
            const values = [name, specialization, availability, id];
            const { rows } = await pool.query(query, values);
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Doctor not found' });
            }
            res.status(200).json(rows[0]);
        } catch (error) {
            console.error('Error updating doctor:', error);
            res.status(500).json(createBadRequestResponse('Failed to update doctor'));
        }
    },

    deleteDoctor: async (req, res) => {
        try {
            const { id } = req.params;
            const query = 'DELETE FROM doctors WHERE id = $1 RETURNING *';
            const { rows } = await pool.query(query, [id]);
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Doctor not found' });
            }
            res.status(200).json({ message: 'Doctor deleted successfully' });
        } catch (error) {
            console.error('Error deleting doctor:', error);
            res.status(500).json(createBadRequestResponse('Failed to delete doctor'));
        }
    },

}