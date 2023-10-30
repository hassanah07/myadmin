"use client";
import Quicklink from "@/app/components/Quicklink";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaCheckSquare } from "react-icons/fa";
import { MdOutlineWarning, MdAssignmentReturned } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = ({ params }) => {
  const [blogPostData, setBlogPostData] = useState([]);
  const { push } = useRouter();
  const toastOption = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  };

  const tokenVerify = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      push("/");
    } else {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/admin/tokenverify`,
        {
          method: "POST",
          headers: {
            cache: "no-cache",
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("adminToken")
          },
          body: JSON.stringify()
        }
      );
      res = await res.json();
      if (res == false) {
        localStorage.removeItem("adminToken");
        push("/");
      }
    }
  };
  const blogData = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/blogidview`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("adminToken")
        },
        body: JSON.stringify({ blogId: params.id })
      }
    );
    const blogPost = await data.json();
    setBlogPostData(blogPost);
  };
  const nameOne = "Link";
  const linkOne = `${process.env.NEXT_PUBLIC_FRONTEND_LINK}/admin/link`;
  const nameTwo = blogPostData.category;
  // if (blogPostData.status == false && blogPostData.deleted == false) {
  //   nameTwo = "pending";
  // } else if (blogPostData.status == true && blogPostData.deleted == false) {
  //   nameTwo = "approved";
  // } else if (blogPostData.deleted == true && blogPostData.status == false) {
  //   nameTwo = "withdrawn";
  // }
  const linkTwo = `${process.env.NEXT_PUBLIC_FRONTEND_LINK}/admin//${blogPostData.category}`;
  const nameThree = blogPostData.title;
  const linkThree = `${process.env.NEXT_PUBLIC_FRONTEND_LINK}/admin/blog/${blogPostData.blogId}`;

  const approval = async () => {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/approval`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("adminToken")
        },
        body: JSON.stringify({ blogId: params.id })
      }
    );
    res = await res.json();
    if (res.status == true) {
      toast.success(res.msg, toastOption);
    } else {
      toast.error(res.msg, toastOption);
    }
  };
  const revert = async () => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/revert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("adminToken")
      },
      body: JSON.stringify({ blogId: params.id })
    });
    res = await res.json();

    if (res.status == true) {
      toast.success(res.msg, toastOption);
    } else {
      toast.error(res.msg, toastOption);
    }
  };

  const withdraw = async () => {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/withdraw`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("adminToken")
        },
        body: JSON.stringify({ blogId: params.id })
      }
    );
    res = await res.json();

    if (res.status == true) {
      toast.success(res.msg, toastOption);
    } else {
      toast.error(res.msg, toastOption);
    }
  };

  const permanentDelete = async () => {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/deleteblog`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("adminToken")
        },
        body: JSON.stringify({ blogId: params.id })
      }
    );
    res = await res.json();
    if (res.status == true) {
      toast.success(res.msg, toastOption);
      push("/admin/action/pending");
    } else {
      toast.error(res.msg, toastOption);
    }
  };

  useEffect(() => {
    blogData();
    tokenVerify();
  }, []);

  return (
    <>
      <Quicklink
        linkOne={linkOne}
        linkTwo={linkTwo}
        linkThree={linkThree}
        nameOne={nameOne}
        nameTwo={nameTwo}
        nameThree={nameThree}
      />
      <ToastContainer />
      <div className="pb-14 text-gray-600 body-font bg-green-100 dark:bg-slate-800">
        <div className="flex flex-row min-h-screen justify-center items-center pt-10">
          <div
            className="text-justify mx-5 w-[100vw] md:w-[50%] text-black dark:text-slate-100"
            dangerouslySetInnerHTML={{ __html: blogPostData.content }}
          />
        </div>
        <div className="flex flex-row justify-center items-center">
          <p className="font-extrabold capitalize dark:bg-slate-500 text-slate-500 dark:text-slate-100 bg-gray-200 text-center m-2 p-2 w-[100%] md:w-[50%] rounded-xl">
            Author: {blogPostData.author}
          </p>
        </div>
      </div>
      <div className="w-full py-5 bg-inherit flex flex-wrap items-center justify-center">
        <button className="bg-purple-300 text-slate-300 mx-4 px-5 py-3 rounded-xl">
          <FaCheckSquare
            className="text-5xl text-pink-900 font-semibold"
            title="Approve"
            onClick={approval}
          />
        </button>
        <button className="bg-purple-300 text-slate-300 mx-4 px-5 py-3 rounded-xl">
          <MdAssignmentReturned
            className="text-5xl text-pink-900 font-semibold"
            title="Revert"
            onClick={revert}
          />
        </button>
        <button className="bg-purple-300 text-slate-300 mx-4 px-5 py-3 rounded-xl">
          <MdOutlineWarning
            className="text-5xl text-pink-900 font-semibold"
            title="Withdraw"
            onClick={withdraw}
          />
        </button>
        <button className="bg-purple-300 text-slate-300 mx-4 px-5 py-3 rounded-xl">
          <FaTrashAlt
            className="text-5xl text-pink-900 font-semibold"
            title="Delete"
            onClick={permanentDelete}
          />
        </button>
      </div>
    </>
  );
};

export default Page;
