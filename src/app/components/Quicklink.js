import Link from "next/link";
import React from "react";

const Quicklink = ({
  linkOne,
  nameOne,
  linkTwo,
  nameTwo,
  nameThree,
  linkThree,
}) => {
  return (
    <div className="flex text-slate-700 dark:text-slate-500 body-font px-2 w-fit rounded-xl absolute left-3 leading-normal">
      <small>
        {linkOne == null
          ? ""
          : linkOne !== null && (
              <>
                {/* <u> */}
                <b>
                  <Link className="capitalize" href={linkOne}>
                    {nameOne}
                  </Link>
                </b>
                {/* </u> */}
                <b className="font-bold text-lg px-2">/</b>
              </>
            )}
        {linkTwo == null
          ? ""
          : linkTwo !== null && (
              <>
                {/* <u> */}
                <b>
                  <Link className="capitalize" href={linkTwo}>
                    {nameTwo}
                  </Link>
                </b>
                {/* </u> */}
                <b className="font-bold text-lg px-2">/</b>
              </>
            )}
        {linkThree == null
          ? ""
          : linkThree !== null && (
              <>
                {/* <u> */}
                <b>
                  <Link className="capitalize" href={linkThree}>
                    {nameThree}
                  </Link>
                </b>
                {/* </u> */}
                {/* <b className="font-bold text-lg px-2">/</b> */}
              </>
            )}
      </small>
    </div>
  );
};

export default Quicklink;
