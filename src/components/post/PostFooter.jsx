import React from "react";
import styled from "styled-components";

const PostFooterStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .tag {
    display: inline-block;
    background: rgb(255, 160, 35);
    background: linear-gradient(168deg, rgba(255, 160, 35, 1) 0%, #ffc402 100%);
    border-radius: 16px;
    border: 2px solid rgba(247, 247, 247, 0.856);

    color: white;
    padding: 0.1rem 0.7rem;
    margin: 0.2rem 0.2rem 0;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 12px;
  }
  .likes {
    white-space: nowrap;
  }
`;

function PostFooter({ tags, likes }) {
  return (
    <PostFooterStyles>
      <ul>
        {tags
          ? tags.map((tag, i) => (
              <li key={i} className="tag">
                {tag}
              </li>
            ))
          : ""}
      </ul>
      <p className="likes">♡ {likes}</p>
    </PostFooterStyles>
  );
}

export default PostFooter;
