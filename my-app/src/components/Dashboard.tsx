// frontend/src/components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Form {
  formId: string;
  title: string;
  description: string;
  link: string;
  fields: any[]; // You can refine this type based on the actual structure of the form fields
}

const Dashboard = () => {
  const [forms, setForms] = useState<Form[]>([]);


  useEffect(() => {
    const fetchForms = async () => {
      const result = await axios.get('/api/forms');
      setForms(result.data);
    };

    fetchForms();
  }, []);

  return (
    <div>
      <h1>Your Forms</h1>
      {forms.map((form) => (
        <div key={form.formId}>
          <h3>{form.title}</h3>
          <button onClick={() => window.location.href = `/form/${form.formId}`}>Edit</button>
          <button onClick={() => handleDelete(form.formId)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

const handleDelete = (formId: string) => {
  // Send DELETE request to delete the form
  axios.delete(`/api/form/${formId}`);
};

export default Dashboard;
