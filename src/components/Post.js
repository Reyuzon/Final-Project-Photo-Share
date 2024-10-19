import { getPostById } from "@/services/postService";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import {
  IoChevronBackOutline,
  IoChatbubblesSharp,
  IoSend,
  IoCloseSharp,
} from "react-icons/io5";
import { getCookie, setCookie } from "cookies-next";
import {
  BsSend,
  BsHeartFill,
  BsHeart,
  BsChat,
  BsBookmark,
  BsBookmarkFill,
} from "react-icons/bs";
import Img from "./Img";

export default function Post({ id }) {
  const router = useRouter();

  const likePosts = getCookie("likePosts")
    ? JSON.parse(getCookie("likePosts"))
    : [];

  const savePosts = getCookie("savePosts")
    ? JSON.parse(getCookie("savePosts"))
    : [];

  console.log(savePosts);

  const [isLike, setIsLike] = useState(likePosts.includes(id));
  const [isSave, setIsSave] = useState(savePosts.includes(id));

  const [comment, setComment] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["post_" + id],
    queryFn: () => getPostById(id),
  });

  const handleLikePost = () => {
    setIsLike(true);
    setCookie("likePosts", JSON.stringify([...likePosts, id]));
  };

  const handleUnlikePost = () => {
    setIsLike(false);
    setCookie(
      "likePosts",
      JSON.stringify(likePosts.filter((post) => post !== id))
    );
  };

  const handleSavePost = () => {
    setIsSave(true);
    setCookie("savePosts", JSON.stringify([...savePosts, id]));
  };

  const handleUnsavePost = () => {
    setIsSave(false);
    setCookie(
      "savePosts",
      JSON.stringify(savePosts.filter((post) => post !== id))
    );
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <Fragment>
      <div className="overflow-y-auto overflow-x-hidden relative top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 min-h-screen max-h-full md:max-h-[calc(100vh-5rem)]">
        <div className="relative overflow-y-auto p-0 sm:p-4 w-full min-h-screen md:h-max bg-white h-max pt-10 sm:pt-14 pb-14 md:hidden">
          <div className="bg-white w-full h-max p-2 border-b-2 fixed top-0 left-0">
            <IoChevronBackOutline
              className="text-[27px]"
              onClick={handleClose}
            />
            <h1 className="absolute right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 font-medium text-lg">
              Post
            </h1>
          </div>
          {isLoading ? (
            <div className="flex items-center gap-3 p-4">
              <svg
                className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </div>
          ) : (
            <Fragment>
              <div className="flex items-center gap-3 p-4">
                <Img
                  src={data.data.data.user.profilePictureUrl}
                  alt="user profile"
                  className="rounded-full w-9 h-9"
                  fallback={
                    <img
                      src="/images/profile.jpg"
                      className="rounded-full w-9 h-9"
                    />
                  }
                />
                <p>{data.data.data.user.username}</p>
              </div>
              <img src={data.data.data.imageUrl} alt="" className="w-full" />
              <div className="p-4 pb-5 border-b-2">
                <div className="flex items-center justify-between text-2xl ">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        isLike ? handleUnlikePost() : handleLikePost()
                      }>
                      {isLike ? (
                        <BsHeartFill className="text-red-500" />
                      ) : (
                        <BsHeart />
                      )}
                    </button>
                    <BsChat className="-scale-x-100 -mt-0.5" />
                    <BsSend className="rotate-25" />
                  </div>
                  <button
                    onClick={() =>
                      isSave ? handleUnsavePost() : handleSavePost()
                    }>
                    {isSave ? <BsBookmarkFill /> : <BsBookmark />}
                  </button>
                </div>
                <div className="mt-3">
                  <span className="font-medium">
                    {data.data.data.user.username}
                  </span>
                  <span className="whitespace-pre-line">
                    &nbsp;
                    {data.data.data.caption}
                  </span>
                </div>
              </div>
              {data.data.data.comments.length > 0 ? (
                <div className="p-4 flex flex-col gap-3">
                  {data.data.data.comments
                    .slice()
                    .reverse()
                    .map((comment, i) => (
                      <div className="flex gap-2" key={i}>
                        <Img
                          src={comment.user.profilePictureUrl}
                          className="rounded-full w-10 h-10"
                          fallback={
                            <img
                              src="/images/profile.jpg"
                              className="rounded-full w-10 h-10"
                            />
                          }
                        />
                        <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-2 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                          <div class="flex items-center space-x-2 rtl:space-x-reverse">
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">
                              {comment.user.username}
                            </span>
                          </div>
                          <p class="text-sm font-normal py-1 text-gray-900 dark:text-white">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-center py-3">
                  <IoChatbubblesSharp className="text-6xl text-gray-500" />
                  <div>
                    <p className="font-medium text-lg">Belum ada komentar</p>
                    <p>Jadilah yang pertama mengomentari.</p>
                  </div>
                </div>
              )}
            </Fragment>
          )}
          <div className="bg-white w-full h-max px-2 py-1 border-t-2 fixed bottom-0 left-0 flex gap-2">
            <input
              type="text"
              id="first_name"
              value={comment}
              className="text-gray-900 text-sm border-none focus:border-none focus:ring-0 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white"
              placeholder="Add a comment..."
              required
              onChange={(e) => setComment(e.target.value)}
            />
            {comment.length > 0 && (
              <button className="text-2xl text-blue-800">
                <IoSend />
              </button>
            )}
          </div>
        </div>
        {!isLoading && (
          <Fragment>
            <div
              className="hidden md:inline-block w-full h-full relative cursor-pointer"
              onClick={handleClose}>
              <IoCloseSharp className="text-white absolute text-4xl right-0 top-2" />
            </div>
            <div className="w-max max-w-[80%] md:h-[85%] lg:max-h-[90%] overflow-hidden fixed top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 bg-white hidden md:grid md:grid-cols-2 rounded">
              <img src={data.data.data.imageUrl} alt="" className="h-full" />
              <div className="bg-white relative pt-16 pb-20 px-4 border-l-2">
                <div className="flex items-center gap-3 p-4 border-b-2 border-l-2 w-1/2 fixed top-0 right-0 bg-white">
                  <Img
                    src={data.data.data.user.profilePictureUrl}
                    alt="user profile"
                    className="rounded-full w-9 h-9"
                    fallback={
                      <img
                        src="/images/profile.jpg"
                        className="rounded-full w-9 h-9"
                      />
                    }
                  />
                  <p>{data.data.data.user.username}</p>
                </div>
                <div className="mt-3 flex gap-3">
                  <Img
                    src={data.data.data.user.profilePictureUrl}
                    alt="user profile"
                    className="rounded-full w-9 h-9"
                    fallback={
                      <img
                        src="/images/profile.jpg"
                        className="rounded-full w-9 h-9"
                      />
                    }
                  />
                  <div className="pt-1.5">
                    <span className="font-medium">
                      {data.data.data.user.username}
                    </span>
                    <span className="whitespace-pre-line">
                      &nbsp;
                      {data.data.data.caption}
                    </span>
                  </div>
                </div>
                {data.data.data.comments.length > 0 ? (
                  <div className="p-4 flex flex-col gap-3">
                    {data.data.data.comments
                      .slice()
                      .reverse()
                      .map((comment, i) => (
                        <div className="flex gap-2" key={i}>
                          <Img
                            src={comment.user.profilePictureUrl}
                            className="rounded-full w-10 h-10"
                            fallback={
                              <img
                                src="/images/profile.jpg"
                                className="rounded-full w-10 h-10"
                              />
                            }
                          />
                          <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-2 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                            <div class="flex items-center space-x-2 rtl:space-x-reverse">
                              <span class="text-sm font-semibold text-gray-900 dark:text-white">
                                {comment.user.username}
                              </span>
                            </div>
                            <p class="text-sm font-normal py-1 text-gray-900 dark:text-white">
                              {comment.comment}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center py-3 mt-2">
                    <IoChatbubblesSharp className="text-6xl text-gray-500" />
                    <div>
                      <p className="font-medium text-lg">Belum ada komentar</p>
                      <p>Jadilah yang pertama mengomentari.</p>
                    </div>
                  </div>
                )}
                <div className="fixed bottom-0 right-0 border-t w-1/2 bg-white border-l-2">
                  <div className="flex items-center justify-between text-2xl p-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          isLike ? handleUnlikePost() : handleLikePost()
                        }>
                        {isLike ? (
                          <BsHeartFill className="text-red-500" />
                        ) : (
                          <BsHeart />
                        )}
                      </button>
                      <BsChat className="-scale-x-100 -mt-0.5" />
                      <BsSend className="rotate-25" />
                    </div>
                    <button
                      onClick={() =>
                        isSave ? handleUnsavePost() : handleSavePost()
                      }>
                      {isSave ? <BsBookmarkFill /> : <BsBookmark />}
                    </button>
                  </div>
                  <div className="w-full px-2 py-1 flex items-center gap-2 border-t-2">
                    <input
                      type="text"
                      id="first_name"
                      value={comment}
                      className="text-gray-900 text-sm border-none focus:border-none focus:ring-0 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Add a comment..."
                      required
                      onChange={(e) => setComment(e.target.value)}
                    />
                    {comment.length > 0 && (
                      <button className="text-2xl text-blue-800">
                        <IoSend />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}
