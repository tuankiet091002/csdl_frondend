import express from 'express';
import {getEmps, createEmp, deleteEmp} from '../controllers/emps.js';

const router = express.Router();

router.get('/', getEmps);
router.post('/', createEmp);
router.delete('/:id', deleteEmp);

export default router;