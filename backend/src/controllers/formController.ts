// backend/src/controllers/formController.ts
import { Request, Response } from 'express';
import { createForm, storeSubmission, getSubmissionsByFormId, exportSubmissionsToCSV } from '../models/formModels';

// Create a form
export const createFormHandler = async (req: Request, res: Response) => {
  const { title, description, fields } = req.body;
  try {
    const form = await createForm(title, description, fields);
    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create form' });
  }
};

// Handle form submission
export const handleFormSubmission = async (req: Request, res: Response) => {
  const { formId, responses } = req.body;
  try {
    await storeSubmission(formId, responses);
    res.status(200).json({ message: 'Submission successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit form' });
  }
};

// Get all submissions for a form
export const getFormSubmissions = async (req: Request, res: Response) => {
  const { formId } = req.params;
  try {
    const submissions = await getSubmissionsByFormId(formId);
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
};

// Export form submissions to CSV
export const exportSubmissionsCSV = async (req: Request, res: Response) => {
  const { formId } = req.params;
  try {
    const csv = await exportSubmissionsToCSV(formId);
    res.header('Content-Type', 'text/csv');
    res.attachment('submissions.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Failed to export submissions' });
  }
};
