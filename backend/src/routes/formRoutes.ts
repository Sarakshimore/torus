// backend/src/routes/formRoutes.ts
import express from 'express';
import { createFormHandler, handleFormSubmission, getFormSubmissions, exportSubmissionsCSV } from '../controllers/formController';

const router = express.Router();

// Form Management Routes
router.post('/create-form', createFormHandler);
router.post('/submit', handleFormSubmission);

// Fetch and export submissions
router.get('/submissions/:formId', getFormSubmissions);
router.get('/submissions/export/:formId', exportSubmissionsCSV);

export default router;
