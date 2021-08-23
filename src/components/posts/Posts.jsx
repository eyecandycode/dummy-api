import React, { useState, useEffect, useContext } from "react";
import Post from "../post/Post";
import { AppContext } from "../../context/Context";
import { useQueryClient, useQuery } from "react-query";
import axios from "axios";
import PostsButtons from "./PostsButtons";

async function fetchPosts(page = 0) {
  const { data } = await axios.get(
    `https://dummyapi.io/data/v1/post?page=${page}&limit=10`,
    {
      headers: {
        "app-id": process.env.REACT_APP_APP_ID,
      },
    }
  );
  return data;
}

function Posts() {
  const ctx = useContext(AppContext);
  const queryClient = useQueryClient();
  const [page, setPage] = useState(ctx.page);

  const { isLoading, data, error, isPreviousData } = useQuery(
    ["posts", page],
    () => fetchPosts(page),
    { keepPreviousData: true, staleTime: 50000 }
  );
  useEffect(() => {
    if (page < Math.ceil(data?.total / data?.limit)) {
      queryClient.prefetchQuery(["posts", page + 1], () =>
        fetchPosts(page + 1)
      );
    }

    ctx.pageChangeHandler(page);
  }, [ctx, data, page, queryClient]);

  useEffect(() => {
    ctx.dataChangeHandler(data);
  }, [ctx, data]);

  if (isLoading)
    return (
      <div
        style={{
          height: "calc(100vh - 100px)",
          paddingTop: "5rem",
        }}
      >
        <p>Loading...</p>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <div style={{ maxWidth: "600px", width: "calc(100vw - 2rem)" }}>
        <PostsButtons
          data={data}
          page={page}
          setPage={setPage}
          isPreviousData={isPreviousData}
        />
        {data
          ? data.data.map((post, i) => <Post key={post.id} data={post} />)
          : ""}
      </div>
    </div>
  );
}

export default Posts;
