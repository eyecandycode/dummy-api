import axios from "axios";
import { useQuery } from "react-query";

export function usePosts(page = 0) {
  return useQuery(
    "posts",
    async () => {
      const res = await axios.get(
        `https://dummyapi.io/data/v1/post?page=${page}&limit=10`,
        {
          headers: {
            "app-id": "000000000000000000",
          },
        }
      );
      return res.data;
    },
    { staleTime: 20 * 60 * 1000, keepPreviousData: true } // 20 minutes
  );
}

//&limit=${limit}
