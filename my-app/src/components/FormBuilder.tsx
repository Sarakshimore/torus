import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Field, FieldType } from '../types/FieldTypes.ts';
import FieldComponent from './Field.tsx';
import FieldEditor from './FieldEditor.tsx';
import axios from 'axios';

const FormBuilder: React.FC = () => {
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [fields, setFields] = useState<Field[]>([]);

  const addField = (type: FieldType) => {
    const newField: Field = {
      id: crypto.randomUUID(),
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      type,
      required: false,
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const updateField = (updatedField: Field) => {
    setFields(fields.map(field => (field.id === updatedField.id ? updatedField : field)));
  };

  const [, drop] = useDrop(() => ({
    accept: 'FIELD',
    hover: (item: { id: string; index: number }) => {
      const draggedIndex = item.index;
      const targetIndex = fields.findIndex(field => field.id === item.id);
      if (draggedIndex !== targetIndex) {
        const updatedFields = [...fields];
        const [draggedField] = updatedFields.splice(draggedIndex, 1);
        updatedFields.splice(targetIndex, 0, draggedField);
        setFields(updatedFields);
      }
    },
  }));

  const submitForm = async () => {
    try {
      const formData = {
        title: formTitle,
        description: formDescription,
        fields, // This will include all properties of fields (label, type, required, etc.)
      };
  
      const response = await axios.post('http://localhost:5000/api/submit', formData); // Send to the backend
      alert(`Form created! Share this link: ${response.data.formLink}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error creating the form.');
    }
  };
  
  return (
    <div ref={drop} className="form-builder">
      <h2>Form Builder</h2>
      <input
        type="text"
        value={formTitle}
        onChange={e => setFormTitle(e.target.value)}
        placeholder="Form Title"
      />
      <input
        type="text"
        value={formDescription}
        onChange={e => setFormDescription(e.target.value)}
        placeholder="Form Description"
      />

      <div className="field-list">
        {fields.map((field, index) => (
          <div key={field.id} className="field-item">
            <FieldComponent field={field} onRemove={removeField} index={index} />
            <FieldEditor field={field} onUpdate={updateField} />
          </div>
        ))}
      </div>

      <div className="field-actions">
        <button onClick={() => addField('text')}>Add Text Input</button>
        <button onClick={() => addField('number')}>Add Number Input</button>
        <button onClick={() => addField('date')}>Add Date Picker</button>
        <button onClick={() => addField('checkbox')}>Add Checkbox</button>
        <button onClick={() => addField('select')}>Add Dropdown Select</button>
        <button onClick={() => addField('radio')}>Add Radio Buttons</button>
      </div>
      <button onClick={submitForm}>Submit Form</button>
    </div>
  );
};

export default FormBuilder;
