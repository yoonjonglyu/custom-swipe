import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Side = styled.aside`
  position: absolute;
  top: 50px;
  right: 10px;
  z-index: 999;
  background: blue;
`;
export interface SidebarProps {
  handleAddItem: VoidFunction;
  handleConfig: React.Dispatch<React.SetStateAction<any>>;
}
// 옆에서 나오는 방식으로 스위치 방식의 옵션 바를 제공
const Sidebar: React.FC<SidebarProps> = ({ handleAddItem, handleConfig }) => {
  const [isCarousel, setIsCarousel] = useState(true);
  const [isHistory, setIsHistory] = useState(false);
  const [direction, setDirection] = useState<'row' | 'column'>('row');

  useEffect(() => {
    handleConfig((prev: any) => ({
      ...prev,
      isCarousel,
      isHistory,
      direction,
    }));
  }, [isCarousel, isHistory, direction]);

  return (
    <Side>
      <ul>
        <li>
          <label>
            <input
              type="checkbox"
              checked={isHistory}
              onChange={() => setIsHistory(prev => !prev)}
            />
            <span>History</span>
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={isCarousel}
              onChange={() => setIsCarousel(prev => !prev)}
              disabled={isHistory}
            />
            <span>Carousel</span>
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={direction === 'row'}
              onChange={() => setDirection(prev => (prev === 'row' ? 'column' : 'row'))}
            />
            <span>direction {direction}</span>
          </label>
        </li>
        <li>
          <button onClick={handleAddItem}>add item</button>
        </li>
      </ul>
    </Side>
  );
};

export default Sidebar;
