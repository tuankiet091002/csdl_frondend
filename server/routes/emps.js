import express from 'express';
import {getEmps, createEmp, deleteEmp} from '../controllers/emps.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEmps);
router.post('/', createEmp);
router.delete('/:id', auth, deleteEmp);

export default router;