import React from "react";

const BlogCount = ({ blogDataCount }) => {
  return (
    <>
      {blogDataCount.map((item) => {
        return (
          <div className="xl:w-1/5 md:w-1/4 p-4" key={item.id}>
            <div className="border border-gray-200 p-6 rounded-lg hover:bg-purple-400">
              <h2 className="text-xl text-center text-gray-900 font-medium title-font mb-2">
                {item.data}
              </h2>
              <p className="leading-relaxed text-lg text-center">
                <b className="text-slate-800">{item.name}</b>
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BlogCount;
