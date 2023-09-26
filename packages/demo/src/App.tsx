import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Swipe from '../../react-custom-swipe/src';
import ReactSwipe from 'react-custom-swipe';

import cat1 from './image/cat1.jpg';
import cat2 from './image/cat2.jpg';
import cat3 from './image/cat3.jpg';
import cat4 from './image/cat4.jpg';
import cat5 from './image/cat5.jpeg';
import cat6 from './image/cat6.jpeg';
import cat7 from './image/cat7.jpg';
import cat8 from './image/cat8.jpg';
import cat9 from './image/cat9.png';
import cat10 from './image/cat10.jpg';
import iu1 from './image/iu1.jpg';
import iu2 from './image/iu2.jpg';

const Style = createGlobalStyle`
  *{
    -webkit-user-drag: none;
  }
`;
const Wrap = styled.div`
  width: 100%;
  max-width: 720px;
  max-height: 1800px;
  margin: 0 auto;
  overflow: hidden;
`;
const Contents = styled.div`
  height: 800px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const dumy = [
  cat1,
  cat2,
  cat3,
  cat4,
  cat5,
  cat6,
  cat7,
  cat8,
  cat9,
  cat10,
  iu1,
  iu2,
];

const App: React.FC = () => {
  const [item, setItem] = useState(dumy);
  const [isCarousel, setIsCarousel] = useState(true);
  const [isHistory, setIsHistory] = useState(false);
  const handleAddItem = () => {
    setItem(prev => [...prev, ...dumy]);
  };

  return (
    <Wrap>
      <Style />
      <h1>
        swipe demo
        <button onClick={handleAddItem}>add item</button>
        <button onClick={() => setIsHistory(prev => !prev)}>isHistory</button>
        <button onClick={() => setIsCarousel(prev => !prev)}>isCarousel</button>
        {isHistory ? 'new history' : 'change history'}
      </h1>
      <Swipe
        item={item.map((src, key) => (
          <Contents key={key}>
            <img
              src={src}
              alt={src}
              style={{ width: '100%', maxWidth: '100%' }}
            />
            <div>
              <h2>example {key}</h2>
              {Array.from({ length: 5 }, (_, key) => (
                <img
                  key={key}
                  src={src}
                  alt={src}
                  style={{ width: '100%', maxWidth: '100%' }}
                />
              ))}
            </div>
          </Contents>
        ))}
        containerProps={{ style: { border: '1px solid' } }}
        itemProps={{ style: { border: '1px solid' } }}
        config={{
          isHistory: isHistory,
          paramName: 'index',
          historyCallback: state =>
            console.log('swipeState', state, state.isSwipe),
            isCarousel: isCarousel,
        }}
      />
    </Wrap>
  );
};

export default App;
