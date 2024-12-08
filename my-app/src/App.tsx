import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import HomePage from './pages/HomePage.tsx';
import FormBuilder from './components/FormBuilder.tsx';
import './App.css';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form-builder" element={<FormBuilder />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
