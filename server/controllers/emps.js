import express from 'express';
import mongoose from 'mongoose';

import Employee from "../models/emps.js";

const router = express.Router()

export const getEmps = async (req, res) => {
    try {
        const empProfiles = await Employee.find();
        
            
        res.status(200).json(empProfiles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
}

export const createEmp = async (req, res) => {
    const emp = req.body;
    const newEmp = new Employee(emp);

    try {
        await newEmp.save();

        res.status(201).json(newEmp);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteEmp = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`No post with id: ${id}`);
        
    await Employee.findByIdAndDelete(id);
    res.json({ message: "An Employee has been unexisted!"})
}

export default router;