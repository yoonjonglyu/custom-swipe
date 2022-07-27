import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const root = document.querySelector('#app');
if (root !== null) {
  createRoot(root).render(<App />);
} else console.error('not find root container #app.');
