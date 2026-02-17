import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { setLog, LOG_MODULES, LOG_CONFIG } from './debug/debug.js';
import { AuthProvider } from './hoc/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);

window.enableLogs = (module) => setLog(module, true);
window.disableLogs = (module) => setLog(module, false);
window.listLogs = () => console.table(LOG_MODULES);
window.LOG_CONFIG = LOG_CONFIG;
