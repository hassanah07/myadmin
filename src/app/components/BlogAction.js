import React from "react";
import Pagenumber from "./Pagenumber";
import BlogActionList from "./BlogActionList";

const BlogAction = ({ blogs, action, pageNumbers, myPage }) => {
  return (
    <>
      <section className="text-gray-600 body-font pb-14 min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <BlogActionList blogs={blogs} />
          <div className="py-14">
            <div className="flex justify-center items-center align-bottom">
              <Pagenumber pageNumbers={pageNumbers} myPage={myPage} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogAction;
