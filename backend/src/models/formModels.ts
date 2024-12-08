import { v4 as uuidv4 } from 'uuid';
import db from '../db';
import { Parser } from 'json2csv';

// Define a type for the form responses
interface SubmissionResponse {
  [key: string]: string | number | boolean | null;
}

// Define a type for the database response from the submissions query
interface Submission {
  form_id: string;
  responses: string;
  // Add any other columns from the submissions table if necessary
}

// Generate unique form link
export const generateFormLink = (formId: string): string => {
  return `http://localhost:3000/form/${formId}`;
};

// Create a form
export const createForm = (title: string, description: string, fields: any) => {
  return new Promise((resolve, reject) => {
    const formId = uuidv4();  // Generate unique ID for each form
    const formLink = generateFormLink(formId);

    const query = "INSERT INTO forms (form_id, title, description, fields, link) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [formId, title, description, JSON.stringify(fields), formLink], (err, result) => {
      if (err) return reject(err);
      resolve({ formId, formLink });
    });
  });
};

// Store form submission
export const storeSubmission = (formId: string, responses: SubmissionResponse) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO submissions (form_id, responses) VALUES (?, ?)";
    db.query(query, [formId, JSON.stringify(responses)], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Get all submissions for a specific form
export const getSubmissionsByFormId = (formId: string): Promise<Submission[]> => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM submissions WHERE form_id = ?";
    db.query(query, [formId], (err, result) => {
      if (err) return reject(err);
      // Ensure result is cast to the expected type
      resolve(result as Submission[]);
    });
  });
};

// Export submissions to CSV
export const exportSubmissionsToCSV = async (formId: string): Promise<string> => {
  const submissions = await getSubmissionsByFormId(formId);

  // Ensure that the response data is properly typed as an array of objects
  const formattedSubmissions = submissions.map(submission => {
    const response = JSON.parse(submission.responses);
    return { ...response };  // Ensure the response is in the correct format
  });

  const parser = new Parser();
  try {
    const csv = parser.parse(formattedSubmissions);  // Pass correctly formatted data to parser
    return csv;
  } catch (error) {
    console.error("Error parsing submissions to CSV:", error);
    throw error;
  }
};
