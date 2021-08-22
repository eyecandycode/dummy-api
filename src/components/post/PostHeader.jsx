import React from "react";
import styled from "styled-components";
import { timeSince } from "../../utils/timeSince";

const PostHeaderStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
  .poster {
    display: flex;
    align-items: center;
    img {
      max-height: 60px;
      border-radius: 50%;
      margin-right: 1rem;
      border: 4px double rgba(15, 147, 223, 0.185);
    }
  }
`;

function PostHeader({ owner, publishDate }) {
  return (
    <PostHeaderStyles>
      <div className="poster">
        <img className="poster__image" src={owner.picture} alt="Poster" />
        <p className="poster__name">{`${owner.firstName} ${owner.lastName}`}</p>
      </div>
      <div className="post__head-posted">
        {timeSince(new Date(publishDate))}
      </div>
    </PostHeaderStyles>
  );
}

export default PostHeader;
