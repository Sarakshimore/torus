import React from 'react';
import FormBuilder from '../components/FormBuilder.tsx';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Form Builder Dashboard</h1>
      <FormBuilder />
    </div>
  );
};

export default HomePage;
