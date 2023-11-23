import React, { useState } from 'react';
import styled from 'styled-components';

import Swipe from '../../react-custom-swipe/src';
import ReactSwipe from 'react-custom-swipe';

import Post from './components/Post';
import Sidebar from './components/Sidebar';

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

const Wrap = styled.div`
  width: 100%;
  max-width: 720px;
  max-height: 1800px;
  margin: 0 auto;
  overflow: hidden;
`;

const dumy = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10];

const App: React.FC = () => {
  const [item, setItem] = useState(dumy);
  const [config, setConfig] = useState<{
    isHistory: boolean;
    isCarousel: boolean;
    direction: 'row' | 'column';
  }>({ isHistory: false, isCarousel: true, direction: 'row' });

  const handleAddItem = () => {
    setItem(prev => [...prev, ...dumy]);
  };

  return (
    <Wrap>
      <Sidebar handleAddItem={handleAddItem} handleConfig={setConfig} />
      <Swipe
        item={item.map((src, key) => (
          <Post src={src} key={key} idx={key} />
        ))}
        containerProps={{
          style: {
            height: '800px'
          },
        }}
        config={{
          paramName: 'index',
          historyCallback: state => console.log('swipeState', state),
          ...config,
        }}
      />
    </Wrap>
  );
};

export default App;
