"use client";
import Quicklink from "@/app/components/Quicklink";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const BlogCard = () => {
  // blogs count total, pending, approved, deleted, withdrawn
  const [totalBlog, setTotalBlog] = useState(0);
  const [pendingBlog, setPendingBlog] = useState(0);
  const [approvedBlog, setApprovedBlog] = useState(0);
  const [deletedBlog, setDeletedBlog] = useState(0);
  const [withdrawnBlog, setWithdrawnBlog] = useState(0);
  const publicUrl = process.env.NEXT_PUBLIC_HOST;

  const countBlogs = async () => {
    let blogCount = await fetch(`${publicUrl}/api/admin/blogscount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("adminToken")
      },
      body: JSON.stringify()
    });
    blogCount = await blogCount.json();
    setTotalBlog(blogCount.total);
    setApprovedBlog(blogCount.approved);
    setDeletedBlog(blogCount.deleted);
    setPendingBlog(blogCount.pending);
    setWithdrawnBlog(blogCount.withdrawn);
  };
  useEffect(() => {
    countBlogs();
  }, []);
  return (
    <>
      {/* blogs counting process dashboard */}
      <div className="xl:w-1/5 md:w-1/4 p-4">
        <div className="border border-gray-200 p-6 rounded-lg hover:bg-purple-400">
          <h2 className="text-xl text-center text-gray-900 font-medium title-font mb-2">
            {totalBlog}
          </h2>
          <p className="leading-relaxed text-lg text-center">
            <b className="text-slate-800">Total Blogs</b>
          </p>
        </div>
      </div>
      <div className="xl:w-1/5 md:w-1/4 p-4">
        <div className="border border-gray-200 p-6 rounded-lg hover:bg-purple-400">
          <h2 className="text-xl text-center text-gray-900 font-medium title-font mb-2">
            {pendingBlog}
          </h2>
          <p className="leading-relaxed text-lg text-center">
            <b className="text-slate-800">Pending Blogs</b>
          </p>
        </div>
      </div>
      <div className="xl:w-1/5 md:w-1/4 p-4">
        <div className="border border-gray-200 p-6 rounded-lg hover:bg-purple-400">
          <h2 className="text-xl text-center text-gray-900 font-medium title-font mb-2">
            {approvedBlog}
          </h2>
          <p className="leading-relaxed text-lg text-center">
            <b className="text-slate-800">Approved Blogs</b>
          </p>
        </div>
      </div>
      <div className="xl:w-1/5 md:w-1/4 p-4">
        <div className="border border-gray-200 p-6 rounded-lg hover:bg-purple-400">
          <h2 className="text-xl text-center text-gray-900 font-medium title-font mb-2">
            {deletedBlog}
          </h2>
          <p className="leading-relaxed text-lg text-center">
            <b className="text-slate-800">Deleted Blogs</b>
          </p>
        </div>
      </div>
      <div className="xl:w-1/5 md:w-1/4 p-4">
        <div className="border border-gray-200 p-6 rounded-lg hover:bg-purple-400">
          <h2 className="text-xl text-center text-gray-900 font-medium title-font mb-2">
            {withdrawnBlog}
          </h2>
          <p className="leading-relaxed text-lg text-center">
            <b className="text-slate-800">Withdrawn Blogs</b>
          </p>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
