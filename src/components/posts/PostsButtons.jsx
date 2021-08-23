import React from "react";
import styled from "styled-components";

const PostsButtonsStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  button {
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border: 2px solid rgba(0, 0, 0, 0.4);
  }
  button:disabled {
    background: rgba(0, 0, 0, 0.3);
    color: rgba(0, 0, 0, 0.1);
    border: 2px solid rgba(0, 0, 0, 0.1);
  }
`;
function PostsButtons({ data, page, setPage, isPreviousData }) {
  return (
    <PostsButtonsStyles>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        ←
      </button>
      <p style={{ margin: "0 1rem" }}>Page: {page + 1}</p>
      <button
        onClick={() => {
          setPage((old) =>
            page < Math.ceil(data?.total / data?.limit) ? old + 1 : old
          );
        }}
        disabled={
          isPreviousData || !(page < Math.ceil(data?.total / data?.limit))
        }
      >
        →
      </button>
    </PostsButtonsStyles>
  );
}

export default PostsButtons;
