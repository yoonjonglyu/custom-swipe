import React from 'react';
import { createRoot } from 'react-dom/client';

const root = document.querySelector('#app');
if (root !== null) {
  createRoot(root).render(<div>app</div>);
} else console.error('루트노드를 찾을 수 없습니다.');
