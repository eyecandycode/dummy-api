import React from "react";
import styled from "styled-components";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";

const PostStyles = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin: 2rem 0;
  padding: 0.6rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  max-width: 600px;
`;

function Post({ data }) {
  const { image, text, tags, likes, owner, publishDate } = data;

  return (
    <PostStyles>
      <PostHeader owner={owner} publishDate={publishDate} />
      <PostBody image={image} text={text} />
      <PostFooter tags={tags} likes={likes} />
    </PostStyles>
  );
}

export default Post;
