import React from 'react';
import { Field } from '../types/FieldTypes.ts';

interface FieldEditorProps {
  field: Field;
  onUpdate: (updatedField: Field) => void;
}

const FieldEditor: React.FC<FieldEditorProps> = ({ field, onUpdate }) => {
  const handleChange = (key: keyof Field, value: any) => {
    onUpdate({ ...field, [key]: value });
  };

  return (
    <div className="field-editor">
      <h4>Edit Field</h4>
      <label>Label</label>
      <input
        type="text"
        value={field.label}
        onChange={e => handleChange('label', e.target.value)}
      />

      <label>Required</label>
      <input
        type="checkbox"
        checked={field.required}
        onChange={e => handleChange('required', e.target.checked)}
      />

      {(field.type === 'select' || field.type === 'radio') && (
        <>
          <label>Options (comma-separated)</label>
          <input
            type="text"
            value={field.options?.join(', ') || ''}
            onChange={e => handleChange('options', e.target.value.split(',').map(o => o.trim()))}
          />
        </>
      )}

      {field.type !== 'checkbox' && field.type !== 'date' && (
        <>
          <label>Placeholder</label>
          <input
            type="text"
            value={field.placeholder || ''}
            onChange={e => handleChange('placeholder', e.target.value)}
          />
        </>
      )}
    </div>
  );
};

export default FieldEditor;
