// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { AuthProvider } from './context/AuthContext'; // Import our new AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* This component is now responsible for routing */}
      <AuthProvider> {/* Our context wraps the App */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);