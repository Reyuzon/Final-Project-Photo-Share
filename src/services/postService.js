import { axiosInstance } from "@/lib/axios";
import { getCookie } from "cookies-next";

export const getExplorePost = async (pageParams = 1) => {
  const response = await axiosInstance.get(
    "/api/v1/explore-post?size=27&page=" + pageParams,
    {
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    }
  );
  return response;
};

export const getPostById = async (postId) => {
  const response = await axiosInstance.get(
    "/api/v1/post/" + postId,
    {
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    }
  );
  return response;
}

export const likePost = async (postId) => {
  const response = await axiosInstance.post(
    "/api/v1/like",
    { postId },
    {
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    }
  );
  return response;
}