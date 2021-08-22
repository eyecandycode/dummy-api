import React from "react";
import styled from "styled-components";

const PostBodyStyles = styled.div`
  display: flex;
  flex-direction: column;
  .post__text {
    margin: 1rem 0;
  }
`;

function PostBody({ image, text }) {
  return (
    <PostBodyStyles>
      <img src={image} alt="Post" />
      <p className="post__text">{text}</p>
    </PostBodyStyles>
  );
}

export default PostBody;
