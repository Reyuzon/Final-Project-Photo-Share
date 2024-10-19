
import { withAuth } from "@/lib/withAuth";
import React, { Fragment } from "react";

export default function ProfilePage({ user }) {
  return (
    <Fragment>
      <main>
        <div className="p-4 sm:ml-64">
          <div className="p-4">
            <div className="flex gap-4">
              <img
                className="rounded-full"
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "/images/profile.jpg"
                }
                alt="Profile Picture"
              />
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 h-max">
                  <div>
                    <h1 className="font-semibold text-lg">{user.username}</h1>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                      Dark
                    </button>
                    <button
                      type="button"
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                      Light
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export const getServerSideProps = withAuth(async (context, user) => {
  return {
    props: {
      user,
    },
  };
});
