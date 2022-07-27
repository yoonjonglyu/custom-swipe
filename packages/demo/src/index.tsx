import React from 'react';
import { createRoot } from 'react-dom/client';

const root = document.querySelector('#app');
if (root !== null) {
  createRoot(root).render(<div>init</div>);
} else console.error('not find root container #app.');
