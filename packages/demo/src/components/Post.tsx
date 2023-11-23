import React from 'react';
import styled from 'styled-components';

const Wrap = styled.article`
  height: 800px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const PostHeader = styled.header`
  position: relative;
  height: 200px;
  & ul {
    list-style: none;
    padding: 35px 0 20px 0;
  }
  & ul li {
    margin: 8px;
  }
  & .tag {
    color: red;
  }
`;
const Avartar = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  background: #dbdbdb;
  & img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
`;
const PostContents = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  gap: 3px;
`;

export interface PostProps {
  src: string;
  idx: number;
}
// 인스타 스타일로
const Post: React.FC<PostProps> = ({ src, idx }) => {
  return (
    <Wrap>
      <PostHeader>
        <Avartar>
          <img src={src} alt={src} style={{ width: '150px' }} />
        </Avartar>
        <ul>
          <li>
            <strong>swipe user</strong> <strong className='tag'>#{idx}</strong>
          </li>
          <li>Meow~ Meow~</li>
        </ul>
      </PostHeader>
      <PostContents>
        {new Array(40).fill(true).map((_, key) => (
          <img src={src} alt={src} style={{ width: '100%' }} />
        ))}
      </PostContents>
    </Wrap>
  );
};

export default Post;
