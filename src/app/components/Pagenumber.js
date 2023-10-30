import Link from "next/link";
import React from "react";

const Pagenumber = ({ pageNumbers, myPage }) => {
  return (
    <>
      {pageNumbers.map((allpages) => {
        return (
          <Link
            key={allpages}
            href={`/${myPage}?page=${allpages}`}
            className="mx-2 px-3 text-slate-800 dark:text-slate-100   bg-transparent border rounded-lg font-semibold hover:animate-pulse hover:bg-yellow-300 hover:text-slate-700"
          >
            {allpages}
          </Link>
        );
      })}
    </>
  );
};

export default Pagenumber;
