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
  display: flex;
  align-items: flex-start;
  gap: 24px;
  height: 164px;
  margin-bottom: 22px;
  border-bottom: 0.5px solid #80808085;
  & ul {
    list-style: none;
    margin: 0;
    padding: 8px;
  }
  & ul li {
    margin: 8px;
  }
  & .tag {
    color: red;
  }
`;
const Avartar = styled.div`
  float: left;
  width: 120px;
  height: 120px;
  margin: 18px 18px;
  border-radius: 50%;
  overflow: hidden;
  background: #dbdbdb;
  & img {
    width: 120px;
    height: 120px;
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
            <strong>Swipe User</strong> <strong className="tag">#{idx}</strong>
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
