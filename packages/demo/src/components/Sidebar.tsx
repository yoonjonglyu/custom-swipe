import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Side = styled.aside`
  position: fixed;
  top: 40%;
  right: 0;
  z-index: 999;
  border: 1px solid gray;
  background: #fff;
`;
const OptionList = styled.ul`
  list-style: none;
  margin: 8px;
  padding: 3px;
  & li {
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    margin: 8px;
  }
`;
const Input = styled.input`
  width: 0;
  height: 0;
`;
const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 70px;
  height: 30px;
  background: #f6f6f6;
  border-radius: 20px;
  border: 1px solid #a11b1b7f;
  & span {
    position: absolute;
    top: 5px;
    right: 45px;
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 0;
    border-radius: 50%;
    background: #a11b1b7f;
    transition: 0.2s;
  }
  input:checked + & {
    background: #b72a2a7e;
  }
  input:checked + & span {
    right: 5px;
    box-shadow: gray 1px 0px 2px;
  }
  input:disabled + & {
    opacity: 0.5;
  }
`;
const Button = styled.button`
  width: 100%;
  height: 33px;
  background: #32aa32;
  border-radius: 8px;
  border: none;
  box-shadow: 1px 0px 5px  gray;
  color: #e9e8e8;
  &:hover {
    background: #3cc23c;
  }
  &:active {
    background: red;
    box-shadow: 1px 1px 1px  gray;
  }
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
      <OptionList>
        <li>
          <span>History</span>
          <Input
            id="history"
            type="checkbox"
            checked={isHistory}
            onChange={() => setIsHistory(prev => !prev)}
          />
          <Label htmlFor="history">
            <span>History</span>
          </Label>
        </li>
        <li>
          <span>Carousel</span>
          <Input
            id="carousel"
            type="checkbox"
            checked={isCarousel}
            onChange={() => setIsCarousel(prev => !prev)}
            disabled={isHistory}
          />
          <Label htmlFor="carousel">
            <span>Carousel</span>
          </Label>
        </li>
        <li>
          <span>Vertical</span>
          <Input
            id="direction"
            type="checkbox"
            checked={direction === 'column'}
            onChange={() =>
              setDirection(prev => (prev === 'row' ? 'column' : 'row'))
            }
          />
          <Label htmlFor="direction">
            <span>direction</span>
          </Label>
        </li>
        <li>
          <Button onClick={handleAddItem}>ADD ITEM</Button>
        </li>
      </OptionList>
    </Side>
  );
};

export default Sidebar;
