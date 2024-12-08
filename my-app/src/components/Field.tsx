import React from 'react';
import { Field } from '../types/FieldTypes.ts';

interface FieldProps {
  field: Field;
  index: number;
  onRemove: (id: string) => void;
}

const FieldComponent: React.FC<FieldProps> = ({ field, index, onRemove }) => {
  return (
    <div className="field-preview" draggable>
      <label>{field.label}</label>
      {field.type === 'text' && <input type="text" placeholder={field.placeholder || 'Enter text'} />}
      {field.type === 'number' && <input type="number" placeholder={field.placeholder || 'Enter number'} />}
      {field.type === 'date' && <input type="date" />}
      {field.type === 'checkbox' && <input type="checkbox" />}
      {field.type === 'select' && (
        <select>
          {field.options?.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {field.type === 'radio' && (
        <div>
          {field.options?.map((option, idx) => (
            <label key={idx}>
              <input type="radio" name={`radio-${index}`} value={option} />
              {option}
            </label>
          ))}
        </div>
      )}
      <button onClick={() => onRemove(field.id)}>Remove</button>
    </div>
  );
};

export default FieldComponent;
