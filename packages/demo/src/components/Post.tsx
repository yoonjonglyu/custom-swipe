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
  height: 300px;
`;
const Avartar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  background: #dbdbdb;
`;
const PostContents = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
`;

export interface PostProps {
  src: string;
}
// 인스타 스타일로
const Post: React.FC<PostProps> = ({ src }) => {
  return (
    <Wrap>
      <PostHeader>
        <Avartar>
          <img src={src} alt={src} style={{ width: '150px' }} />
        </Avartar>
        <ul>
          <li>name: swipe user #idx</li>
          <li>냐옹냐옹~</li>
        </ul>
      </PostHeader>
      <PostContents>
        {new Array(16).fill(true).map((_, key) => (
          <img src={src} alt={src} style={{ width: '100%' }} />
        ))}
      </PostContents>
    </Wrap>
  );
};

export default Post;
