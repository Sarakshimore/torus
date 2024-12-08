export type FieldType = 'text' | 'number' | 'date' | 'checkbox' | 'select' | 'radio';

export interface Field {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: string[];  // For select and radio buttons
}
