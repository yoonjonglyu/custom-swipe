import React from 'react';

import Swipe from '../../react-simple-swipe/src';

const App: React.FC = () => {
  return (
    <div>
      <h1>샘플 데모</h1>
      <Swipe item={[1, 2, 3, 4, 5]} />
    </div>
  );
};

export default App;
